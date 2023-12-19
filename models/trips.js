import mongoose from 'mongoose'

const tripSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  checkInDate: { type: Date, required: true },
  checkOutDate: { type: Date, required: true },
  placeId: { type: mongoose.Schema.ObjectId, ref: 'Place', required: true },
})

export default mongoose.model('Trip', tripSchema )