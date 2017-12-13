import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const { Schema } = mongoose;

// To fix https://github.com/Automattic/mongoose/issues/4291
mongoose.Promise = global.Promise;


const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    }
});

//hashing a password
userSchema.pre('save', function (next) {
  bcrypt.hash(this.password, 10, (err, hash) => {
    if (err) {
      return next(err);
    }
    this.password = hash;
    next();
  })
});

export default mongoose.model('User', userSchema);