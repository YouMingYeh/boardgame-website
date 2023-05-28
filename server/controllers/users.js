import User from "../models/User.js";

/* READ */
export const getUser = async (req, res) => {
  try {
    
    const { id } = req.params;
    const user = await User.findById(id);
    // console.log(user);
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: err.message });
  }
};

export const getUserFriends = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, department, picturePath }) => {
        return { _id, firstName, lastName, department, picturePath };
      }
    );
    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
export const getUserInvitations = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    const invitations = await Promise.all(
      user.invitations.map((id) => User.findById(id))
    );
    const formattedInvitations = invitations.map(
      ({ _id, firstName, lastName, department, picturePath }) => {
        return { _id, firstName, lastName, department, picturePath };
      }
    );
    res.status(200).json(formattedInvitations);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* UPDATE */
export const addRemoveFriend = async (req, res) => {
  try {
    const { id, friendId } = req.params;
    const user = await User.findById(id);
    const friend = await User.findById(friendId);

    // remove friend
    if (user.friends.includes(friendId)) {
      user.friends = user.friends.filter((id) => id !== friendId);
      friend.friends = friend.friends.filter((id) => id !== id);
    }
    // fridnd has invited me, add this friend
    else if (user.invitations.includes(friendId)) {
      user.invitations = user.invitations.filter((id) => id !== friendId);
      friend.invitings = friend.invitings.filter((id) => id !== id);
      user.friends.push(friendId);
      friend.friends.push(id);
    }
    // cancel inviting
    else if (user.invitings.includes(friendId)) {
      user.invitings = user.invitings.filter((id) => id !== friendId);
      friend.invitations = friend.invitations.filter((id) => id !== id);
    }
    // send invitation
    else {
      user.invitings.push(friendId);
      friend.invitations.push(id);
    }
    await user.save();
    await friend.save();

    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    const invitations = await Promise.all(
      user.invitations.map((id) => User.findById(id))
    );
    const invitings = await Promise.all(
      user.invitings.map((id) => User.findById(id))
    );
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, department, picturePath }) => {
        return { _id, firstName, lastName, department, picturePath };
      }
    );
    const formattedInvitations = invitations.map(
      ({ _id, firstName, lastName, department, picturePath }) => {
        return { _id, firstName, lastName, department, picturePath };
      }
    );
    const formattedInvitings = invitings.map(
      ({ _id, firstName, lastName, department, picturePath }) => {
        return { _id, firstName, lastName, department, picturePath };
      }
    );
    const ret = {
      friends: formattedFriends,
      invitations: formattedInvitations,
      invitings: formattedInvitings,
    };
    res.status(200).json(ret);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    
    const { Facebook, Instagram, selfIntro, department } = req.body;
    const user = await User.findOneAndUpdate(
      { _id: id },
      {
        Facebook: Facebook,
        Instagram: Instagram,
        selfIntro: selfIntro,
        department: department,
      },
      { new: true }
    );
    console.log(user)
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
