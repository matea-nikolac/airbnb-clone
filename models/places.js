import mongoose from 'mongoose'

const reviewSchema = new mongoose.Schema({
  text: { type: String, required: true, maxLength: 1000 },
  owner: { type: mongoose.Schema.ObjectId, reg: 'User', required: true },
})

const placeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  armenities: [String],
  description: { type: String, required: true },
  max_guests: { type: Number, required: true },
  availability: { type: [Date], default: [] },
  images: [String],
  category: { type: String, required: true },
  location: { type: String, required: true },
  reviews: [reviewSchema],
  //! Add owner here
  //! Add reviews here
})

export default mongoose.model('Place', placeSchema)
