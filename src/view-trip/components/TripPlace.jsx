import React from "react";
import PlaceCardItem from "./PlaceCardItem";

function TripPlace({ trip }) {
  return (
    <div className="my-4">
      <h2 className="font-bold text-xl mb-4">Places to Visit</h2>
      <div>
        {Array.isArray(trip?.tripData?.itinerary) &&
        trip.tripData.itinerary.length > 0 ? (
          trip.tripData.itinerary.map((item, i) => (
            <div key={i} className="mb-6">
              <h2 className="font-medium text-lg mb-2">Day {item?.day}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {item.plan?.map((place, index) => (
                  <PlaceCardItem key={place.id || index} place={place} />
                ))}
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No itinerary available.</p>
        )}
      </div>
    </div>
  );
}

export default TripPlace;
