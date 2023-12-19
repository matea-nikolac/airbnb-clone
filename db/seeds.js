import mongoose from 'mongoose'
import 'dotenv/config'

//models
import User from '../models/users.js'
import Place from '../models/places.js'
import Trips from '../models/trips.js'
import Wishlist from '../models/wishlists.js'

//data
import placeData from '../db/data/places.js'
import userData from '../db/data/users.js'
import tripData from '../db/data/trips.js'

const seedDatabase = async() => {
  try {
    // connect to the db
    await mongoose.connect(process.env.MONGO_URI)
    console.log('🚀 Database connection established')

    // drop the db
    await mongoose.connection.db.dropDatabase()
    console.log('❌ Database dropped')

    // create places, trips, users, wishlists and reviews and add data to db
    const createdUsers = await User.create(userData)

    const placesToAdd = placeData.map(place => {
      const updatedReviews = place.reviews.map(review => ({ ...review, owner: createdUsers[0]._id }))
      return { ...place, reviews: updatedReviews }
    })

    const createdPlaces = await Place.create(placesToAdd)

    const tripsToAdd = tripData.map(trip => {
      const randomPlace = createdPlaces[Math.floor(Math.random() * createdUsers.length)]
      return { ...trip, owner: createdUsers[0]._id, placeId: randomPlace._id }
    })
    const createdTrips = await Trips.create(tripsToAdd)

    const createdWishlist = await Wishlist.create({
      owner: createdUsers[0],
      places: [createdPlaces[0]._id, createdPlaces[1]._id],
    })

    console.log('data added')

    // close the connection to the db
    await mongoose.connection.close()
    console.log('👋 Connection closed')

  } catch (error) {
    console.log(error)
    await mongoose.connection.close()
  }
}

seedDatabase()