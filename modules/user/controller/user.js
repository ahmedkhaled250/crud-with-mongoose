import userModel from "../../../connictionDB/model/user.js";
import bcrypt from "bcryptjs";
export const getUserById = async (req, res) => {
  console.log("dsgyus");
  const { id } = req.params;
  const user = await userModel.findById(id);
  res.json({ message: "Done", user });
};
export const profile = async (req, res) => {
  console.log("dsgyus");
  const { id } = req.params;
  const user = await userModel.findById(id).select("firstName lastName email");
  res.json({ message: "Done", user });
};
export const addUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, cPassword, age } = req.body;
    if (password === cPassword) {
      const user = await userModel.findOne({ email });
      if (user) {
        res.json({ message: "Email exist" });
      } else {
        const hashPassword = await bcrypt.hash(password, 8);
        const user = new userModel({
          firstName,
          lastName,
          email,
          password: hashPassword,
          age,
        });
        const savedUser = await user.save();
        res.json({ message: "Done", user });
      }
    } else {
      res.json({ message: "password not equal cPassword" });
    }
  } catch (error) {
    res.json({ message: "Catch error", error });
  }
};
export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      res.json({ message: "In-valid details" });
    } else {
      const match = await bcrypt.compare(password, user.password);
      console.log({ match });
      if (!match) {
        res.json({ message: "In-valid details" });
      } else {
        res.json({ message: "Done", userID: user._id });
      }
    }
  } catch (error) {
    res.json({ message: "Catch error", error });
  }
};
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, email, password, age} = req.body;
    const hashPassword = await bcrypt.hash(password, 9);
    const user = await userModel.updateOne(
      { _id: id },
      { firstName, lastName, email, password: hashPassword, age}
    );
    res.json({ message: "Profile", user });
  } catch (error) {
    res.json({ message: "Catch error", error });
  }
};
export const replaceUsers = async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, email, password, age} = req.body;
    const hashPassword = await bcrypt.hash(password, 9);
    const user = await userModel.findOneAndReplace(
      { _id: id },
      { firstName, lastName, email, password: hashPassword, age}
    );
    res.json({ message: "Profile", user });
  } catch (error) {
    res.json({ message: "Catch error", error });
  }
};
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userModel.deleteOne({ _id: id });
    res.json({ message: "Deleted" });
  } catch (error) {
    res.json({ message: "Catch error", error });
  }
};
