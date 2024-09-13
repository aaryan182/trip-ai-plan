export const SelectBudgetOptions = [
  {
    id: 1,
    title: "Cheap",
    desc: "Stay conscious of costs",
    icon: "💵",
  },
  {
    id: 2,
    title: "Moderate",
    desc: "Keep cost on the average side",
    icon: "💰",
  },
  {
    id: 3,
    title: "Luxury",
    desc: "Don't worry about cost",
    icon: "💎",
  },
  {
    id: 4,
    title: "Affordable",
    desc: "Good value for your money",
    icon: "💼",
  },
  {
    id: 5,
    title: "Comfortable",
    desc: "A comfortable option with decent pricing",
    icon: "🛏️",
  },
  {
    id: 6,
    title: "Premium",
    desc: "A premium experience with high cost",
    icon: "✨",
  }
];

export const SelectTravelList = [
  {
    id: 1,
    title: "Just Me",
    desc: "A sole traveler",
    icon: "🙋🏾‍♀️",
    people: "1",
  },
  {
    id: 2,
    title: "A couple",
    desc: "Two travelers",
    icon: "👫🏾",
    people: "2",
  },
  {
    id: 3,
    title: "Family",
    desc: "A group of fun-loving adventurers",
    icon: "🏡",
    people: "3 to 5 people",
  },
  {
    id: 4,
    title: "Friends",
    desc: "A bunch of thrill-seekers",
    icon: "👩‍👩‍👦‍👦",
    people: "5 to 12 people",
  },
  {
    id: 5,
    title: "Corporate Retreat",
    desc: "Business trip for colleagues",
    icon: "🏢",
    people: "10",
  },
  {
    id: 6,
    title: "Backpacking Group",
    desc: "A group of adventurers backpacking",
    icon: "🎒",
    people: "5",
  },
  {
    id: 7,
    title: "Luxury Escape",
    desc: "A luxurious getaway for a group",
    icon: "💎",
    people: "6",
  }
];


export const AI_PROMPT =
  "Generate Travel Plan for Location : {location} for {totalDays} Days for {traveler} with a {budget} budget, Give me a Hotels options list with HotelName,Hotel address,Price, hotel image url,geo coordinates,rating,descriptions and suggest itinerary with placeName,Place Details,Place Image Url, Geo Coordinates,ticket Pricing,rating,Time travel each of the location for 3 days with each day plan with best time to visit in JSON format";
