import Activity from "../models/Activity.js";
import User from "../models/User.js";

/* CREATE */
export const createActivity = async (req, res) => {
  try {
    const {
      userId,
      description,
      picturePath,
      tags,
      date,
      friendOnly,
      heading,
      limit,
    } = req.body;
    const user = await User.findById(userId);
    const tags_split = tags.split(",");
    const newActivity = new Activity({
      host: userId,
      name: `${user.firstName} ${user.lastName}`,
      heading: heading,
      description: description,
      participants: [],
      picturePath,
      join: {},
      comments: [],
      userPicturePath: user.picturePath,
      department: user.department,
      tags: tags_split,
      date: date,
      friendOnly: friendOnly,
      limit: limit,
      deleted: false,
    });
    await newActivity.save();
    await Activity.find().sort({ date: 1 });
    const activities = await Activity.find();
    const filtered_activities = activities.filter(
      (activity) =>
        (activity.friendOnly &&
          (activity.host === userId || user.friends.includes(activity.host))) ||
        !activity.friendOnly
    );

    res.status(201).json(filtered_activities);
  } catch (err) {
    
    res.status(409).json({ message: err.message });
  }
};

/* READ */
export const getFeedActivities = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    await Activity.find().sort({ date: 1 });
    const activities = await Activity.find();
    const filtered_activities = activities.filter(
      (activity) =>
        (activity.friendOnly &&
          (activity.host === userId || user.friends.includes(activity.host))) ||
        !activity.friendOnly
    );
    // console.log(filtered_activities)
    res.status(200).json(filtered_activities);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserActivities = async (req, res) => {
  try {
    const { profileId, userId } = req.params;
    const user = await User.findById(userId);
    await Activity.find().sort({ date: 1 });
    const activities = await Activity.find({ host: profileId });
    const filtered_activities = activities.filter(
      (activity) =>
        (activity.friendOnly &&
          (activity.host === userId || user.friends.includes(activity.host))) ||
        !activity.friendOnly
    );

    res.status(200).json(filtered_activities);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* UPDATE */
export const joinActivity = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const activity = await Activity.findById(id);
    const isJoined = activity.join.get(userId);
    const user = await User.findById(userId);

    if (isJoined) {
      activity.join.delete(userId);
      const index = user.participation.indexOf(activity);
      user.participation.splice(index, 1);
    } else {
      activity.join.set(userId, true);
      user.participation.push(activity);
    }

    const updatedActivity = await Activity.findByIdAndUpdate(
      id,
      { join: activity.join },
      { new: true }
    );

    
    await user.save();
      console.log(updatedActivity)
    res.status(200).json(updatedActivity);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};


export const patchActivity = async (req, res) => {
  try {
    const { id } = req.params;
    const { activity } = req.body;
    
    let updatedActivity = await Activity.findByIdAndUpdate({_id: id},activity)

    res.status(200).json(updatedActivity);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};