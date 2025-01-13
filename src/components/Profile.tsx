import React from "react";
import { Button, buttonVariants } from "./ui/button";
import { signOut } from "@/utils/auth";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Sidebar from "./ui/side-bar";

function Compliance() {
  const handleSignOut = () => {
    signOut();
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-md ">
        <div className="absolute top-0 left-2">
          <Sidebar activeSection="Profile" />
        </div>
        {/* Logo and Title */}
        <div className="text-center space-y-2 mb-8">
          <h1 className="text-3xl font-bold text-orange-600">Koyo Admin</h1>
          <p className="text-gray-800">Healthcare Management System</p>
        </div>
        <Card className="bg-orange-100 border-orange-300">
          <CardHeader className="flex justify-between items-center w-full">
            {/* <CardTitle className="text-xl font-semibold">Profile </CardTitle> */}
            <Avatar className="w-36 h-36">
              <AvatarImage src="https://www.w3schools.com/w3images/avatar2.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">
              Name: <span className="font-normal">Joesph Blogs</span>
            </div>
            <p className="text-xl font-bold">
              Email:{" "}
              <span className="font-normal">joeblogs@companyemail.com</span>
            </p>
            <p className="text-xl font-bold">
              Acess Level: <span className="font-normal">Super Admin</span>
            </p>
            <div className="px-2 flex justify-center items-center mt-4">
              <Button
                variant={"ghost"}
                className="flex items-center justify-center text-xl font-bold text-white bg-orange-600 hover:bg-black-300"
                // className={buttonVariants({ variant: "destructive" })}
                onClick={handleSignOut}
              >
                sign out
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Compliance;
