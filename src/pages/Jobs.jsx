import React, { useEffect, useState } from "react";
import { db, auth } from "../firebase";
import { collection, addDoc, getDoc, doc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState({ name: "N/A", phone: "N/A" });

  // Fetch user details from Firestore
  const fetchUserDetails = async (uid) => {
    try {
      const userRef = doc(db, "users", uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        setUserData({
          name: userSnap.data().name || "N/A",
          phone: userSnap.data().phone || "N/A",
        });
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  // Check user authentication state
  useEffect(() => {
    onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser({
          uid: currentUser.uid,
          email: currentUser.email,
          displayName: currentUser.displayName || "N/A",
          phoneNumber: currentUser.phoneNumber || "N/A",
          photoURL: currentUser.photoURL || "N/A",
          providerId: currentUser.providerData[0]?.providerId || "N/A",
        });

        // Fetch additional user details from Firestore
        await fetchUserDetails(currentUser.uid);
      } else {
        setUser(null);
      }
    });
  }, []);

  // Handle Bookmark
  const handleBookmark = async (job) => {
    if (!user) {
      toast.error("Please log in to save bookmarks!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }

    try {
      await addDoc(collection(db, "bookmarks"), {
        jobTitle: job.title,
        jobType: job.type,
        userId: user.uid,
        email: user.email,
        name: userData.name, // Automatically storing the name
        phone: userData.phone, // Automatically storing the phone number
        displayName: user.displayName,
        photoURL: user.photoURL,
        providerId: user.providerId,
        timestamp: new Date(),
      });

      toast.success("Job bookmarked successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } catch (error) {
      console.error("Error saving bookmark:", error);
      toast.error("Failed to save bookmark.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  return (
    <div className="p-6 w-full">
      <ToastContainer />
      <div className="flex justify-between items-center max-w-5xl mx-auto">
        <h2 className="text-4xl font-semibold text-black">Jobs</h2>
        <button className="text-blue-600 hover:underline">View All →</button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 max-w-5xl mx-auto">
        {jobs.map((job, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg p-4 border w-full relative"
          >
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

            <h3 className="mt-8 font-semibold">{job.title}</h3>
            <p className="text-gray-500 text-sm">Salary: $20,000 - $25,000</p>

            <div className="flex items-center mt-2">
              <img src="Google Logo.jpg" alt="Google Logo" className="w-5 h-5" />
              <p className="text-gray-600 text-sm ml-2">Google Inc.</p>
            </div>

            <p className="text-gray-400 text-xs mt-1">📍 Dhaka, Bangladesh</p>

            {/* Bookmark Button */}
            <button
              onClick={() => handleBookmark(job)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              📌
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Jobs;
