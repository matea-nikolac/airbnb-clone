import express from 'express'
import { createPlace, getPlaces, getSinglePlace } from '../controllers/places.js'
const router = express.Router()

router.route('/places')
  .get(getPlaces)
  .post(createPlace)

router.route('/places/:id')
  .get(getSinglePlace)
  
export default router