import { useState, useEffect } from "react";
import { auth, db } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    bio: "",
    skills: "",
    experience: "",
    profilePic: "", // Base64 String
  });

  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check Auth State & Fetch Profile
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        await fetchProfile(currentUser.uid);
      } else {
        setUser(null);
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  // Fetch Profile from Firestore
  const fetchProfile = async (uid) => {
    try {
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setFormData(docSnap.data());
      } else {
        console.log("No profile found. Creating a new one...");
        await setDoc(docRef, { ...formData, email: user.email });
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle Input Changes
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Handle Profile Picture Upload (Convert to Base64)
  const handleProfilePicChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({ ...prev, profilePic: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  // Save Profile to Firestore
  const handleSave = async () => {
    try {
      if (!user) return;
      await setDoc(doc(db, "users", user.uid), formData);
      setEditMode(false);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error saving profile:", error);
      alert("Failed to save profile. Try again.");
    }
  };

  if (loading) return <h2 className="text-center mt-10">Loading Profile...</h2>;

  if (!user) return <h2 className="text-center mt-10 text-red-600">Please log in to view your profile.</h2>;

  return (
    <div className="ml-64 p-6 bg-gray-100 min-h-screen">
      <div className="bg-white p-6 shadow-md rounded-md w-[800px] mx-auto">
        <h2 className="text-2xl font-bold text-center">Profile</h2>

        {/* Profile Picture Upload */}
        <div className="flex justify-center mt-4 relative">
          <img
            src={formData.profilePic || "default-avatar.png"}
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-blue-400 object-cover"
          />
          {editMode && (
            <input
              type="file"
              accept="image/*"
              className="absolute bottom-0 left-10 bg-white p-2 rounded-md cursor-pointer"
              onChange={handleProfilePicChange}
            />
          )}
        </div>

        {/* Profile Form */}
        <div className="mt-6 space-y-4">
          <div>
            <label className="font-semibold text-gray-700">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="border p-2 w-full rounded-md"
              disabled={!editMode}
            />
          </div>

          <div>
            <label className="font-semibold text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              className="border p-2 w-full rounded-md bg-gray-200"
              disabled
            />
          </div>

          <div>
            <label className="font-semibold text-gray-700">Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="border p-2 w-full rounded-md"
              disabled={!editMode}
            />
          </div>

          <div>
            <label className="font-semibold text-gray-700">Bio</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              className="border p-2 w-full rounded-md"
              disabled={!editMode}
            />
          </div>

          <div>
            <label className="font-semibold text-gray-700">Skills</label>
            <input
              type="text"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              className="border p-2 w-full rounded-md"
              disabled={!editMode}
            />
          </div>

          <div>
            <label className="font-semibold text-gray-700">Experience (Years)</label>
            <input
              type="number"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              className="border p-2 w-full rounded-md"
              disabled={!editMode}
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-between mt-6">
          {editMode ? (
            <button
              onClick={handleSave}
              className="bg-green-600 text-white px-4 py-2 rounded-md"
            >
              Save Changes
            </button>
          ) : (
            <button
              onClick={() => setEditMode(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-md"
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
