import { GetPlaceDetails, PHOTO_REF_URL } from "@/service/GlobalApi";
import React, { useEffect, useState } from "react";

function InfoSection({ trip }) {
  const [photoUrl, setPhotoUrl] = useState();
  useEffect(() => {
    trip && GetPlaceImg();
  }, [trip]);

  const GetPlaceImg = async () => {
    const data = {
      textQuery: trip?.userSelection?.location,
    };
    const result = await GetPlaceDetails(data).then((resp) => {
      const PhotoUrl = PHOTO_REF_URL.replace(
        "{NAME}",
        resp.data.places[0].photos[3].name
      );
      setPhotoUrl(PhotoUrl);
    });
  };
  return (
    <div>
      <img
        src={photoUrl ? photoUrl : "/road-trip-vacation.png"}
        alt={trip?.userSelection?.location || "Trip Photo"}
        className="h-[330px] w-full object-cover rounded-xl"
      />
      <div className="p-6">
        <h2 className="font-bold text-2xl mb-4">
          {trip?.userSelection?.location}
        </h2>
        <div className="flex flex-wrap gap-4">
          <h2 className="bg-gray-200 font-medium text-gray-600 rounded-full p-2 px-4 text-sm md:text-md">
            🗓️ {trip?.userSelection?.totalDays} Day
          </h2>
          <h2 className="bg-gray-200 font-medium text-gray-600 rounded-full p-2 px-4 text-sm md:text-md">
            👩‍👧‍👦 {trip?.userSelection?.traveler} Travelers
          </h2>
          <h2 className="bg-gray-200 font-medium text-gray-600 rounded-full p-2 px-4 text-sm md:text-md">
            💵 {trip?.userSelection?.budget} Budget
          </h2>
        </div>
      </div>
    </div>
  );
}

export default InfoSection;
