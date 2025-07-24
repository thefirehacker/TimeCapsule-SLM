"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Moon,
  Sun,
  Download,
  Upload,
  Clock,
  User,
  LogIn,
  LogOut,
  Settings,
  BookOpen,
  FileText,
  Package,
  ChevronDown,
} from "lucide-react";
import { useSession, signIn, signOut } from "next-auth/react";
import { useTheme } from "next-themes";

interface DeepResearchNavigationProps {
  isDarkMode?: boolean;
  onToggleTheme?: () => void;
}

export function DeepResearchNavigation({
  isDarkMode = false,
  onToggleTheme,
}: DeepResearchNavigationProps) {
  const { data: session, status } = useSession();
  const { theme, setTheme } = useTheme();
  const [isThemeDropdownOpen, setIsThemeDropdownOpen] = useState(false);

  const handleThemeToggle = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    if (onToggleTheme) {
      onToggleTheme();
    }
  };

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/" });
  };

  const getUserInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="border-b border-border bg-card">
      <div className="flex items-center justify-between px-6 py-3">
        {/* Left side - Navigation */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/60 rounded-lg"></div>
            <span className="font-semibold text-card-foreground">
              TimeCapsule
            </span>
          </div>

          <nav className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="space-x-2">
              <Clock className="w-4 h-4" />
              <span>Time-frames</span>
            </Button>
          </nav>
        </div>

        {/* Right side - Actions */}
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="space-x-2">
            <Upload className="w-4 h-4" />
            <span>Import TimeCapsule</span>
          </Button>

          <Button variant="outline" size="sm" className="space-x-2">
            <Download className="w-4 h-4" />
            <span>Export TimeCapsule</span>
          </Button>

          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleThemeToggle}
            className="w-9 h-9 p-0"
          >
            {theme === "dark" ? (
              <Sun className="w-4 h-4" />
            ) : (
              <Moon className="w-4 h-4" />
            )}
          </Button>

          {/* User Authentication */}
          {status === "loading" ? (
            <div className="w-8 h-8 bg-secondary rounded-full animate-pulse" />
          ) : session?.user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={session.user.image || ""}
                      alt={session.user.name || "User"}
                    />
                    <AvatarFallback className="bg-secondary text-secondary-foreground">
                      {session.user.name
                        ? getUserInitials(session.user.name)
                        : "U"}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-56 bg-popover border-border"
                align="end"
                forceMount
              >
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none text-popover-foreground">
                      {session.user.name}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {session.user.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-border" />
                <DropdownMenuItem className="text-popover-foreground hover:bg-accent hover:text-accent-foreground">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-popover-foreground hover:bg-accent hover:text-accent-foreground">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-popover-foreground hover:bg-accent hover:text-accent-foreground">
                  <BookOpen className="mr-2 h-4 w-4" />
                  <span>My Research</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-popover-foreground hover:bg-accent hover:text-accent-foreground">
                  <FileText className="mr-2 h-4 w-4" />
                  <span>Documents</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-popover-foreground hover:bg-accent hover:text-accent-foreground">
                  <Package className="mr-2 h-4 w-4" />
                  <span>TimeCapsules</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-border" />
                <DropdownMenuItem
                  onClick={handleSignOut}
                  className="text-popover-foreground hover:bg-accent hover:text-accent-foreground"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button size="sm" onClick={() => signIn()} className="space-x-2">
              <LogIn className="w-4 h-4" />
              <span>Login</span>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
