// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";

// const SignUp = () => {
//   const [accountType, setAccountType] = useState("Employer");
//   const [showPassword, setShowPassword] = useState(false);
//   const navigate = useNavigate();

//   return (
//     <div className="flex h-screen">
//       {/* Left Side */}
//       <div className="w-1/2 flex flex-col justify-center px-16">
//         <h1 className="text-3xl font-bold mb-2">Create account.</h1>
//         <p className="text-gray-500">
//           Already have an account? <Link to="/signin" className="text-blue-600">Log In</Link>
//         </p>

//         {/* Account Type Selection */}
//         <div className="flex mt-4 bg-gray-100 p-2 rounded-md">
//           <button
//             className={`flex-1 p-2 rounded ${accountType === "Candidate" ? "bg-white shadow" : ""}`}
//             onClick={() => setAccountType("Candidate")}
//           >
//             Candidate
//           </button>
//           <button
//             className={`flex-1 p-2 rounded ${accountType === "Employer" ? "bg-white shadow" : ""}`}
//             onClick={() => setAccountType("Employer")}
//           >
//             Employer
//           </button>
//         </div>

//         {/* Form */}
//         <div className="mt-4 space-y-3">
//           <input type="text" placeholder="Full Name" className="border p-3 w-full rounded" />
//           <input type="email" placeholder="Email address" className="border p-3 w-full rounded" />
//           <div className="relative">
//             <input
//               type={showPassword ? "text" : "password"}
//               placeholder="Password"
//               className="border p-3 w-full rounded"
//             />
//             <button
//               className="absolute right-3 top-3 text-gray-600"
//               onClick={() => setShowPassword(!showPassword)}
//             >
//               👁
//             </button>
//           </div>
//           <input type="password" placeholder="Confirm Password" className="border p-3 w-full rounded" />

//           <label className="flex items-center space-x-2">
//             <input type="checkbox" />
//             <span>
//               I've read and agree with your{" "}
//               <a href="#" className="text-blue-600">Terms of Services</a>
//             </span>
//           </label>

//           <button
//             className="bg-blue-600 text-white w-full p-3 rounded mt-4"
//             onClick={() => navigate("/dashboard")}
//           >
//             Create Account →
//           </button>
//         </div>
//       </div>

//       {/* Right Side */}
//       <div className="w-1/2 bg-blue-900 text-white flex flex-col justify-center items-center p-8">
//         <h2 className="text-3xl font-bold">Over 1,75,324 candidates waiting for good employees.</h2>
//       </div>
//     </div>
//   );
// };

// export default SignUp;
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";

const SignUp = () => {
  const [formData, setFormData] = useState({ name: "", phonenumber: "", email: "", password: "" });
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const navigate = useNavigate();

  // Handle Input Changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Sign Up User
  const handleSignUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;

      // Save User in Firestore
      await setDoc(doc(db, "users", user.uid), {
        name: formData.name,
        phone: formData.phonenumber,
        email: formData.email,
      });

      // Show Success Message
      setSuccessMessage("🎉 Account Created Successfully! Redirecting to Sign In...");
      
      // Redirect to Sign In after 3 seconds
      setTimeout(() => {
        navigate("/signin");
      }, 3000);
      
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Left Side - Sign Up Form */}
      <div className="w-1/2 flex flex-col justify-center px-16 bg-white shadow-lg rounded-l-lg">
        <h1 className="text-4xl font-bold mb-2 text-gray-800">Create Account</h1>
        <p className="text-gray-500">
          Already have an account? <Link to="/signin" className="text-blue-600">Log In</Link>
        </p>

        {/* Form */}
        <div className="mt-6 space-y-4">
          <input type="text" name="name" placeholder="Full Name" className="border p-3 w-full rounded-md shadow-sm focus:ring-2 focus:ring-blue-400" onChange={handleChange} />
          <input type="text" name="phonenumber" placeholder="Phone Number" className="border p-3 w-full rounded-md shadow-sm focus:ring-2 focus:ring-blue-400" onChange={handleChange} />
          <input type="email" name="email" placeholder="Email Address" className="border p-3 w-full rounded-md shadow-sm focus:ring-2 focus:ring-blue-400" onChange={handleChange} />
          <input type="password" name="password" placeholder="Password" className="border p-3 w-full rounded-md shadow-sm focus:ring-2 focus:ring-blue-400" onChange={handleChange} />

          {error && <p className="text-red-500 text-center">{error}</p>}

          <button className="bg-blue-600 text-white w-full p-3 rounded-md mt-4 hover:bg-blue-700 transition-all duration-300" onClick={handleSignUp}>
            Create Account →
          </button>
        </div>
      </div>

      {/* Right Side - Image and Highlights */}
      <div className="w-1/2 flex items-center justify-center bg-blue-900 text-white rounded-r-lg">
        <div className="text-center">
          <h2 className="text-4xl font-bold">Join the Community</h2>
          <p className="text-lg mt-3">Over <span className="font-semibold">1,75,324</span> job seekers already signed up!</p>
        </div>
      </div>

      {/* Success Message Popup */}
      {successMessage && (
        <div className="fixed top-10 right-10 bg-green-600 text-white px-6 py-3 rounded-lg shadow-md">
          {successMessage}
        </div>
      )}
    </div>
  );
};

export default SignUp;
