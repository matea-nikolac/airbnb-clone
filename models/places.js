import mongoose from 'mongoose'

const placeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  armenities: [String],
  description: { type: String, required: true },
  max_guests: { type: Number, required: true },
  availability: { type: [Date], default: [] },
  images: [String],
  category: { type: String, required: true },
  location: { type: String, required: true },
  //! Add owner here
  //! Add reviews here
})

export default mongoose.model('Place', placeSchema)