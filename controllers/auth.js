import { Unauthorized, sendError } from '../config/errors.js'
import User from '../models/users.js'
import jwt from 'jsonwebtoken'

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
    const { email, password } = req.body
    console.log(email,password)

    const userToLogin = await User.findOne({ email: email })
    console.log(userToLogin)

    const userIsValidated = await userToLogin.validatePassword(password)

    if (!userToLogin || !userIsValidated){
      throw new Error()
    }

    const token = jwt.sign({ sub: userToLogin._id }, process.env.SECRET, { expiresIn: '7d' })
    
    return res.json({ message: `Welcome back ${userToLogin.username}`, token: `${token}` })

  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized' })
  }
}