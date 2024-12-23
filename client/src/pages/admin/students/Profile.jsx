import React from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Loader2 } from "lucide-react";
import Course from "./Course";
import {
  useLoadUserQuery,
  useUpdateUserMutation,
} from "@/features/api/authApi";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const { data, isLoading, refetch } = useLoadUserQuery();
  const user = data && data?.user;
  const [name, setName] = React.useState("");
  const [profilePhoto, setProfilePhoto] = React.useState("");
  const [
    updateUser,
    {
      data: updateUserData,
      isLoading: updateUserisLoading,
      isError,
      error,
      isSuccess,
    },
  ] = useUpdateUserMutation();
  const onChangeHandler = (e) => {
    const file = e.target.files?.[0];
    if (file) setProfilePhoto(file);
  };
  const updateUserHandler = async () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("profilePhoto", profilePhoto);
    await updateUser(formData);
  };

  React.useEffect(() => {
    refetch();
  }, []);
  React.useEffect(() => {
    if (isSuccess) {
      refetch();
      toast.success(data.message || "Profile updated successfully");
      navigate("/");
    }
    if (isError) {
      toast.error(error.message || "Failed to update profile");
    }
  }, [error, isError, updateUserData, isSuccess]);
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="w-10 h-10 mr-2 text-gray-900 dark:text-gray-100" />{" "}
        Profile Loading
      </div>
    );
  }
  return (
    <div className="max-w-4xl px-4 py-24 mx-auto">
      <h1 className="font-sans text-3xl font-bold tracking-wide text-center md:text-left">
        PROFILE
      </h1>
      <div className="flex flex-col items-center gap-4 my-5 mb-4 md:flex-row md:items-start">
        <div className="flex flex-col items-center ">
          <Avatar className="w-16 h-16 md:w-22 md:h-22">
            <AvatarImage
              className="rounded-full cursor-pointer"
              src={
                user?.photoUrl ||
                "https://img.icons8.com/?size=80&id=111409&format=png"
              }
              alt="User"
            />
            <AvatarFallback>{user.name}</AvatarFallback>
          </Avatar>
        </div>
        <div>
          <div>
            <h2 className="ml-1 font-bold text-gray-900 dark:text-gray-200">
              Name:{" "}
              <span className="ml-1 font-normal tracking-wide text-gray-700 dark:text-gray-300">
                {user.name}
              </span>
            </h2>
          </div>
          <div>
            <h2 className="ml-1 font-bold text-gray-900 dark:text-gray-200">
              E-mail:{" "}
              <span className="ml-1 font-normal tracking-wide text-gray-700 dark:text-gray-300">
                {user.email}
              </span>
            </h2>
          </div>
          <div>
            <h2 className="ml-1 font-bold text-gray-900 dark:text-gray-200">
              Role:{" "}
              <span className="ml-1 font-normal tracking-wide text-gray-700 dark:text-gray-300">
                {user.role}
              </span>
            </h2>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <button className="px-5 py-1.5 mt-5 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-900">
                Edit Profile
              </button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold tracking-normal ">
                  Edit Profile
                </DialogTitle>
                <DialogDescription>
                  Make changes to your profile here. Click save when you&apos;re
                  done.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid items-center grid-cols-4 gap-4">
                  <label>Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                    className="col-span-3 px-3 py-2 tracking-wide border-2 rounded-md border-slate-300 focus:outline-none"
                  />
                </div>
                <div className="grid items-center grid-cols-4 gap-4">
                  <label>Profile Pic</label>
                  <input
                    type="file"
                    onChange={onChangeHandler}
                    accept="image/*"
                    className="col-span-3 px-3 py-2 tracking-wide border-2 rounded-md border-slate-300 focus:outline-none"
                  />
                </div>
                <DialogFooter>
                  <Button
                    disabled={updateUserisLoading}
                    onClick={updateUserHandler}
                  >
                    {updateUserisLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" /> Please
                        wait
                      </>
                    ) : (
                      "Save Changes"
                    )}
                  </Button>
                </DialogFooter>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div>
        <h2 className="py-4 text-2xl font-bold tracking-wide text-gray-900 dark:text-gray-200">
          Courses You&apos;r enrolled in:
        </h2>
        <div className="grid grid-cols-1 gap-4 my-4 md:grid-cols-3 sm:grid-cols-2">
          {user.enrolledCourses.length === 0 ? (
            <h2 className="text-gray-900 dark:text-gray-200">
              You are not enrolled in any courses yet.
            </h2>
          ) : (
            user.enrolledCourses.map((course) => (
              <Course course={course} key={course._id} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
