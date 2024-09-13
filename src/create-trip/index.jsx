import React, { useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import {
  Input,
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui";
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

  return (
    <div className="container">
      <h2 className="font-bold text-3xl">
        Tell us your travel preferences 🌍✈️🌴
      </h2>
      <p className="mt-3 text-gray-600 text-xl">
        Provide basic info to generate a customized itinerary.
      </p>

      <div className="mt-20">
        <label className="text-xl font-medium">
          What is destination of choice?
        </label>
        <GooglePlacesAutocomplete
          apiKey={import.meta.env.VITE_GOOGLE_PLACES_API_KEY}
          selectProps={{
            place,
            onChange: (v) => updateFormData("location", v.label),
          }}
        />
        <Input
          label="How many days?"
          type="number"
          min="1"
          onChange={(v) => updateFormData("totalDays", v.target.value)}
        />

        <div className="grid grid-cols-3 gap-5">
          {SelectBudgetOptions.map((item, index) => (
            <div
              key={index}
              onClick={() => updateFormData("budget", item.title)}
              className={`cursor-pointer p-4 border rounded-lg hover:shadow-lg ${
                formData?.budget === item.title
                  ? "shadow-lg border-cyan-500"
                  : ""
              }`}
            >
              <h2>{item.icon}</h2>
              <h2>{item.title}</h2>
              <h2 className="text-gray-500">{item.desc}</h2>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-5">
          {SelectTravelList.map((item, index) => (
            <div
              key={index}
              onClick={() => updateFormData("traveler", item.people)}
              className={`cursor-pointer p-4 border rounded-lg hover:shadow-lg ${
                formData?.traveler === item.people
                  ? "shadow-lg border-cyan-500"
                  : ""
              }`}
            >
              <h2>{item.icon}</h2>
              <h2>{item.title}</h2>
              <h2 className="text-gray-500">{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>

      <Button onClick={OnGenerateTrip} disabled={loading}>
        {loading ? (
          <AiOutlineLoading3Quarters className="animate-spin" />
        ) : (
          "Generate Trip"
        )}
      </Button>

      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img src="/image.png" alt="logo" />
              <h2>Sign In with Google</h2>
              <Button onClick={login}>
                <FcGoogle /> Sign In With Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateTrip;
