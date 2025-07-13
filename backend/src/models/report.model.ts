// @ts-check
const mongoose = require('mongoose');
const { Schema } = mongoose;

/**
 * @typedef {Object} Report
 * @property {{ lat: number, lng: number }} location
 * @property {string} description
 * @property {string} [imageUrl]
 * @property {Date} createdAt
 */

const ReportSchema = new Schema({
  location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true }
  },
  description: { type: String, required: true },
  imageUrl: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Report', ReportSchema);
