import mongoose from "mongoose";

const connectDatabase = async (): Promise<void> => {
  try {
    await mongoose.connect("mongodb://localhost:27017", {
      dbName: "synxChain",
    });
    console.log("databse connected sucessfully");
  } catch (error) {
    console.log(error);
  }
};

export default connectDatabase;