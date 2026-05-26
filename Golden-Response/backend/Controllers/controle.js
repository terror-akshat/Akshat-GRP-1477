const OPD = require("../Models/OPD.js");
const IPD = require("../Models/IPD.js");
const jwt = require("jsonwebtoken");
const redisClient = require("../config/redis.js");
const {
  Admin,
  Patient,
  UploadOpd,
} = require("../Models/Schemas.js");
const bcrypt = require("bcrypt");


const handleRegister = async (req, res) => {
  const { username, password } = req.body;

  try {
    if (!username?.trim() || !password?.trim()) {
      return res.status(400).json({
        msg: "Username and password are required",
        status: false,
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        msg: "Password must be at least 6 characters long",
        status: false,
      });
    }

    const foundAdmin = await Admin.findOne({ username });
    if (foundAdmin) {
      return res
        .status(400)
        .json({ msg: "User is already registered", status: false });
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const newAdmin = new Admin({ username: username.trim(), password: hash, role: "admin" });
    const savedAdmin = await newAdmin.save();

    return res.status(201).json({
      status: true,
      msg: "Account created successfully",
      savedAdmin: {
        _id: savedAdmin._id,
        username: savedAdmin.username,
        role: savedAdmin.role,
      },
    });
  } catch (error) {
    console.error("Error in handleRegister:", error);
    return res.status(500).json({
      msg: "Internal Server Error",
      status: false,
      error: error.message,
    });
  }
};

const handleLogin = async (req, res) => {
  const { username, password } = req.body;
  try {
    const foundAdmin = await Admin.findOne({
      username,
    });
    if (!foundAdmin) {
      return res.status(404).json({ status: false, msg: "No admin found" });
    }

    const isMatch = await bcrypt.compare(password, foundAdmin.password);
    if (!isMatch) {
      return res.status(401).json({ status: false, msg: "Passowrd is wrong" });
    }
    const token = jwt.sign(
      { id: foundAdmin._id, role: foundAdmin.role },
      process.env.JWT_SECRET
    );

    const adminData = {
      _id: foundAdmin._id,
      username: foundAdmin.username,
      role: foundAdmin.role,
      // Include other non-sensitive fields as needed
    };

    res
      .status(200)
      .cookie("authToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Only secure in production
        sameSite: "Strict",
        maxAge: 1000 * 60 * 60 * 24, //24 hours
      })
      .json({ status: true, admin: adminData, token: token });
  } catch (error) {
    return res.status(500).json({ error: error, msg: "Something went wrong!" });
  }
};

const handleAddPatient = async (req, res) => {
  const {
    name,
    phone,
    fatherName,
    motherName,
    age,
    gender,
    email,
    date,
    bp,
    temperature,
    spo2,
    pulseRate,
    weight,
  } = req.body;
  try {
    let newPatient = new Patient({
      name,
      phone,
      fatherName,
      motherName,
      age,
      gender,
      email,
    });
    const newOpd = new OPD({
      spo2,
      weight,
      temperature,
      pulse_rate: pulseRate,
      BP: bp,
      patientId: newPatient._id,
    });
    newPatient.opd = newOpd._id;
    const savedPatient = await newPatient.save();
    await newOpd.save();
    return res.json({
      status: true,
      patient: savedPatient,
      message: "Patient created successfully",
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: false, message: "Error creating patient" });
  }
};

// const handleGetPatient = async (req, res) => {
//   try {
//     const patientDetails = await Patient.find().sort({ _id: -1 });
//     return res.json({ status: true, patient: patientDetails });
//   } catch (error) {
//     return res.status(500).json({ msg: error, status: false });
//   }
// };
const handleGetPatient = async (req, res) => {
  try {
    const cacheKey = "patients_list";

    //  Check Redis Cache
    const cachedData = await redisClient.get(cacheKey);
    if (cachedData) {
      console.log("Served from Redis Cache");
      return res.json({ status: true, patient: JSON.parse(cachedData), cached: true });
    }

    //  If not cached, fetch from MongoDB
    const patientDetails = await Patient.find().sort({ _id: -1 });

    //  Save result in Redis with 10-hour expiry
    await redisClient.set(cacheKey, JSON.stringify(patientDetails), { EX: 36000 });

    console.log("Saved to Redis Cache");
    return res.json({ status: true, patient: patientDetails, cached: false });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: error.message, status: false });
  }
};


