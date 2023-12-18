import mongoose from 'mongoose'

const wishlistSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  places: [{ type: mongoose.Schema.ObjectId, ref: 'Place' }],
})

export default mongoose.model('Wishlist', wishlistSchema)
