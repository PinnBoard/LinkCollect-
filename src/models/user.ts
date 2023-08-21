import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcrypt';
import SALT  from '../config';

export interface IUser extends Document {
  name: string;
  email: string;
  username: string;
  profilePic?: string;
  password?: string;
  isPremium: boolean;
  isPublic: boolean;
  isPinned: boolean;
  pinnedTime: boolean;
  collections: Schema.Types.ObjectId[];
  savedCollections: Schema.Types.ObjectId[];
  emailToken?: string;
  verified?: number;
  socials: [{ [key: string]: string }];
}

const userSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    profilePic: {
      type: String,
    },
    password: {
      type: String,
    },
    isPremium: {
      type: Boolean,
      default: false,
    },
    isPublic: {
      type: Boolean,
      default: true,
    },
    socials : [
      String
    ],
    collections: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Collection',
      },
    ],
    savedCollections: [  {
      type: Schema.Types.ObjectId,
      ref: 'Collection',
    },
    ],
    
    emailToken: {
      type: String,
    },
    verified: {
      type: Number,
    },
  },
  { timestamps: true },
  // {  timestamps: true , collection: 'User' }
);

userSchema.pre('save', function (next) {
  if (!this.password || !this.isModified('password') || !this.isModified('username')) return next();

  const encryptedPassword = bcrypt.hashSync(this.password, Number(SALT));
  this.password = encryptedPassword;
  next();
});

const User = mongoose.model<IUser>('User', userSchema);
export default User;
