import React, { useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import {
  SelectBudgetOptions,
  SelectTravelList,
  AI_PROMPT,
} from "@/constants/options";
import { toast } from "sonner";
import { chatSession } from "@/service/AIModal";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/service/firebaseConfig";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

function CreateTrip() {
  const [place, setPlace] = useState();
  const [formData, setFromData] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const updateFormData = (name, value) =>
    setFromData((prev) => ({ ...prev, [name]: value }));

  const GetUserProfile = async (tokenInfo) => {
    const resp = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
      {
        headers: { Authorization: `Bearer ${tokenInfo?.access_token}` },
      }
    );
    localStorage.setItem("user", JSON.stringify(resp.data));
    setOpenDialog(false);
    OnGenerateTrip();
  };

  const login = useGoogleLogin({
    onSuccess: GetUserProfile,
    onError: console.log,
  });

  const OnGenerateTrip = async () => {
    const user = localStorage.getItem("user");
    if (!user) return setOpenDialog(true);

    if (
      !formData?.location ||
      !formData?.budget ||
      !formData?.traveler ||
      formData?.totalDays > 5
    ) {
      return toast("Please fill all details!");
    }

    toast("Form generated.");
    setLoading(true);

    const FINAL_PROMPT = AI_PROMPT.replace("{location}", formData?.location)
      .replace("{totalDays}", formData?.totalDays)
      .replace("{traveler}", formData?.traveler)
      .replace("{budget}", formData?.budget);

    const result = await chatSession.sendMessage(FINAL_PROMPT);
    setLoading(false);
    SaveAiTrip(result?.response?.text());
  };

  const SaveAiTrip = async (TripData) => {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem("user"));
    const docId = Date.now().toString();
    await setDoc(doc(db, "AiTrips", docId), {
      userSelection: formData,
      tripData: JSON.parse(TripData),
      userEmail: user?.email,
      id: docId,
    });
    setLoading(false);
    navigate("/view-trip/" + docId);
  };

  return (
    <div className="container mx-auto p-4 lg:p-10">
      <h2 className="font-extrabold text-3xl lg:text-4xl text-center text-purple-700">
        Tell us your travel preferences 🌍✈️🌴
      </h2>
      <p className="mt-3 text-gray-600 text-xl text-center">
        Provide basic info to generate a customized itinerary.
      </p>

      <div className="mt-10 space-y-8">
        <div>
          <label className="text-xl font-medium text-gray-700">
            What is your destination of choice?
          </label>
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACES_API_KEY}
            selectProps={{
              place,
              onChange: (v) => updateFormData("location", v.label),
            }}
          />
        </div>

        <div>
          <Input
            label="How many days?"
            type="number"
            min="1"
            className="mt-3 border-gray-300 focus:ring-purple-500 focus:border-purple-500"
            onChange={(v) => updateFormData("totalDays", v.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-10">
          {SelectBudgetOptions.map((item, index) => (
            <div
              key={index}
              onClick={() => updateFormData("budget", item.title)}
              className={`cursor-pointer p-6 border rounded-lg text-center hover:shadow-lg transition-all ${
                formData?.budget === item.title
                  ? "shadow-lg border-purple-500"
                  : "border-gray-300"
              }`}
            >
              <h2>{item.icon}</h2>
              <h2 className="text-xl font-semibold">{item.title}</h2>
              <p className="text-gray-500">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-10">
          {SelectTravelList.map((item, index) => (
            <div
              key={index}
              onClick={() => updateFormData("traveler", item.people)}
              className={`cursor-pointer p-6 border rounded-lg text-center hover:shadow-lg transition-all ${
                formData?.traveler === item.people
                  ? "shadow-lg border-purple-500"
                  : "border-gray-300"
              }`}
            >
              <h2>{item.icon}</h2>
              <h2 className="text-xl font-semibold">{item.title}</h2>
              <p className="text-gray-500">{item.desc}</p>
            </div>
          ))}
        </div>

        <Button
          onClick={OnGenerateTrip}
          className="mt-10 w-full lg:w-auto bg-purple-600 text-white py-3 px-6 rounded-lg hover:bg-purple-700 transition-all"
          disabled={loading}
        >
          {loading ? (
            <AiOutlineLoading3Quarters className="animate-spin text-white" />
          ) : (
            "Generate Trip"
          )}
        </Button>

        <Dialog open={openDialog}>
          <DialogContent className="bg-white rounded-lg p-6">
            <DialogHeader>
              <DialogDescription>
                <img src="/image.png" alt="logo" className="w-20 mx-auto" />
                <h2 className="font-bold text-center text-purple-700 text-lg">
                  Sign In with Google
                </h2>
                <Button
                  onClick={login}
                  className="mt-4 flex items-center justify-center w-full bg-purple-600 text-white hover:bg-purple-700 transition-all"
                >
                  <FcGoogle className="mr-2" /> Sign In With Google
                </Button>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

export default CreateTrip;
