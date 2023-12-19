import express from 'express'
import { createPlace, getPlaces, getSinglePlace } from '../controllers/places.js'
import { loginUser, registerUser } from '../controllers/auth.js'
import { secureRoute } from './secureRoute.js'
import { addToWishlist, getWishlist } from '../controllers/wishlists.js'
import { addNewTrip, getSingleTrip, getTrips } from '../controllers/trips.js'
import { getReviews, postReview } from '../controllers/reviews.js'
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

router.route('/users/:userId/wishlist')
  .get(secureRoute, getWishlist)

router.route('/users/:userId/wishlist')
  .post(secureRoute, addToWishlist)

router.route('/users/:userId/trips')
  .post(secureRoute, addNewTrip)

router.route('/users/:userId/trips')
  .get(secureRoute, getTrips)

router.route('/users/:userId/trips/:tripId')
  .get(secureRoute, getSingleTrip)

router.route('/places/:placeId/reviews')
  .get(secureRoute, getReviews)
  
router.route('/places/:placeId/reviews')
  .post(secureRoute, postReview)

export default router