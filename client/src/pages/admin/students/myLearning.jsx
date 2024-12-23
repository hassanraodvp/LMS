// import React from 'react'

import Course from "./Course";

const MyLearning = () => {
  const isLoading = false;
  const myLearningCourses = [1, 2];
  return (
    <>
      <div className="max-w-4xl px-4 mx-auto my-24 md:px-1">
        <h1 className="text-2xl font-bold text-gray-900 ">My Learning</h1>
        <div className="my-5">
          {isLoading ? (
            <MyLearningSkeleton />
          ) : myLearningCourses.length === 0 ? (
            <p>You are not enrolled in any courses yet.</p>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-2">
              {[1, 2, 3].map((_, index) => (
                <Course key={index} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MyLearning;

export const MyLearningSkeleton = () => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
      {[...Array(3)].map((_, index) => (
        <div
          key={index}
          className="h-40 bg-gray-200 rounded-lg shadow-md dark:bg-gray-700 animate-pulse"
        ></div>
      ))}
    </div>
  );
};
