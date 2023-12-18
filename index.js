import express from 'express'
import mongoose from 'mongoose'
import 'dotenv/config'
import router from './config/router.js'

const app = express()

const startServer = async () => {
  try {

    //parse incoming requests with JSON payloads
    app.use(express.json())

    // start the mongoose server
    await mongoose.connect(process.env.MONGO_URI)

    // capture incoming requests
    app.use((req, res, next) => {
      console.log(`Incoming request: ${req.method} ${req.url}`)
      next()
    })

    // integrate the defined routes
    app.use('/api', router)

    // middleware for handling routes not found
    app.use((req, res) => {
      return res.status(404).json({ message: 'Route not found' })
    })

    // listen to server
    app.listen(process.env.PORT, () => {
      console.log(`Server up and running on port ${process.env.PORT}`)
    })
  } catch (error) {
    console.log(error.message)
  }

}

startServer()