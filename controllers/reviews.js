import { NotFound, sendError } from '../config/errors.js'
import Place from '../models/places.js'

export const getReviews = async (req, res) => {
  try {
    const { placeId } = req.params
    const place = await Place.findOne({ _id: placeId })
    if (!place) throw new NotFound('Place not found')

    const { reviews } = place
    return res.json(reviews)

  } catch (error) {
    sendError(error, res)
  }
}

export const postReview = async (req, res) => {
  try {
    const { placeId } = req.params
    const { owner } = req.body

    const place = await Place.findById(placeId)
    if (!place) throw new NotFound('Place not found')

    const reviewToAdd = { ... req.body, owner: owner }
    place.reviews.unshift(reviewToAdd)
    await place.save()

    return res.status(201).json(place)

  } catch (error) {
    sendError(error, res)
  }
}