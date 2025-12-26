const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  productId: {
    type: String,
    required: true
  },

  productHandle: {
    type: String,
    required: true
  },

  customerId: {
    type: String,
    required: true
  },

  customerName: {
    type: String,
    required: true
  },

  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },

  title: {
    type: String
  },

  comment: {
    type: String,
    required: true
  },

  images: [
    {
      type: String
    }
  ],

  verifiedBuyer: {
    type: Boolean,
    default: false
  },

  approved: {
    type: Boolean,
    default: false
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Review", reviewSchema);
