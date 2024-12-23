import React from "react";

import RichTextEditor from "@/components/RichTextEditor";
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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

const CourseTab = () => {
  const navigate = useNavigate();
  const [input, setInput] = React.useState({
    courseTitle: "",
    subTitle: "",
    description: "",
    coursePrice: "",
    category: "",
    courseLevel: "",
    courseThumbnail: "",
  });
  const [previewThumbnail, setPreviewThumbnail] = React.useState("");
  const changeEventHandler = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };
  const selectCategory = (value) => {
    setInput({ ...input, category: value });
  };
  const selectCourseLevel = (value) => {
    setInput({ ...input, courseLevel: value });
  };
  const selectThumbnail = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setInput({ ...input, courseThumbnail: file });
      const fileReader = new FileReader();
      fileReader.onloadend = () => setPreviewThumbnail(fileReader.result);
      fileReader.readAsDataURL(file);
    }
  };
  const updateCourseHandler = () => {
    console.log(input);
  };

  const isPublished = true;
  const isLoading = false;
  return (
    <Card>
      <CardHeader className="flex flex-row justify-between ">
        <div>
          <CardTitle className="text-2xl font-bold tracking-wide">
            Course Information
          </CardTitle>
          <CardDescription className="tracking-wide">
            Make changes to your course Information, Click save when you have
            finished.
          </CardDescription>
        </div>
        <div className="">
          <Button
            variant="outline"
            className="mx-2 tracking-wider hover:text-slate-200 hover:bg-slate-950 "
          >
            {isPublished ? "Unpublished" : "Published"}
          </Button>
          <Button>Remove Course</Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mt-5 space-y-4">
          <div>
            <Label className="tracking-wide">Title:</Label>
            <Input
              className="tracking-wide"
              type="text"
              value={input.courseTitle}
              onChange={changeEventHandler}
              placeholder="Ex. Fullstack Developer"
              name="courseTitle"
            />
          </div>
          <div>
            <Label className="tracking-wide">Subtitle:</Label>
            <Input
              className="tracking-wide"
              type="text"
              value={input.subTitle}
              onChange={changeEventHandler}
              placeholder="Ex. Become Fullstack Developer From Zero to Hero in 3 Months"
              name="subTitle"
            />
          </div>
          <div>
            <Label className="tracking-wide">Description:</Label>
            <RichTextEditor input={input} setInput={setInput} />
          </div>
          <div className="flex items-center gap-5">
            <div>
              <Label className="tracking-wide">Category:</Label>
              <Select onValueChange={selectCategory}>
                <SelectTrigger className="w-[190px]">
                  <SelectValue placeholder="Select your category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup className="pb-3 ">
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
            <div>
              <Label className="tracking-wide">Course Level:</Label>
              <Select onValueChange={selectCourseLevel}>
                <SelectTrigger className="w-[190px]">
                  <SelectValue placeholder="Select your course level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup className="pb-3">
                    <SelectLabel>Course Level:</SelectLabel>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="tracking-wide">Price:</Label>
              <Input
                type="number"
                placeholder="100$"
                value={input.coursePrice}
                onChange={changeEventHandler}
                name="coursePrice"
                className="tracking-wide w-fit"
              />
            </div>
          </div>
          <div>
            <Label className="tracking-wide">Course Thumbnail:</Label>
            <div>
              <Input
                type="file"
                accept="image/*"
                onChange={selectThumbnail}
                className="w-fit"
              />
              {previewThumbnail && (
                <img
                  className="w-[150px] h-[150px] object-cover rounded-sm  my-2"
                  src={previewThumbnail}
                  alt="Course Thumbnail"
                />
              )}
            </div>
          </div>
          <div>
            <Button
              variant="outline"
              className="mr-2 "
              onClick={() => navigate("/admin/course")}
            >
              Cancel
            </Button>
            <Button disabled={isLoading} onClick={updateCourseHandler}>
              {isLoading ? (
                <>
                  <Loader2 className="w-3 h-3 mr-2 animate-spin" />
                  Please Wait
                </>
              ) : (
                "Save"
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseTab;
