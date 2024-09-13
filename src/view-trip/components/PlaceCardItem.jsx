import { Button } from "@/components/ui/button";
import { GetPlaceDetails, PHOTO_REF_URL } from "@/service/GlobalApi";
import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { FaLocationDot } from "react-icons/fa6";
import { Link } from "react-router-dom";

function PlaceCardItem({ place }) {
  const [photoUrl, setPhotoUrl] = useState();

  useEffect(() => {
    place && GetPlaceImg();
  }, [place]);

  const GetPlaceImg = async () => {
    const data = {
      textQuery: place.placeName,
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
      <Link
        to={
          "https://www.google.com/maps/search/?api=1&query=" +
          encodeURIComponent(place?.placeName + "," + place?.geoCoordinates)
        }
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="my-4 bg-gray-50 p-4 border rounded-lg flex flex-row gap-4 hover:scale-105 transition-transform hover:shadow-md cursor-pointer">
          <div className="w-[140px] h-[140px]">
            <img
              src={photoUrl ? photoUrl : "/road-trip-vacation.png"}
              alt={place?.placeName || "Place Photo"}
              className="w-full h-full rounded-xl object-cover"
            />
          </div>
          <div className="flex-1">
            <h2 className="font-medium text-sm text-orange-600">
              {place.time}
            </h2>
            <h2 className="font-bold text-lg">{place.placeName}</h2>
            <p className="text-sm text-gray-500">{place.placeDetails}</p>
            <h2 className="text-blue-700 text-sm">{place.ticketPricing}</h2>
            <h2 className="text-sm text-yellow-500">⭐{place.rating}</h2>
          </div>
          <div className="flex items-start">
            <Button>
              <FaLocationDot />
            </Button>
          </div>
        </div>
      </Link>
    </div>
  );
}

PlaceCardItem.propTypes = {
  place: PropTypes.shape({
    placeName: PropTypes.string,
    geoCoordinates: PropTypes.string,
    placeDetails: PropTypes.string,
    time: PropTypes.string,
    ticketPricing: PropTypes.string,
    rating: PropTypes.number,
  }),
};

export default PlaceCardItem;
