import React from "react";

const jobs = [
  { title: "Technical Support Specialist", type: "PART-TIME" },
  { title: "Senior UX Designer", type: "FULL-TIME" },
  { title: "Marketing Officer", type: "INTERNSHIP" },
  { title: "Junior Graphic Designer", type: "INTERNSHIP" },
  { title: "Interaction Designer", type: "PART-TIME" },
  { title: "Project Manager", type: "FULL-TIME" },
  { title: "Software Engineer", type: "FULL-TIME" },
  { title: "Visual Designer", type: "FULL-TIME" },
  { title: "Front End Developer", type: "PART-TIME" },
  { title: "Senior UX Designer", type: "FULL-TIME" },
  { title: "Marketing Manager", type: "INTERNSHIP" },
];

const Jobs = () => {
  return (
    <div className="p-6 w-full">
      {/* Header Section */}
      <div className="flex justify-between items-center ml-[300px]">
        <h2 className="text-4xl font-semibold text-black">Jobs</h2>
        <button className="text-blue-600 hover:underline">View All →</button>
      </div>

      {/* Job Cards Grid */}
      <div className="grid grid-cols-3 gap-6 mt-6 ml-[400px]" >
        {jobs.map((job, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg p-4 border w-80 relative"
          >
            {/* Job Type Badge */}
            <span
              className={`absolute top-4 left-4 text-xs font-bold py-1 px-2 rounded ${
                job.type === "FULL-TIME"
                  ? "bg-green-100 text-green-700"
                  : job.type === "PART-TIME"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-blue-100 text-blue-700"
              }`}
            >
              {job.type}
            </span>

            {/* Job Title */}
            <h3 className="mt-8 font-semibold">{job.title}</h3>
            <p className="text-gray-500 text-sm">Salary: $20,000 - $25,000</p>

            {/* Company Info */}
            <div className="flex items-center mt-2">
              <img src="Google Logo.jpg" alt="Google Logo" className="w-5 h-5" />
              <p className="text-gray-600 text-sm ml-2">Google Inc.</p>
            </div>

            {/* Location */}
            <p className="text-gray-400 text-xs mt-1">📍 Dhaka, Bangladesh</p>

            {/* Bookmark Icon */}
            <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
              📌
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Jobs;
