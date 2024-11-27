import React from "react";
import { Button } from "../ui/button";
import { Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(74,222,128,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(74,222,128,0.05)_1px,transparent_1px)] bg-[size:72px_72px] [transform-style:preserve-3d] animate-[grid_20s_linear_infinite] opacity-30" />

      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500/20 rounded-full blur-3xl animate-[float_8s_ease-in-out_infinite]" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl animate-[float_10s_ease-in-out_infinite_reverse]" />

      <div
        className="relative z-10 container mx-auto px-4 py-20 flex flex-col items-center justify-center min-h-screen gap-12
        [perspective:1000px]"
      >
        <div
          className="flex flex-col items-center gap-9 
          animate-[fadeIn_1s_ease-out] group
          hover:[transform:rotateX(2deg)_rotateY(2deg)] transition-transform duration-500
          [transform-style:preserve-3d]"
        >
          <h1
            className="font-extrabold text-4xl lg:text-6xl text-center leading-tight
            [transform:translateZ(50px)] group-hover:[transform:translateZ(75px)] transition-transform duration-500"
          >
            <span
              className="inline-block bg-gradient-to-r from-green-400 via-green-300 to-emerald-500 bg-clip-text text-transparent
              animate-[pulse_3s_ease-in-out_infinite]
              shadow-[0_0_25px_rgba(74,222,128,0.3)]
              hover:shadow-[0_0_50px_rgba(74,222,128,0.5)]"
            >
              Unlock Your Dream Getaway with AI
            </span>
            <span
              className="block mt-4 text-gray-100 text-3xl lg:text-5xl
              [text-shadow:0_0_10px_rgba(74,222,128,0.3)]"
            >
              Tailor-Made Adventures Await
            </span>
          </h1>
          <p
            className="text-lg lg:text-xl text-gray-300 text-center max-w-3xl
            [transform:translateZ(30px)] group-hover:[transform:translateZ(55px)] transition-transform duration-500
            hover:-translate-y-1"
          >
            Let AI craft the perfect trip just for you! Discover personalized
            destinations based on your style, location, and budget.
          </p>
          <Link
            to="/create-trip"
            className="group/button [transform:translateZ(75px)] group-hover:[transform:translateZ(100px)] transition-transform duration-500"
          >
            <Button
              className="relative overflow-hidden bg-gradient-to-r from-green-500 to-emerald-600
              px-8 py-6 text-lg rounded-full text-white font-semibold
              transform hover:scale-105 transition-all duration-300
              shadow-[0_0_15px_rgba(74,222,128,0.3)] hover:shadow-[0_0_30px_rgba(74,222,128,0.5)]
              before:absolute before:inset-0 before:bg-gradient-to-r before:from-green-400/50 before:to-emerald-500/50
              before:opacity-0 before:transition-opacity before:duration-300 group-hover/button:before:opacity-100
              after:absolute after:inset-[-2px] after:rounded-full after:bg-gradient-to-r after:from-green-400 
              after:to-emerald-500 after:blur-xl after:opacity-0 after:transition-opacity after:duration-300 
              group-hover/button:after:opacity-30 flex items-center gap-3"
            >
              <span className="relative z-10">
                Start Planning Today – It's Free!
              </span>
              <Sparkles className="w-5 h-5 animate-[pulse_2s_ease-in-out_infinite] relative z-10" />
            </Button>
          </Link>
          <div
            className="relative mt-12 [transform:translateZ(40px)] group-hover:[transform:translateZ(65px)] 
            transition-transform duration-500"
          >
            <div
              className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-600 
              rounded-3xl blur-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-500"
            />
            <img
              src="/landing.png"
              alt="Travel Planning Illustration"
              className="relative rounded-3xl shadow-2xl max-w-[600px] w-full
                animate-[float_6s_ease-in-out_infinite]
                hover:shadow-[0_0_30px_rgba(74,222,128,0.3)] transition-shadow duration-300"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
