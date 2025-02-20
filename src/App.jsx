// import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
// import { useState, useEffect } from "react";
// import { onAuthStateChanged, signOut } from "firebase/auth";
// import { doc, getDoc } from "firebase/firestore";
// import { auth, db } from "./firebase"; // Firebase imports
// import Sidebar from "./components/Sidebar";
// import Home from "./pages/Home";
// import Jobs from "./pages/Jobs";
// import Dashboard from "./pages/Dashboard";
// import Hackathon from "./pages/Hackathon";
// import HackathonDetails from "./pages/HackathonDetails";
// import SignIn from "./pages/SignIn";
// import SignUp from "./pages/SignUp";
// import Profile from "./pages/Profile";

// const App = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [user, setUser] = useState(null);

//   // 🔥 Track Firebase Authentication State
//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
//       if (currentUser) {
//         setIsAuthenticated(true);

//         // Fetch user details from Firestore
//         const userDoc = await getDoc(doc(db, "users", currentUser.uid));
//         if (userDoc.exists()) {
//           setUser(userDoc.data());
//         } else {
//           setUser({ name: currentUser.displayName, email: currentUser.email });
//         }
//       } else {
//         setIsAuthenticated(false);
//         setUser(null);
//       }
//     });

//     return () => unsubscribe();
//   }, []);

//   // 🔥 Logout Function
//   const logout = async () => {
//     await signOut(auth);
//     setIsAuthenticated(false);
//     setUser(null);
//     navigate("/signin");
//   };

//   // Hide Sidebar on Sign In & Sign Up Pages
//   const hideSidebarRoutes = ["/signin", "/signup"];

//   return (
//     <div className="flex">
//       {!hideSidebarRoutes.includes(location.pathname) && <Sidebar />}
//       <div className="flex-1">
//         <Routes>
//           <Route path="/signin" element={<SignIn />} />
//           <Route path="/signup" element={<SignUp />} />
//           <Route path="/" element={<Home isAuthenticated={isAuthenticated} />} />
//           <Route path="/dashboard" element={<Dashboard user={user} logout={logout} />} />
//           <Route path="/jobs" element={<Jobs />} />
//           <Route path="/hackathon" element={<Hackathon />} />
//           <Route path="/profile" element={<Profile user={user} setUser={setUser} />} />
//           <Route path="/hackathon/:id" element={<HackathonDetails />} />
//           <Route path="*" element={<h1 className="text-3xl p-4">404 - Not Found</h1>} />
//         </Routes>
//       </div>
//     </div>
//   );
// };

// export default App;

import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, db } from "./firebase"; 
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Jobs from "./pages/Jobs";
import Dashboard from "./pages/Dashboard";
import Hackathon from "./pages/Hackathon";
import HackathonDetails from "./pages/HackathonDetails";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  // Track Firebase Authentication State
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setIsAuthenticated(true);
        setUser({ name: currentUser.displayName || "User", email: currentUser.email });
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  // Logout Function
  const logout = async () => {
    await signOut(auth);
    setIsAuthenticated(false);
    setUser(null);
    navigate("/signin");
  };

  const hideSidebarRoutes = ["/signin", "/signup"];

  return (
    <div className="flex">
      {!hideSidebarRoutes.includes(location.pathname) && <Sidebar />}
      <div className="flex-1">
        <Routes>
          <Route path="/signin" element={<SignIn setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<Home isAuthenticated={isAuthenticated} />} />
          <Route path="/dashboard" element={<Dashboard user={user} logout={logout} />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/hackathon" element={<Hackathon />} />
          <Route path="/profile" element={<Profile user={user} setUser={setUser} />} />
          <Route path="/hackathon/:id" element={<HackathonDetails />} />
          <Route path="*" element={<h1 className="text-3xl p-4">404 - Not Found</h1>} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
