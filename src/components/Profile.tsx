import React from "react";
import { Button } from "./ui/button";
import { signOut } from "@/utils/auth";

function Compliance() {
  const handleSignOut = () => {
    signOut();
  };
  return (
    <div>
      <Button onClick={handleSignOut}>SIGN OUT</Button>
    </div>
  );
}

export default Compliance;
