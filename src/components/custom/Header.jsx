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
    <div
      className="relative p-3 px-4 bg-gray-900/95 border-b border-green-500/20
      [@supports(backdrop-filter:blur(0px))]:bg-gray-900/75 [@supports(backdrop-filter:blur(0px))]:backdrop-blur-lg
      shadow-[0_0_15px_rgba(74,222,128,0.1)]"
    >
      {/* Animated border gradient */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-green-500/50 to-transparent
        animate-[pulse_2s_ease-in-out_infinite]"
      />

      <div className="flex justify-between items-center">
        <a href="/" className="inline-block group">
          <img
            src="/image.png"
            className="w-12 h-12 transform transition-all duration-300 
              group-hover:scale-110 group-hover:brightness-110
              shadow-[0_0_10px_rgba(74,222,128,0.3)] group-hover:shadow-[0_0_20px_rgba(74,222,128,0.5)]"
            alt="Logo"
          />
        </a>

        <div>
          {user ? (
            <div className="flex items-center gap-4">
              <a href="/create-trip">
                <Button
                  variant="outline"
                  className="rounded-full border-green-500/50 text-green-400 
                    hover:bg-green-500/10 hover:text-green-300 hover:border-green-400
                    transition-all duration-300 ease-out
                    shadow-[0_0_10px_rgba(74,222,128,0.1)] hover:shadow-[0_0_15px_rgba(74,222,128,0.2)]"
                >
                  Create Trip
                </Button>
              </a>
              <a href="/my-trips">
                <Button
                  variant="outline"
                  className="rounded-full border-green-500/50 text-green-400
                    hover:bg-green-500/10 hover:text-green-300 hover:border-green-400
                    transition-all duration-300 ease-out
                    shadow-[0_0_10px_rgba(74,222,128,0.1)] hover:shadow-[0_0_15px_rgba(74,222,128,0.2)]"
                >
                  My Trips
                </Button>
              </a>
              <Popover>
                <PopoverTrigger>
                  <div className="relative group">
                    <div
                      className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 opacity-0
                      group-hover:opacity-30 blur transition duration-300"
                    />
                    <img
                      src={user?.picture}
                      className="relative rounded-full w-[38px] h-[38px] transform transition-all duration-300
                        group-hover:scale-110 group-hover:brightness-110"
                      alt="User"
                    />
                  </div>
                </PopoverTrigger>
                <PopoverContent className="bg-gray-900/95 border border-green-500/20 shadow-lg rounded-lg p-4">
                  <button
                    className="w-full text-left text-green-400 hover:text-green-300 transition-colors duration-300"
                    onClick={() => {
                      googleLogout();
                      localStorage.clear();
                      window.location.reload();
                    }}
                  >
                    Logout
                  </button>
                </PopoverContent>
              </Popover>
            </div>
          ) : (
            <Button
              onClick={() => setOpenDialog(true)}
              className="bg-green-500 text-gray-900 hover:bg-green-400
                transform hover:scale-105 transition-all duration-300
                shadow-[0_0_15px_rgba(74,222,128,0.3)] hover:shadow-[0_0_25px_rgba(74,222,128,0.5)]"
            >
              Sign In
            </Button>
          )}
        </div>

        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogContent className="bg-gray-900/95 border border-green-500/20 rounded-lg shadow-[0_0_30px_rgba(74,222,128,0.2)]">
            <DialogHeader>
              <DialogDescription>
                <div className="relative group">
                  <div
                    className="absolute -inset-1 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 opacity-20
                    group-hover:opacity-30 blur transition duration-300"
                  />
                  <img
                    src="/logo.svg"
                    alt="Logo"
                    className="relative w-20 h-20 mx-auto"
                  />
                </div>
                <h2 className="font-bold text-lg mt-6 text-center text-green-400">
                  Sign In with Google
                </h2>
                <p className="text-center text-green-500/80">
                  Sign In to the App with Google authentication securely
                </p>
                <Button
                  onClick={login}
                  className="w-full mt-5 flex gap-4 items-center justify-center
                    bg-gradient-to-r from-green-500 to-emerald-600 text-gray-900
                    hover:from-green-400 hover:to-emerald-500
                    transform hover:scale-105 transition-all duration-300
                    shadow-[0_0_15px_rgba(74,222,128,0.3)] hover:shadow-[0_0_25px_rgba(74,222,128,0.5)]"
                >
                  <FcGoogle className="h-7 w-7" />
                  Sign In With Google
                </Button>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

export default Header;
