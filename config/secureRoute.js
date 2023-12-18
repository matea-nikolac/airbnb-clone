import { NotFound, Unauthorized, sendError } from './errors.js'
import User from '../models/users.js'
import jwt from 'jsonwebtoken'

export const secureRoute = async (req, res, next) => {
  try {
    // get the token
    const { authorization } = req.headers
    const token = authorization.replace('Bearer ', '')

    // verify the token - check if the token corresponds to a user in the DB
    const payload = jwt.verify(token, process.env.SECRET)

    // pass on the loggedInUser
    const loggedInUser = await User.findById(payload.sub)
    if (!loggedInUser) throw new NotFound('User not found')
    req.loggedInUser = loggedInUser

  } catch (error) {
    throw new Unauthorized('Unauthorized')
  }
  next()
}