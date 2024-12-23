// import React from "react";

import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import CourseTab from "./courseTab";

const EditCourse = () => {
  return (
    <div className="flex-1 ">
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-2xl font-bold tracking-normal ">
          Add Detail information regarding to this course
        </h1>
        <Link>
          <Button
            className="tracking-wide hover:text-blue-500 dark:text-slate-200 dark:hover:text-slate-400"
            variant="link"
          >
            Go To Lec&apos;s Page
          </Button>
        </Link>
      </div>
      <CourseTab />
    </div>
  );
};

export default EditCourse;
