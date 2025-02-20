import { Link } from "react-router-dom";
import { useState } from "react";

const Hackathon = () => {
  const [search, setSearch] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [difficulty, setDifficulty] = useState("");
  const [status, setStatus] = useState("");
  const [priceRange, setPriceRange] = useState(10000);
  const [paidType, setPaidType] = useState("");

  const hackathons = [
    {
      id: "ai-ml-hackathon",
      title: "AI & Machine Learning Hackathon",
      date: "March 15, 2024",
      registrations: 120,
      difficulty: "Advanced",
      status: "Open",
      prize: 5000,
      paid: "Free",
      location: "IIT Bombay, India",
      image: "https://www.brightidea.com/wp-content/uploads/Hackathon-Benefits.png",
    },
    {
      id: "blockchain-challenge",
      title: "Blockchain Innovation Challenge",
      date: "April 20, 2024",
      registrations: 85,
      difficulty: "Intermediate",
      status: "Closed",
      prize: 3000,
      paid: "Paid",
      location: "IIT Delhi, India",
      image: "https://ideafoster.com/wp-content/uploads/2023/03/hackaton-concepto-funciona-922.jpeg",
    },
    {
      id: "cybersecurity-hackfest",
      title: "Cybersecurity Hackfest",
      date: "May 5, 2024",
      registrations: 200,
      difficulty: "Beginner",
      status: "Open",
      prize: 7000,
      paid: "Free",
      location: "NIT Kurukshetra, India",
      image: "https://cdn.prod.website-files.com/5b3dd54182ecae4d1602962f/609e33e18c5000af6211f094_HR%20Hackathon%20-%20Section%202.jpg",
    },
    {
      id: "designathon",
      title: "Designathon",
      date: "June 12, 2024",
      registrations: 150,
      difficulty: "Beginner",
      status: "Open",
      prize: 4500,
      paid: "Paid",
      location: "BITS Pilani, India",
      image: "https://www.brightidea.com/wp-content/uploads/Hackathon-Benefits.png",
    },
    {
      id: "cloud-hack",
      title: "Cloud Computing Hackathon",
      date: "July 1, 2024",
      registrations: 95,
      difficulty: "Advanced",
      status: "Closed",
      prize: 6000,
      paid: "Free",
      location: "IIIT Hyderabad, India",
      image: "https://ideafoster.com/wp-content/uploads/2023/03/hackaton-concepto-funciona-922.jpeg",
    },
    {
      id: "fintech-hack",
      title: "FinTech Innovation Challenge",
      date: "August 5, 2024",
      registrations: 180,
      difficulty: "Intermediate",
      status: "Open",
      prize: 8000,
      paid: "Paid",
      location: "IIM Bangalore, India",
      image: "https://cdn.prod.website-files.com/5b3dd54182ecae4d1602962f/609e33e18c5000af6211f094_HR%20Hackathon%20-%20Section%202.jpg",
    },
  ];

  // Filtering Hackathons
  const filteredHackathons = hackathons.filter((hackathon) => {
    return (
      (search === "" || hackathon.title.toLowerCase().includes(search.toLowerCase())) &&
      (selectedCategories.length === 0 || selectedCategories.includes(hackathon.difficulty)) &&
      (difficulty === "" || hackathon.difficulty === difficulty) &&
      (status === "" || hackathon.status === status) &&
      (paidType === "" || hackathon.paid === paidType) &&
      hackathon.prize <= priceRange
    );
  });

  return (
    <div className="ml-64 bg-gray-100 min-h-screen p-6">
      <header className="bg-gray-200 p-4 text-xl font-bold">Hackathons</header>
      <div className="grid grid-cols-12 gap-6 mt-4">
        {/* Filters Sidebar */}
        <div className="col-span-3 bg-white p-4 shadow-md rounded-lg">
          <h2 className="text-lg font-semibold mb-3">Search</h2>
          <input
            type="text"
            placeholder="Search Hackathons"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border p-2 rounded"
          />

          {/* Difficulty Level Filter */}
          <h2 className="text-lg font-semibold mt-4 mb-2">Difficulty Level</h2>
          {["Beginner", "Intermediate", "Advanced"].map((level) => (
            <button
              key={level}
              className={`px-3 py-2 rounded-md m-1 ${difficulty === level ? "bg-blue-600 text-white" : "bg-gray-200"}`}
              onClick={() => setDifficulty(difficulty === level ? "" : level)}
            >
              {level}
            </button>
          ))}

          {/* Status Filter */}
          <h2 className="text-lg font-semibold mt-4 mb-2">Status</h2>
          {["Open", "Closed"].map((stat) => (
            <button
              key={stat}
              className={`px-3 py-2 rounded-md m-1 ${status === stat ? "bg-blue-600 text-white" : "bg-gray-200"}`}
              onClick={() => setStatus(status === stat ? "" : stat)}
            >
              {stat}
            </button>
          ))}

          {/* Free or Paid Filter */}
          <h2 className="text-lg font-semibold mt-4 mb-2">Type</h2>
          {["Free", "Paid"].map((type) => (
            <button
              key={type}
              className={`px-3 py-2 rounded-md m-1 ${paidType === type ? "bg-blue-600 text-white" : "bg-gray-200"}`}
              onClick={() => setPaidType(paidType === type ? "" : type)}
            >
              {type}
            </button>
          ))}

          {/* Prize Amount Slider */}
          <h2 className="text-lg font-semibold mt-4 mb-2">Prize Amount</h2>
          <input
            type="range"
            min="1000"
            max="10000"
            step="500"
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            className="w-full"
          />
          <p className="text-gray-700">Up to ${priceRange}</p>
        </div>

        {/* Hackathon Listings */}
        <div className="col-span-9">
          {filteredHackathons.length > 0 ? (
            filteredHackathons.map((hackathon) => (
              <Link key={hackathon.id} to={`/hackathon/${hackathon.id}`}>
                <div className="bg-white p-4 shadow-md rounded-lg mb-4 flex hover:shadow-lg transition cursor-pointer">
                  <img src={hackathon.image} alt={hackathon.title} className="w-40 h-24 rounded-md object-cover" />
                  <div className="ml-4">
                    <h2 className="text-lg font-semibold">{hackathon.title}</h2>
                    <p className="text-gray-500">{hackathon.date} • {hackathon.registrations} Registrations</p>
                    <p className="text-gray-600 mt-1">
                    🎯 Difficulty: <span className="font-medium">{hackathon.difficulty}</span>
                  </p>
                  <p className="text-gray-600">
                    🏆 Prize: <span className="font-medium">{hackathon.prize}</span>
                  </p>
                    <p className="text-gray-600">📍 {hackathon.location}</p>
                    <p className="text-gray-600">
                    📌 Status:{" "}
                    <span className={`font-medium ${hackathon.status === "Open" ? "text-green-600" : "text-red-600"}`}>
                      {hackathon.status}
                    </span>
                  </p>
                    <p className="text-blue-600 mt-2">View Details →</p>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-gray-600 text-center mt-6">No hackathons found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Hackathon;