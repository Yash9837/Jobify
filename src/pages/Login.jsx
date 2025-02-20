import React from "react";

const Login = () => {
  return (
    <div className="flex h-screen">
      {/* Left Section */}
      <div className="w-1/2 flex flex-col justify-center items-center bg-white p-10">
        <h1 className="text-2xl font-bold mb-6">Jobify</h1>
        <h2 className="text-xl font-semibold mb-2">Sign in</h2>
        <p className="text-gray-500 mb-6">
          Don't have an account? <span className="text-blue-600 cursor-pointer">Create Account</span>
        </p>
        <input
          type="email"
          placeholder="Email address"
          className="border p-3 rounded-md w-80 mb-4 outline-none"
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-3 rounded-md w-80 mb-4 outline-none"
        />
        <div className="flex justify-between w-80 mb-4">
          <label className="flex items-center text-gray-600">
            <input type="checkbox" className="mr-2" /> Remember Me
          </label>
          <span className="text-blue-600 cursor-pointer">Forget password</span>
        </div>
        <button className="bg-blue-600 text-white w-80 p-3 rounded-md font-semibold">Sign In →</button>
        <p className="my-4 text-gray-500">or</p>
        <div className="flex gap-4">
          <button className="border p-3 rounded-md flex items-center gap-2 w-40 justify-center">
            <span>📘</span> Sign in with Facebook
          </button>
          <button className="border p-3 rounded-md flex items-center gap-2 w-40 justify-center">
            <span>🔴</span> Sign in with Google
          </button>
        </div>
      </div>
      
      {/* Right Section */}
      <div className="w-1/2 bg-cover bg-center relative" style={{ backgroundImage: "url('/mnt/data/image.png')" }}>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white px-10">
          <h2 className="text-2xl font-bold text-center mb-4">
            Over 1,75,324 candidates waiting for good employees.
          </h2>
          <div className="flex justify-center gap-8 mt-6">
            <div className="text-center">
              <p className="text-xl font-bold">1,75,324</p>
              <p className="text-sm">Live Jobs</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-bold">97,354</p>
              <p className="text-sm">Companies</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-bold">7,532</p>
              <p className="text-sm">New Jobs</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;