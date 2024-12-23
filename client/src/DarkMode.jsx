import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import React from "react";
import { Button } from "./components/ui/button";
import { Moon, Sun } from "lucide-react";

const DarkMode = () => {
  const [theme, setTheme] = React.useState("light");
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="px-2 py-2 mt-5 bg-white rounded-md shadow-md w-36"
        >
          <DropdownMenuItem
            className="px-2 py-1 my-1 rounded-sm hover:bg-slate-200"
            onClick={() => setTheme("light")}
          >
            Light
          </DropdownMenuItem>
          <DropdownMenuSeparator className="h-[1px] bg-black my-2" />
          <DropdownMenuItem
            className="px-2 py-1 rounded-sm hover:bg-slate-200"
            onClick={() => setTheme("dark")}
          >
            Dark
          </DropdownMenuItem>
          <DropdownMenuSeparator className="h-[.5px] bg-black my-2" />
          <DropdownMenuItem
            className="px-2 py-1 my-1 rounded-sm hover:bg-slate-200"
            onClick={() => setTheme("system")}
          >
            System
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default DarkMode;
