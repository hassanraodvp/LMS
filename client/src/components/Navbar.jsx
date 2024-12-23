import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Menu, School } from "lucide-react";
import DarkMode from "@/darkMode";
import { Link, useNavigate } from "react-router-dom";
import { useLogoutUserMutation } from "@/features/api/authApi";
import { toast } from "sonner";
import { useSelector } from "react-redux";

const Navbar = () => {
  // const User = true; // Replace with actual user data fetched from API
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const [logoutUser, { data, isSuccess }] = useLogoutUserMutation();
  const handleLogout = async () => {
    await logoutUser();
  };
  React.useEffect(() => {
    if (isSuccess) {
      toast.success(data.message || "Logout successful");
      navigate("/login");
    }
  }, [isSuccess]);
  return (
    <div className="h-16 dark:bg-[#1E1E1E] bg-white border-b dark:border-b-gray-800 border-b-gray-300 fixed top-0 left-0 right-0 py-2 z-50">
      {/* Desktop Navbar */}
      <div className="items-center justify-between hidden px-4 mx-auto md:flex max-w-7xl">
        {/* Left Section */}
        <div className="flex items-center gap-2">
          <School size={30} />
          <h1 className="text-2xl font-bold">Learning Management System</h1>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-6">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar>
                  <AvatarImage
                    className="cursor-pointer "
                    src={
                      user?.photoUrl ||
                      "https://cdn-icons-png.flaticon.com/128/5726/5726678.png"
                    }
                    alt="User Avatar"
                  />
                  <AvatarFallback className="border-2 border-black rounded-full">
                    CN
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 px-2 py-2 mt-4 bg-white rounded-md shadow-md">
                <DropdownMenuLabel className="px-2 font-semibold cursor-pointer">
                  My Account
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="my-2" />
                <DropdownMenuGroup>
                  <DropdownMenuItem className="px-2 py-1 cursor-pointer hover:bg-gray-100">
                    <Link to="/my-learning">My Learning</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="px-2 py-1 cursor-pointer hover:bg-gray-100">
                    <Link to="/profile">Edit Profile</Link>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator className="my-2" />
                {user?.role === "instructor" && (
                  <DropdownMenuItem
                    className="px-2 py-1 cursor-pointer hover:bg-gray-100"
                    onClick={() => navigate("/admin")}
                  >
                    Dashboard
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem
                  className="px-2 py-1 text-red-500 cursor-pointer hover:bg-red-100"
                  onClick={handleLogout}
                >
                  Log Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => navigate("/login")}>
                Login
              </Button>
              <Button onClick={() => navigate("/login")}>Signup</Button>
            </div>
          )}
          <DarkMode />
        </div>
      </div>

      {/* Mobile Navbar */}
      <div className="flex items-center justify-between h-full px-4 md:hidden">
        <Avatar>
          <AvatarImage
            className="p-1 border-2 border-black rounded-full cursor-pointer"
            src={
              user?.photoUrl ||
              "https://cdn-icons-png.flaticon.com/128/5726/5726678.png"
            }
            alt="User Avatar"
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <MobileNavbar />
      </div>
    </div>
  );
};

const MobileNavbar = () => {
  const navigate = useNavigate();
  const role = "instructor";
  const { user } = useSelector((store) => store.auth);
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          size="icon"
          className="rounded-full bg-gray-50 hover:bg-gray-200"
          variant="outline"
        >
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader className="flex flex-row items-center justify-between p-4">
          <SheetTitle className="text-2xl font-bold">LMS</SheetTitle>
          <DarkMode />
        </SheetHeader>
        {user ? (
          <nav className="flex flex-col space-y-4">
            <span className="px-3 py-2 font-semibold tracking-wider text-gray-800 rounded-md hover:bg-slate-200 bg-slate-100">
              My Account
            </span>
            <span className="px-3 py-2 font-semibold tracking-wider text-gray-800 rounded-md hover:bg-slate-200 bg-slate-100">
              Edit Profile
            </span>
            <span className="px-3 py-2 font-semibold tracking-wider text-gray-800 rounded-md hover:bg-slate-200 bg-slate-100">
              My Learning
            </span>
            <span className="px-3 py-2 font-semibold tracking-wider text-center text-white bg-red-700 rounded-md cursor-pointer hover:bg-white hover:border-2 hover:border-red-600 hover:text-black">
              Logout
            </span>
          </nav>
        ) : (
          <div className="flex gap-2 py-4">
            <Button variant="outline" onClick={() => navigate("/login")}>
              Login
            </Button>
            <Button onClick={() => navigate("/login")}>Signup</Button>
          </div>
        )}
        <SheetFooter>
          {role === "instructor" && (
            <SheetClose asChild>
              <Button
                type="submit"
                className="w-full py-3 my-3 font-semibold tracking-wider bg-black rounded-md hover:bg-white hover:text-black hover:border-2 hover:border-black"
                onClick={() => navigate("/")}
              >
                Go to Dashboard
              </Button>
            </SheetClose>
          )}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default Navbar;
