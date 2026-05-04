const {
  getUserApplications
} = require("../models/application.model");

// Applier → view own applications
exports.getMyApplications = async (req, res) => {
  try {

    const user_id = req.user.id;
    const applications = await getUserApplications(user_id);

    res.json(applications);

  } catch (err) {
    res.status(500).json("Server error");
  }
};