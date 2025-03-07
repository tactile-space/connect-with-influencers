
import React, { useState } from "react";
import { Sun, Moon, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <header className="w-full h-16 fixed top-0 left-0 z-50 neo-blur bg-gradient-to-r from-background via-background to-background/90 border-b border-border/60">
      <div className="container h-full mx-auto px-4 md:px-6 flex items-center justify-between">
        <div className="flex items-center">
          <h1 className="text-xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">Pick</span>
            <span className="font-medium">Creator</span>
          </h1>
        </div>

        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            className="relative hover:bg-secondary/80 transition-all duration-300"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {isDarkMode ? (
              <Sun className="h-5 w-5 transition-all text-amber-400" />
            ) : (
              <Moon className="h-5 w-5 transition-all text-blue-500" />
            )}
            <span className="sr-only">Toggle theme</span>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative rounded-full hover:bg-secondary/80 transition-all duration-300">
                <User className="h-5 w-5" />
                <span className="sr-only">Profile</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 animate-fade-in">
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Saved Filters</DropdownMenuItem>
              <DropdownMenuItem>Help</DropdownMenuItem>
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
