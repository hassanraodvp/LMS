import React from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCreateCourseMutation } from "@/features/api/courseApi";
import { toast } from "sonner";

const AddCourse = () => {
  const [courseTitle, setCourseTitle] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [createCourse, { data, error, isSuccess, isLoading }] =
    useCreateCourseMutation();

  const navigate = useNavigate();

  const getSelectedCategory = (value) => {
    setCategory(value);
  };
  const createCourseHandler = async () => {
    await createCourse({ courseTitle, category });
  };

  React.useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "Course created successfully");
      navigate("/admin/course");
    }
    if (error) {
      toast.error(data?.error?.message || "Something went wrong");
    }
  }, [isSuccess, error]);

  return (
    <div className="flex-1 mx-10">
      <div className="mb-4">
        <h1 className="text-4xl font-bold">
          Let&apos;s add a new course&apos;s.
        </h1>
        <p className="text-sm text-gray-600 ">
          (Course Description here...) e.g. This is a MERN Stack course.
        </p>
      </div>
      <div className="flex flex-col mb-4">
        <label className="px-1 py-2 font-semibold tracking-wide text-gray-800 dark:text-slate-200">
          Course Title:
        </label>
        <input
          type="text"
          placeholder="Your course name"
          value={courseTitle}
          onChange={(e) => setCourseTitle(e.target.value)}
          className="w-full px-3 py-2 font-semibold tracking-wider border-none rounded-sm dark:text-slate-200 dark:bg-slate-800 dark:placeholder-slate-400 focus:outline-none bg-slate-300"
        />
      </div>
      <div className="flex flex-col mb-4">
        <label className="px-1 py-3 font-semibold tracking-wide text-gray-800 dark:text-slate-200">
          Category:
        </label>
        <Select onValueChange={getSelectedCategory}>
          <SelectTrigger className="w-[190px]">
            <SelectValue placeholder="Select your category" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup className="pb-10">
              <SelectLabel>Category:</SelectLabel>
              <SelectItem value="c">C, C++ & C#</SelectItem>
              <SelectItem value="ror">Ruby on Rails</SelectItem>
              <SelectItem value="javascript">JavaScript</SelectItem>
              <SelectItem value="python">Python</SelectItem>
              <SelectItem value="php">PHP</SelectItem>
              <SelectItem value="java">Java</SelectItem>
              <SelectItem value="bash">Bash</SelectItem>
              <SelectItem value="rust">Rust</SelectItem>
              <SelectItem value="kotlin">Kotlin</SelectItem>
              <SelectItem value="docker">Docker</SelectItem>
              <SelectItem value="sql">SQL</SelectItem>
              <SelectItem value="nosql">NoSQL</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-center gap-3 my-5 ">
        <Button
          className=""
          variant="outline"
          onClick={() => navigate("/admin/course")}
        >
          Back
        </Button>
        <Button disabled={isLoading} onClick={createCourseHandler}>
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 mr-3 animate-spin" />
              Please wait...
            </>
          ) : (
            "Create"
          )}
        </Button>
      </div>
    </div>
  );
};

export default AddCourse;
