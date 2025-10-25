import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB Crashedd"));
db.once("open", () => console.log("MongoDB connected"));
const querySchema = new mongoose.Schema({
  queryNo: Number,
  query: String,
  response: String,
  risktype: String,
  time: String,
});
const Query = mongoose.model("hards", querySchema);
app.get("/", async (req, res) => {
  try {
    const allData = await Query.find(); 
    res.json(allData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
