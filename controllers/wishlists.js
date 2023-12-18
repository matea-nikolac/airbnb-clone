import { NotFound, sendError } from '../config/errors.js'
import User from '../models/users.js'
import Wishlist from '../models/wishlists.js'

export const getWishlist = async (req, res) => {
  try {
    const { userId } = req.params
    const wishlist = await Wishlist.findOne({ owner: userId }).populate('places')
    return res.json(wishlist)
    
  } catch (error) {
    sendError(error, res)
  }
}

export const addToWishlist = async (req, res) => {
  try {
    const { userId, placeId } = req.params
    let wishlist = await Wishlist.findOne({ owner: userId }).populate('owner').populate('places')
    
    if (!wishlist) {
      wishlist = await Wishlist.create({ owner: userId, places: [] })
    }

    const isPlaceAlreadyAdded = wishlist.places.some(place => place._id.toString() === placeId)

    if (!isPlaceAlreadyAdded){
      wishlist.places.push(placeId)
      await wishlist.save()
      return res.status(201).json(wishlist)
    } else {
      return res.status(409).json({ error: 'The place is already in the wishlist' }) 
    }
  } catch (error) {
    sendError(error, res)
  }
}