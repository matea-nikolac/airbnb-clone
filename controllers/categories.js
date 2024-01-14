import Category from '../models/categories.js'
import { sendError } from '../config/errors.js'

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find()
    return res.json(categories)
  } catch (error) {
    sendError(error, res)
  }
}