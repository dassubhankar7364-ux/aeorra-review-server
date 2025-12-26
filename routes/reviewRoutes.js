const express = require("express");
const Review = require("../models/Review");

const router = express.Router();

/**
 * POST /api/reviews
 * Submit a new review
 */
router.post("/", async (req, res) => {
  try {
    const {
      productId,
      productHandle,
      customerId,
      customerName,
      rating,
      title,
      comment,
      images,
      verifiedBuyer
    } = req.body;

    if (!productId || !customerId || !customerName || !rating || !comment) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    const review = new Review({
      productId,
      productHandle,
      customerId,
      customerName,
      rating,
      title,
      comment,
      images: images || [],
      verifiedBuyer: verifiedBuyer || false,
      approved: false
    });

    await review.save();

    res.status(201).json({
      message: "Review submitted successfully",
      review
    });
  } catch (error) {
    console.error("Review submit error:", error);
    res.status(500).json({ message: "Server error" });
  }
});
// GET reviews by productId
router.get("/:productId", async (req, res) => {
  try {
    const { productId } = req.params;

    const reviews = await Review.find({
      productId,
      approved: true
    }).sort({ createdAt: -1 });

    const totalReviews = reviews.length;

    const averageRating =
      totalReviews === 0
        ? 0
        : (
            reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews
          ).toFixed(1);

    res.json({
      averageRating,
      totalReviews,
      reviews
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch reviews" });
  }
});


module.exports = router;
