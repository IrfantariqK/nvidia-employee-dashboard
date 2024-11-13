// this is models Employee
import mongoose from "mongoose";

const EmployeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  class: { type: String, required: true },
  subjects: { type: [String], required: true },
  attendance: { type: Number, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  joinDate: { type: Date, required: true, default: Date.now },
});

export default mongoose.models.Employee ||
  mongoose.model("Employee", EmployeeSchema);
