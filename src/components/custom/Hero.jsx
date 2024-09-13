import React from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <div className="flex flex-col items-center mx-4 lg:mx-56 gap-9">
      <h1 className="font-extrabold text-3xl lg:text-[50px] mt-16 text-center animate-fadeIn">
        <span className="bg-gradient-to-r from-purple-500 to-purple-700 bg-clip-text text-transparent mx-2 animate-slideIn">
          Unlock Your Dream Getaway with AI
        </span>
        : Tailor-Made Adventures Await
      </h1>
      <p className="text-lg lg:text-xl text-gray-800 text-center max-w-3xl animate-fadeIn animation-delay-200">
        Let AI craft the perfect trip just for you! Discover personalized destinations based on your style, location, and budget.
      </p>
      <Link to="/create-trip">
        <Button className="bg-purple-600 text-white px-6 py-3 rounded-full hover:bg-purple-700 transition-transform transform hover:scale-105 animate-fadeIn animation-delay-400">
          Start Planning Today – It’s Free!
        </Button>
      </Link>
    </div>
  );  
}
  

export default Hero;
