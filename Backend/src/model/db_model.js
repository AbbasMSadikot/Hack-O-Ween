import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    queryNo: { type: Number, required: true, unique: true },
    query: { type: String, required: true },
    riskType: { type: String, required: true }, // required string
    time: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const UserPrompt = mongoose.model("queries", schema);
