const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// Define the person schema
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
  },
  work: {
    type: String,
    enum: ["chef", "waiter", "manager"],
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
    required: true,
  },
  salary: {
    type: Number,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Use a regular function to ensure `this` is bound correctly
personSchema.pre("save", async function (next) {
  const person = this;
  // Hash the password only if it has been modified (or is new)
  if (!person.isModified("password")) return next();
  try {
    // Hash password generation
    const salt = await bcrypt.genSalt(10);
    // Hash password
    const hashedPassword = await bcrypt.hash(person.password, salt);
    // Overwrite the plain password with the hashed one
    person.password = hashedPassword;
    next();
  } catch (err) {
    return next(err);
  }
});

// Use a regular function to ensure `this` is bound correctly
personSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    // Use bcrypt to compare the provided password with the hashed password
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
  } catch (err) {
    throw err;
  }
};

// Create person model
const person = mongoose.model("person", personSchema);

module.exports = person;
