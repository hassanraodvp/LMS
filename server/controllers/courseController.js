import { Course } from "../models/courseModel.js";
export const createCourse = async (req, res) => {
  try {
    const { courseTitle, category } = req.body;
    if (!courseTitle || !category) {
      return res.status(400).json({
        message: "Course title and Category are required",
        success: false,
      });
    }
    const course = await Course.create({
      courseTitle,
      category,
      creator: req.id,
    });
    return res.status(201).json({
      message: "Course created successfully",
      success: true,
      course,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Failed to create course",
      success: false,
    });
  }
};

export const getCreatorCourses = async (req, res) => {
  try {
    const userId = req.id;
    const courses = await Course.find({ creator: userId });
    if (!courses) {
      return res.status(404).json({
        message: "No courses found for this creator",
        success: false,
      });
    }
    return res.json({
      message: "creator course fetched successfully",
      success: true,
      courses,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Failed to fetch creator course",
      success: false,
    });
  }
};
