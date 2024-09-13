import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";

function Header() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    console.log(user);
  }, []);

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error),
  });

  const GetUserProfile = (tokenInfo) => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?acess_token=${tokenInfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: "Application/json",
          },
        }
      )
      .then((resp) => {
        console.log(resp);
        localStorage.setItem("user", JSON.stringify(resp.data));
        setOpenDialog(false);
        window.location.reload();
      });
  };

  return (
    <div className="p-3 shadow-sm flex justify-between items-center px-4 bg-gradient-to-r from-purple-500 to-purple-700">
      <img src="/image.png" className="w-12 h-12" alt="Logo" />
      <div>
        {user ? (
          <div className="flex items-center gap-4">
            <a href="/create-trip">
              <Button
                variant="outline"
                className="rounded-full hover:bg-purple-600 hover:text-white transition ease-in-out duration-300"
              >
                Create Trip
              </Button>
            </a>
            <a href="/my-trips">
              <Button
                variant="outline"
                className="rounded-full hover:bg-purple-600 hover:text-white transition ease-in-out duration-300"
              >
                My Trips
              </Button>
            </a>
            <Popover>
              <PopoverTrigger>
                <img
                  src={user?.picture}
                  className="rounded-full w-[38px] h-[38px] hover:scale-110 transition transform ease-in-out duration-300"
                  alt="User"
                />
              </PopoverTrigger>
              <PopoverContent className="bg-white shadow-lg rounded-lg p-4 text-purple-700">
                <h2
                  className="cursor-pointer hover:text-purple-500 transition-colors duration-300"
                  onClick={() => {
                    googleLogout();
                    localStorage.clear();
                    window.location.reload();
                  }}
                >
                  Logout
                </h2>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <Button
            onClick={() => setOpenDialog(true)}
            className="bg-white text-purple-600 hover:bg-purple-600 hover:text-white transition-colors duration-300"
          >
            Sign In
          </Button>
        )}
      </div>
  
      <Dialog open={openDialog}>
        <DialogContent className="bg-white rounded-lg shadow-lg p-6">
          <DialogHeader>
            <DialogDescription>
              <img src="/logo.svg" alt="Logo" className="w-20 h-20 mx-auto" />
              <h2 className="font-bold text-lg mt-6 text-center text-purple-700">
                Sign In with Google
              </h2>
              <p className="text-center text-purple-500">
                Sign In to the App with Google authentication securely
              </p>
              <Button
                onClick={login}
                className="w-full mt-5 flex gap-4 items-center justify-center bg-purple-600 text-white hover:bg-purple-700 transition ease-in-out duration-300"
              >
                <FcGoogle className="h-7 w-7" />
                Sign In With Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
  
}

export default Header;
