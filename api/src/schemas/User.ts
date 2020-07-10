import * as mongoose from 'mongoose'

interface UserInterface extends mongoose.Document {
  username: string,
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  token: string,
  mobile: string,
  location: string,
  citizenship: string,
  create_date: Date,
  skype: string,
  activated: boolean,
  fullLegalName(): string
}

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true},
  password: { type: String, required: true },
  token: { type: String, required: true },
  mobile: { type: String, required: true },
  location: String,
  citizenship: { type: String, required: true },
  create_date: { type: Date, default: Date.now },
  skype: String,
  activated : Boolean,
}, { timestamps: true })

UserSchema.methods.fullLegalName = function () { return `${this.firstName} ${this.lastName}` }

const UserModel = mongoose.model<UserInterface>('User', UserSchema)
export default UserModel
