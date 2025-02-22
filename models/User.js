import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  date_of_birth: { type: Date, required: true },
  gender: { type: String, required: true },
  mobile_no: { type: String, required: true },
  address: { type: String, required: true }
});

export default mongoose.models.User || mongoose.model('User', UserSchema);
