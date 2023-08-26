import { Schema, model } from "mongoose";

export const TokenSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
  token: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: 300 }
});

const Token = model('Token', TokenSchema);

export default Token;