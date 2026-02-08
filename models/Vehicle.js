import mongoose from "mongoose";

const VehicleSchema = new mongoose.Schema({
  name: String,
  price: String,
  image: String,
});

export default mongoose.models.Vehicle ||
  mongoose.model("Vehicle", VehicleSchema);
