import User from "../models/User.js";

export const getFindings = async (req, res) => {
  const name = req.body.name;
  // console.log();
  try {
    const users = await User.find({
      $or: [{ firstName: name }, { lastName: name }],
    });
    // const invitations = await Promise.all(
    //     user.invitations.map((id) => User.findById(id))
    // );
    const formattedUsers = users.map(
      ({ _id, firstName, lastName, department, picturePath }) => {
        return { _id, firstName, lastName, department, picturePath };
      }
    );
    // console.log(formattedUsers);
    res.status(200).json(formattedUsers);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
