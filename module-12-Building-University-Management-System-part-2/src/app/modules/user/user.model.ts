import { model, Schema } from 'mongoose';
import { TUser } from './user.interface';
import config from '../../config';
import bcrypt from 'bcrypt';

const userSchema = new Schema<TUser>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    needsPasswordChange: {
      type: Boolean,
      default: true,
    },
    role: {
      type: String,
      enum: ['admin', 'student', 'faculty'],
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ['in-progress', 'blocked'],
      default: 'in-progress',
    },
  },
  { timestamps: true },
);

// pre save middleaware / hook
userSchema.pre('save', async function (next) {
  // code to be executed before saving the document
  // console.log(this, 'pre hook code to be executed before saving the document');
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  //hashing password and save in db
  user.password = await bcrypt.hash(user.password, Number(config.bcrypt_salt));
  next();
});
// post save middleware / hook
userSchema.post('save', function (doc, next) {
  // code to be executed after saving the document
  doc.password = '';
  next();
});
userSchema.pre('find', function (next) {
  // console.log(this);
  this.find({ isDeleted: { $ne: true } });
  next();
});
userSchema.pre('findOne', function (next) {
  // console.log(this);
  this.findOne({ isDeleted: { $ne: true } });
  next();
});
userSchema.pre('aggregate', function (next) {
  // console.log(this);
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });

  next();
});

export const User = model<TUser>('user', userSchema);
