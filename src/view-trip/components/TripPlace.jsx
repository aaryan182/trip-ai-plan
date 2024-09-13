import React from "react";
import PlaceCardItem from "./PlaceCardItem";

function TripPlace({ trip }) {
  return (
    <div className="my-4">
      <h2 className="font-bold text-xl">Places to Visit</h2>
      <div>
        {Array.isArray(trip?.tripData?.itinerary) && trip.tripData.itinerary.length > 0 ? (
          trip.tripData.itinerary.map((item, i) => (
            <div key={i}>
              <h2 className="font-medium text-l">Day {item?.day}</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {item.plan?.map((place, index) => (
                  <PlaceCardItem key={index} place={place} />
                ))}
              </div>
            </div>
          ))
        ) : (
          <p>No itinerary available.</p>
        )}
      </div>
    </div>
  );
}

export default TripPlace;
