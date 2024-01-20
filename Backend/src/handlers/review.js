import prisma from "../db.js";
import logger from "../modules/logger.js";

export const review = async (req, res, next) => {
  try {
    const review = await prisma.review.create({
      data: req.body
    })
    return res.status(201).json(review)
  } catch (err) {
    logger.error(err)
    return res.status(500).json({message: err.message})
  }
}

export const updateReview = async (req, res, next) => {
  try {
    const review = await prisma.review.update({
      where: {
        id: req.params.id
      },
      data: req.body
    })

    if(!review) {
      return res.status(404).json({message: 'Review not found'})
    }
    return res.status(200).json({message: 'Review updated'})
  } catch (err) {
    logger.error(err)
    return res.status(500).json({message: err.message})
  }
}

export const reviewForm = async (req, res, next) => {
  try {
    const fileId = process.env.REVIEW_FORM_FILE_ID
    res.redirect(`/api/files/${fileId}`)
  } catch (err) {
    logger.error(err)
    return res.status(500).json({message: err.message})
  }
}

