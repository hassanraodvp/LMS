import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
import HeroSection from "./pages/admin/students/heroSection";
import Course from "./pages/admin/students/Courses";
import MainLayout from "./layout/mainLayout";
import MyLearning from "../src/pages/admin/students/MyLearning";
import Profile from "./pages/admin/students/Profile";
import Sidebar from "../src/pages/admin/sideBar";
import Dashboard from "./pages/admin/Dashboard";
import CourseTable from "./pages/admin/Courses/CourseTable";
import AddCourse from "./pages/admin/Courses/AddCourse";
import EditCourse from "./pages/admin/Courses/editCourse";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: (
          <>
            <HeroSection />,
            <Course />
          </>
        ),
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/my-learning",
        element: <MyLearning />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },

      //Admin routes Start From here
      {
        path: "/admin",
        element: <Sidebar />,
        children: [
          {
            path: "dashboard",
            element: <Dashboard />,
          },
          {
            path: "course",
            element: <CourseTable />,
          },
          {
            path: "course/add-new-course",
            element: <AddCourse />,
          },
          {
            path: "course/:courseId",
            element: <EditCourse />,
          },
        ],
      },
    ],
  },
]);

const App = () => {
  return (
    <main>
      <RouterProvider router={appRouter} />
    </main>
  );
};

export default App;
