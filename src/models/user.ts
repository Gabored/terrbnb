import { Schema, Document, model, Model } from 'mongoose';

interface User extends Document {
  _id: Schema.Types.ObjectId;
  name: string;
  email: string;
  password: string;
  role: 'standard' | 'owner' | 'admin';
  profilePicture?: string;
}

interface UserModel extends Model<User> {
  getAllUsers(): Promise<User[]>;
  getUserById(userId: string): Promise<User | null>;
  createUser(userData: User): Promise<User>;
  updateUser(userId: string, updateData: Partial<User>): Promise<User | null>;
  deleteUser(userId: string): Promise<User | null>;
}

const userSchema: Schema<User> = new Schema({
  _id: { type: Schema.Types.ObjectId, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['standard', 'owner', 'admin'], required: true },
  profilePicture: { type: String }
});

// Static methods for CRUD operations
userSchema.statics.getAllUsers = async function (): Promise<User[]> {
  return this.find();
};

userSchema.statics.getUserById = async function (userId: string): Promise<User | null> {
  return this.findById(userId);
};

userSchema.statics.createUser = async function (userData: User): Promise<User> {
  return this.create(userData);
};

userSchema.statics.updateUser = async function (userId: string, updateData: Partial<User>): Promise<User | null> {
  return this.findByIdAndUpdate(userId, updateData, { new: true });
};

userSchema.statics.deleteUser = async function (userId: string): Promise<User | null> {
  return this.findByIdAndDelete(userId);
};

export const UserModel: UserModel = model<User, UserModel>('User', userSchema);
