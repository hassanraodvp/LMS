import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    courseTitle: {
      type: String,
      required: true,
    },
    subTitle: {
      type: String,
    },
    description: {
      type: String,
    },
    category: {
      type: String,
      required: true,
    },
    courseLevel: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
    },
    coursePrice: {
      type: Number,
    },
    courseThumbnail: {
      type: String,
    },
    enrolledStudents: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    lectures: [
      {
        typeof: mongoose.Schema.Types.ObjectId,
      },
    ],
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export const Course = mongoose.model("Course", courseSchema);
