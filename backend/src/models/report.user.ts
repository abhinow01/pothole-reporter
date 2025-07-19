// @ts-check
const mongoose = require('mongoose');
const { Schema } = mongoose;

/**
 * @typedef {string} googleId
 * @typedef {string} name
 * @typedef {string} email
 * @typedef {string} picture 
 */

const UserSchema = new Schema({
  googleId : { type: String, required: true, unique: true },
  name: String,
  email: { type: String, required: true },
  picture: String,
})
