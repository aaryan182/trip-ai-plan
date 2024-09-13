import { GetPlaceDetails, PHOTO_REF_URL } from "@/service/GlobalApi";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function HotelCardItem({ item }) {
  const [photoUrl, setPhotoUrl] = useState();

  useEffect(() => {
    item && GetPlaceImg();
  }, [item]);

  const GetPlaceImg = async () => {
    const data = {
      textQuery: item?.hotelName,
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
    <div className="p-4">
      <Link
        to={
          "https://www.google.com/maps/search/?api=1&query=" +
          encodeURIComponent(item?.hotelName + ", " + item?.hotelAddress)
        }
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="hover:scale-105 transition-transform cursor-pointer">
          <img
            src={photoUrl ? photoUrl : "/road-trip-vacation.jpg"}
            alt={item?.hotelName || "Hotel"}
            className="rounded-xl h-[180px] w-full object-cover"
          />
          <div className="my-3 py-2">
            <h2 className="font-medium text-lg">{item?.hotelName}</h2>
            <h2 className="text-xs text-gray-500">
              📍{item?.hotelAddress}
            </h2>
            <h2 className="text-sm text-gray-700">💰{item?.price}</h2>
            <h2 className="text-sm text-yellow-500">⭐{item?.rating}</h2>
          </div>
        </div>
      </Link>
    </div>
  );  
}

export default HotelCardItem;
