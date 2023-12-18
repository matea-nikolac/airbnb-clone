import Place from '../models/places.js'
import { sendError } from '../config/errors.js'

export const getPlaces = async (req, res) => {
  try {
    const places = await Place.find()
    return res.json(places)
  } catch (error) {
    sendError(error, res)
  }
}

export const getSinglePlace = async (req, res) => {
  try {
    const { id } = req.params
    const place = await Place.findById(id)
    return res.json(place)
  } catch (error) {
    sendError(error, res)
  }
}

export const createPlace = async (req, res) => {
  try {
    const createdPlace = await Place.create(req.body)
    return res.status(201).json(createdPlace)
  } catch (error) {
    sendError(error, res)
  }
}