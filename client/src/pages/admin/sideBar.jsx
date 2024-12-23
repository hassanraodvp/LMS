// import React from "react";

import { ChartNoAxesColumn, SquareLibrary } from "lucide-react";
import { Link, Outlet } from "react-router-dom";

const sideBar = () => {
  return (
    <div className="flex">
      <div className="hidden lg:block w-[270px] sm:w-[290px] space-y-8 border-r-gray-300 dark:border-gray-700 bg-gradient-to-b from-blue-900 to-blue-500 text-white p-5 top-0 sticky h-screen">
        <div className="flex flex-col mt-20">
          <Link
            to="dashboard"
            className="flex items-center my-5 hover:text-gray-400"
          >
            <ChartNoAxesColumn size={24} />
            <h1 className="px-2 text-2xl tracking-wide sm:text-xl">
              Dashboard
            </h1>
          </Link>
          <Link
            to="course"
            className="flex items-center my-5 hover:text-gray-400"
          >
            <SquareLibrary size={24} />
            <h1 className="px-2 text-2xl tracking-wide sm:text-xl"> Courses</h1>
          </Link>
        </div>
      </div>
      <div className="flex-1 p-2 bg-gray-100 md:py-20 md:px-14">
        <Outlet />
      </div>
    </div>
  );
};

export default sideBar;
