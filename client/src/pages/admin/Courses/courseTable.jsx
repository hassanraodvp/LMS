import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetCreatorCourseQuery } from "@/features/api/courseApi";
import { Edit2, Loader } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const CourseTable = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useGetCreatorCourseQuery();
  if (isLoading)
    return (
      <div className="flex">
        <Loader className="mr-2" /> Please Wait
      </div>
    );
  return (
    <div>
      <Link to="add-new-course">
        <Button>Add a new Course</Button>
      </Link>
      <Table className="mt-4 border border-b-gray-300 ">
        <TableCaption className="tracking-wide">
          A list of your courses shown here.{" "}
        </TableCaption>
        <TableHeader className="bg-gray-200">
          <TableRow>
            <TableHead className="w-[100px]">Price</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Title</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.courses.map((course) => (
            <TableRow key={course?._id}>
              <TableCell className="font-medium">
                {course?.coursePrice || "NA"}
              </TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className="px-2 py-1 border-gray-700 dark:border-gray-200 "
                >
                  {course?.isPublished ? "Published" : "Draft"}
                </Badge>
              </TableCell>
              <TableCell className="font-semibold tracking-wide">
                {course?.courseTitle}
              </TableCell>
              <TableCell className="text-right">
                <Button
                  size="sm"
                  className="p-4"
                  onClick={() => navigate(`${course?._id}`)}
                >
                  <Edit2 />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CourseTable;
