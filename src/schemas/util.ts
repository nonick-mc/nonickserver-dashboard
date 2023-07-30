import { Schema } from 'mongoose';

export const snowflake = {
  type: Schema.Types.String,
  trim: true,
  match: /^\d{16,}$/,
};