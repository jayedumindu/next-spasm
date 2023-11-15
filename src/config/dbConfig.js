import mongoose, { mongo } from "mongoose";

export const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    let connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("successfully connected!");
    });

    connection.on("error", () => {
      console.log("error occured!");
    });
  } catch (error) {
    console.log("something happened with the connection!", error);
  }
};
