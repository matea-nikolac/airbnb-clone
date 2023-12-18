import { sendError } from '../config/errors.js'
import User from '../models/users.js'

//* REGISTER ROUTE

export const registerUser = async (req, res) => {
  try {
    const user = await User.create(req.body)
    return res.status(201).json(user)
  } catch (error) {
    sendError(error, res)
  }
}

//* LOGIN ROUTE

export const loginUser = async (req, res) => {
  try {
    //code
  } catch (error) {
    sendError(error, res)
  }
}