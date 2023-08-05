import { Model, Schema, model, models } from 'mongoose';
import { snowflake } from './util';

export interface IUserSchema {
  id: string;
  username: string;
  globalName?: string;
  discriminator: string;
  avatar: string;
  color?: number;
}

const userSchema = new Schema<IUserSchema>({
  id: { ...snowflake, required: true, unique: true },
  username: { type: Schema.Types.String, required: true },
  globalName: { type: Schema.Types.String },
  discriminator: { type: Schema.Types.String, required: true },
  avatar: { type: Schema.Types.String, required: true },
  color: { type: Schema.Types.Number, min: 0x000000, max: 0xFFFFFF },
}, {
  versionKey: false,
});
userSchema.index({ id: 1 }, { name: 'id', unique: true });

export default models?.users
  ? (models.users as Model<IUserSchema>)
  : model<IUserSchema, Model<IUserSchema>>('users', userSchema);