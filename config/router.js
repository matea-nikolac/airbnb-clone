import express from 'express'
import { createPlace, getPlaces, getSinglePlace } from '../controllers/places.js'
import { loginUser, registerUser } from '../controllers/auth.js'
import { secureRoute } from './secureRoute.js'
import { addToWishlist, getWishlist } from '../controllers/wishlists.js'
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


router.route('/users/:userId/wishlist/:placeId')
  .post(secureRoute, addToWishlist)

export default router