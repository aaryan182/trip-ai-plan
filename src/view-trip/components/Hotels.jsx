import React from "react";
import HotelCardItem from "./HotelCardItem";

function Hotels({ trip }) {
  return (
    <div>
      <h2 className="font-bold text-xl my-7 text-center">
        Hotel Recommendation
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {trip?.tripData?.hotelOptions?.length > 0 ? (
          trip.tripData.hotelOptions.map((item, index) => (
            <HotelCardItem item={item} key={index} />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No hotel options available.
          </p>
        )}
      </div>
    </div>
  );
}

export default Hotels;
