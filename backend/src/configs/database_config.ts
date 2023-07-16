import mongoose from "mongoose";

export const dbConnect = () => {
  mongoose.set("strictQuery", false);
  mongoose
    .connect(process.env.DB_CONN!)
    .then(() => console.log("Database connected"))
    .catch(() => console.log("Failed to connect to the database"));
};
