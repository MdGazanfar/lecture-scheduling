import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  userType: { type: String, enum: ['admin', 'lecturer'], required: true },
},
  {
    versionKey: false,
    collection: "users",
  }
);

const User = mongoose.model('User', userSchema);

export default User;
