import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const SignIn = ({ setIsAuthenticated }) => {  // ✅ Ensure it's received as a prop
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      setIsAuthenticated(true);  // ✅ Update authentication state

      // Redirect to Dashboard after login
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-1/2 flex flex-col justify-center px-16 bg-white shadow-lg rounded-l-lg">
        <h1 className="text-4xl font-bold mb-2 text-gray-800">Sign In</h1>
        <p className="text-gray-500">
          Don't have an account? <Link to="/signup" className="text-blue-600">Create Account</Link>
        </p>

        <div className="mt-6 space-y-4">
          <input type="email" name="email" placeholder="Email Address" className="border p-3 w-full rounded-md shadow-sm focus:ring-2 focus:ring-blue-400" onChange={handleChange} />
          <input type="password" name="password" placeholder="Password" className="border p-3 w-full rounded-md shadow-sm focus:ring-2 focus:ring-blue-400" onChange={handleChange} />

          {error && <p className="text-red-500 text-center">{error}</p>}

          <button className="bg-blue-600 text-white w-full p-3 rounded-md mt-4 hover:bg-blue-700 transition-all duration-300" onClick={handleSignIn}>
            Sign In →
          </button>
        </div>
      </div>

      <div className="w-1/2 flex items-center justify-center bg-blue-900 text-white rounded-r-lg">
        <div className="text-center">
          <h2 className="text-4xl font-bold">Welcome Back</h2>
          <p className="text-lg mt-3">Over <span className="font-semibold">1,75,324</span> job seekers are waiting for you!</p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