const handleUpdateOPD = async (req, res) => {
  try {
    const opd = await OPD.findById(req.params.opdId);

    if (!opd) {
      return res.status(404).json({
        status: false,
        message: "OPD not found",
      });
    }

    const { spo2, weight, temperature, pulseRate, bp } = req.body;

    if (spo2 !== undefined) opd.spo2 = spo2;
    if (weight !== undefined) opd.weight = weight;
    if (temperature !== undefined) opd.temperature = temperature;
    if (pulseRate !== undefined) opd.pulse_rate = pulseRate; // Note the field name difference
    if (bp !== undefined) opd.BP = bp;

    const updatedOPD = await opd.save();

    return res.status(200).json({
      status: true,
      message: "OPD updated successfully!",
      data: updatedOPD,
    });
  } catch (error) {
    console.error("Error updating OPD:", error);
    return res.status(500).json({
      status: false,
      message: "Couldn't update OPD!",
      error: error.message,
    });
  }
};

const getSpecificPatient = async (req, res) => {
  const { id } = req.params;
  try {
    const patient = await Patient.findById(id).populate(["opd", "Ipd"]);
    if (!patient) {
      return res.status(404).json({ status: false, msg: "Patient not found" });
    }
    return res.json({ status: true, patient: patient });
  } catch (error) {
    return res.status(500).json({ msg: error, status: false });
  }
};

const getSpecificOpd = async (req, res) => {
  const { id } = req.params;
  try {
    const opdImage = await OPD.findById(id).populate("UploadOpd");
    const patient = await Patient.findById(opdImage.patientId);

    return res.json({ status: true, opdImage: opdImage, patient: patient });
    // return res.json({ status: true, opd: opd, patient: patientId });
  } catch (error) {
    return res.status(500).json({ msg: error, status: false });
  }
};

const updateNameAndPassword = async (req, res) => {
  const { id } = req.params;
  const { username, newPassword, currentPassword } = req.body;
  try {
    const foundAdmin = await Admin.findById(id);
    if (!foundAdmin) {
      return res.status(404).json({ status: false, msg: "Admin not found" });
    }
    if (username.length > 0 && newPassword.length > 0) {
      const isMatch = await bcrypt.compare(
        currentPassword,
        foundAdmin.password
      );
      if (!isMatch) {
        return res
          .status(401)
          .json({ status: false, msg: "Password is wrong" });
      }
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(newPassword, salt);
      foundAdmin.username = username;
      foundAdmin.password = hash;
      await foundAdmin.save();
    } else if (newPassword.length == 0 && username.length > 0) {
      foundAdmin.username = username;
      await foundAdmin.save();
    } else if (newPassword.length > 0 && username.length == 0) {
      const isMatch = await bcrypt.compare(
        currentPassword,
        foundAdmin.password
      );
      if (!isMatch) {
        return res
          .status(401)
          .json({ status: false, msg: "Password is wrong" });
      }
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(newPassword, salt);
      foundAdmin.password = hash;
      await foundAdmin.save();
    }
    return res.status(200).json({ status: true, foundAdmin });
  } catch (error) {
    return res.status(500).json({ status: "failure", msg: error.message });
  }
};

module.exports = {
  handleRegister,
  handleLogin,
  handleAddPatient,
  handleGetPatient,
  getSpecificPatient,
  handleUpdateOPD,
  getSpecificOpd,
  updateNameAndPassword,
};
