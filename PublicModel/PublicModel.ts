import mongoose, { Schema } from "mongoose";
const userSchema = new Schema({
  name: {
    require: [true],
    type: Schema.Types.String,
  },
  email: {
    require: [true],
    type: Schema.Types.String,
    unique: true,
    trim: true,
  },
  password: {
    require: [true],
    type: Schema.Types.String,
  },
  confirmPassword: {
    require: [true],
    type: Schema.Types.String,
  },
  role: {
    require: [true],
    type: String,
  },
  address: {
    require: [true],
    type: Schema.Types.String,
  },
  contactNo: {
    require: [true],
    type: Schema.Types.String,
  },
  course: {
    require: [true],
    type: Schema.Types.String,
  },
 });

export const PublicModel =
  mongoose.models.PublicModel || mongoose.model("PublicModel", userSchema);
