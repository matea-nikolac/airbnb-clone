import { sendError } from '../config/errors.js'
import Trip from '../models/trips.js'

export const getTrips = async (req, res) => {
  try {
    const { userId } = req.params
    const trips = await Trip.find().populate('owner').populate('placeId')
    return res.json(trips)

  } catch (error) {
    sendError(error, res)
  }
}

export const getSingleTrip = async (req, res) => {
  try {
    const { userId, placeId } = req.params
    const trip = await Trip.findOne({ owner: userId }).populate('owner').populate('placeId')
    return res.json(trip)
  } catch (error) {
    sendError(error, res)
  }
}

export const addNewTrip = async (req, res) => {
  try {
    const { placeId } = req.body
    const { userId  } = req.params

    const trip = await Trip.create({ ...req.body, owner: userId })

    const populateTrip = await Trip.findById(trip._id).populate('owner').populate('placeId')

    return res.status(201).json(populateTrip)

  } catch (error) {
    sendError(error, res)
  }
}