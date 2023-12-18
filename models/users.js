import bcrypt from 'bcrypt'
import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profileImage: { type: String },
})

userSchema.virtual('wishlists', {
  ref: 'Wishlist',  
  localField: '_id', 
  foreignField: 'owner', 
})

userSchema.set('toJSON', {
  virtuals: true,
  transform: function(doc, ret){
    delete ret.password
  },
})

userSchema
  .virtual('passwordConfirmation')
  .set(function(userPasswordConfirmation){
    this._passwordConfirmation = userPasswordConfirmation
  })

userSchema.pre('validate', function(next){
  if (this.password !== this._passwordConfirmation){
    this.invalidate('passwordConfirmation', 'The passwords do not match')
  }
  next()
})

userSchema.pre('save', function(next){
  if (this.isModified('password')){
    const salt = bcrypt.genSaltSync(12)
    this.password = bcrypt.hashSync(this.password, salt)
  }
  next()
})

userSchema.methods.validatePassword = function(plainTextPassword){
  return bcrypt.compare(plainTextPassword, this.password)
}


export default mongoose.model('User', userSchema)