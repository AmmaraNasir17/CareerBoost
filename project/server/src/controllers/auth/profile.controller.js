const { createHttpError } = require("../../utils/appError");
const {
  findUserByEmail,
  updateUserProfile,
} = require("../../models/user.model");
const {
  findApplierProfileByUserId,
  upsertApplierProfile,
} = require("../../models/applierProfile.model");
const {
  findRecruiterProfileByUserId,
  upsertRecruiterProfile,
} = require("../../models/recruiterProfile.model");

exports.getProfile = async (req, res) => {
  try {
    const user = await findUserByEmail(req.user.email);
    if (!user) throw createHttpError("User not found", 404);

    let profile = null;

    if (user.role === "applier") {
      profile = await findApplierProfileByUserId(user.id);
    } else if (user.role === "recruiter") {
      profile = await findRecruiterProfileByUserId(user.id);
    }

    res.json({ user: { id: user.id, name: user.name, email: user.email, role: user.role }, profile });
  } catch (err) {
    console.error(err);
    if (err.status) return res.status(err.status).json({ message: err.message });
    return res.status(500).json({ message: "Server error" });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { name, ...profileFields } = req.body;
    const user = await findUserByEmail(req.user.email);
    if (!user) throw createHttpError("User not found", 404);

    if (name) await updateUserProfile(user.id, { name });

    let updatedProfile = null;

    if (user.role === "applier") {
      updatedProfile = await upsertApplierProfile(user.id, profileFields);
    } else if (user.role === "recruiter") {
      updatedProfile = await upsertRecruiterProfile(user.id, profileFields);
    }

    res.json({ message: "Profile updated successfully", profile: updatedProfile });
  } catch (err) {
    console.error(err);
    if (err.status) return res.status(err.status).json({ message: err.message });
    return res.status(500).json({ message: "Server error" });
  }
};