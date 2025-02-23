import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

const handleLogout = async () => {
  await signOut(auth);
  window.location.href = "/signin"; // Redirect to Sign In after logout
};

const Dashboard = ({ user }) => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="ml-64 p-6 bg-gray-100 min-h-screen">
      {/* Navbar */}
      <div className="flex justify-between items-center bg-white p-4 shadow rounded-md relative">
        <input
          type="text"
          id="jobSearch"
          name="jobSearch"
          placeholder="Job title, keyword, company"
          className="w-full p-2 border border-gray-300 rounded-md"
        />

        {/* Profile Image with Dropdown */}
        <div className="relative ml-4">
          <img
            src={userData?.profilePic || "Avatar.webp"}
            alt="Profile"
            className="rounded-full w-10 h-10 cursor-pointer hover:scale-110 transition-transform"
            onClick={() => setShowDropdown(!showDropdown)}
          />

          {/* Profile Dropdown */}
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50">
              <p className="p-3 font-semibold">{user?.name}</p>
              <hr />
              <button
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                onClick={() => navigate("/profile")}
              >
                Edit Profile
              </button>
              <button
                className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Full-Screen Avatar Modal */}
      {isFullScreen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50"
          onClick={() => setIsFullScreen(false)}
        >
          <img
            src={userData?.profilePic || "Avatar.webp"}
            alt="Profile Fullscreen"
            className="w-96 h-96 rounded-full cursor-pointer transition-transform duration-300 hover:scale-105"
          />
        </div>
      )}

      {/* Profile Section */}
      <div className="mt-6 bg-white p-6 rounded-md shadow">
        <h2 className="text-xl font-semibold">Hello, {user?.name}</h2>
        <p className="text-gray-600">Here is your daily activities and job alerts</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div className="bg-blue-100 p-4 rounded-md text-center">
            <h3 className="text-2xl font-bold">{registeredJobs.length}</h3>
            <p>Registered Jobs</p>
          </div>
          <div className="bg-yellow-100 p-4 rounded-md text-center">
            <h3 className="text-2xl font-bold">{registeredHackathons.length}</h3>
            <p>Registered Hackathons</p>
          </div>
        </div>
      </div>

      {/* Profile Warning */}
      <div className="mt-6 bg-red-100 p-4 rounded-md shadow flex flex-col md:flex-row justify-between items-center">
        <p className="text-red-700 text-center md:text-left">
          Your profile editing is not completed. Complete your profile editing & build your custom Resume.
        </p>
        <button
          className="bg-red-600 text-white px-4 py-2 rounded-md mt-4 md:mt-0"
          onClick={() => navigate("/profile")}
        >
          Edit Profile
        </button>
      </div>

      {/* Resume Upload & Job Recommendations */}
      <div className="mt-6">
        <ResumeUpload setJobs={setJobs} />
        <JobRecommendations jobs={jobs} />
      </div>

      {/* Registered Jobs Section */}
      <div className="mt-6 bg-white p-6 rounded-md shadow">
        <h3 className="text-lg font-semibold">Registered Jobs</h3>
        {registeredJobs.length === 0 ? (
          <p className="text-gray-500 mt-2">No registered jobs found.</p>
        ) : (
          <div className="mt-4 space-y-4">
            {registeredJobs.map((job) => (
              <div key={job.id} className="p-4 bg-gray-50 rounded-md shadow-sm">
                <h4 className="font-semibold">{job?.title}</h4>
                <p className="text-gray-500">{job?.company}</p>
                <p className="text-gray-700">{job?.salary}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Registered Hackathons Section */}
      <div className="mt-6 bg-white p-6 rounded-md shadow">
        <h3 className="text-lg font-semibold">Registered Hackathons</h3>
        {registeredHackathons.length === 0 ? (
          <p className="text-gray-500 mt-2">No registered hackathons found.</p>
        ) : (
          <div className="mt-4 space-y-4">
            {registeredHackathons.map((hackathon) => (
              <div key={hackathon.id} className="p-4 bg-gray-50 rounded-md shadow-sm">
                <h4 className="font-semibold">{hackathon?.name}</h4>
                <p className="text-gray-500">{hackathon?.organizer}</p>
                <p className="text-gray-700">{hackathon?.date}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
