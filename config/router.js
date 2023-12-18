import express from 'express'
import { createPlace, getPlaces, getSinglePlace } from '../controllers/places.js'
import { loginUser, registerUser } from '../controllers/auth.js'
import { secureRoute } from './secureRoute.js'
const router = express.Router()

router.route('/places')
  .get(getPlaces)
  .post(secureRoute, createPlace)

router.route('/places/:id')
  .get(getSinglePlace)
  
router.route('/register')
  .post(registerUser)

router.route('/login')
  .post(loginUser)
  
export default router