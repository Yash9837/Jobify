import React from "react";
import { useNavigate } from "react-router-dom";

const Home = ({ isAuthenticated }) => {
  const navigate = useNavigate();

  const jobs = [
    { title: "Professor", positions: "45,004" },
    { title: "SDE Intern", positions: "74,875" },
    { title: "Financial Manager", positions: "61,391" },
    { title: "Surgeons", positions: "50,984" },
    { title: "Software Developer", positions: "43,359" },
    { title: "Management Analysis", positions: "93,046" },
    { title: "Obstetricians-Gynecologists", positions: "4,339" },
    { title: "Psychiatrists", positions: "18,589" },
    { title: "IT Manager", positions: "50,963" },
    { title: "Orthodontists", positions: "20,079" },
    { title: "Data Scientist", positions: "28,200" },
    { title: "Operations Research Analysis", positions: "16,627" },
  ];

  return (
    <div className="bg-gray-100 min-h-screen pl-64 pt-0 w-full">
      <nav className="flex items-center justify-between px-10 py-4 border-b bg-white shadow-sm w-full">
        <div className="flex items-center gap-4">
          <select className="border p-2 rounded-md">
            <option>🇮🇳 India</option>
            <option>🇺🇸 USA</option>
            <option>🇬🇧 UK</option>
            <option>🇦🇺 Australia</option>
          </select>

          <div className="relative">
            <input
              type="text"
              placeholder="Job title, keyword, company"
              className="border p-2 pl-8 rounded-md w-96 outline-none"
            />
            <span className="absolute left-2 top-2 text-gray-500">🔍</span>
          </div>
        </div>

        <div className="flex gap-6">
        
          {!isAuthenticated && (
            <button className="text-blue-600 font-semibold" onClick={() => navigate("/signin")}>
              Sign In
            </button>
          )}
          <button className="bg-blue-600 text-white px-5 py-2 rounded-md">
            Post A Job
          </button>
        </div>
      </nav>

      <div className="flex justify-between items-center px-20 py-16">
        <div className="max-w-2xl">
          <h1 className="text-5xl font-bold text-gray-800">
            Find a job that suits your interest & skills.
          </h1>
          <p className="text-gray-500 mt-4 text-lg">
            Aliquam vitae turpis in diam convallis finibus at ut risus. Nullam in
            scelerisque leo, eget sollicitudin velit vestibulum.
          </p>

          <div className="flex items-center gap-3 mt-6 bg-white p-4 shadow-md rounded-md w-[600px]">
            <input
              type="text"
              placeholder="Job title, Keyword..."
              className="border p-3 rounded-md flex-1 outline-none"
            />
            <input
              type="text"
              placeholder="Your Location"
              className="border p-3 rounded-md flex-1 outline-none"
            />
            <button className="bg-blue-600 text-white px-6 py-3 rounded-md">
              Find Job
            </button>
          </div>

          <div className="mt-5 text-center">
            <p className="text-gray-500 text-lg">Or</p>
            <button className="mt-3 bg-blue-600 text-white px-7 py-3 rounded-md text-lg">
              Upload Resume
            </button>
          </div>
        </div>

        <img src="BgImage.jpg" className="w-[500px] max-w-full" alt="Job Search" />
      </div>

      <div className="flex justify-center gap-10 py-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold">1,75,324</h2>
          <p className="text-gray-500 text-lg">Live Jobs</p>
        </div>
        <div className="text-center">
          <h2 className="text-3xl font-bold">97,354</h2>
          <p className="text-gray-500 text-lg">Companies</p>
        </div>
        <div className="text-center">
          <h2 className="text-3xl font-bold">38,47,154</h2>
          <p className="text-gray-500 text-lg">Candidates</p>
        </div>
        <div className="text-center">
          <h2 className="text-3xl font-bold">7,532</h2>
          <p className="text-gray-500 text-lg">New Jobs</p>
        </div>
      </div>

      {/* 🆕 Most Popular Vacancies Section */}
      <div className="py-16 px-10 bg-white">
        <h2 className="text-3xl font-semibold text-center mb-8">Most Popular Vacancies</h2>

        <div className="grid grid-cols-3 gap-8 max-w-5xl mx-auto text-gray-800">
          {jobs.map((job, index) => (
            <div key={index} className="text-left" >
              {job.link ? (
                <a href="#" className="text-blue-600 font-semibold hover:underline">
                  {job.title}
                </a>
              ) : (
                <h3 className="font-semibold  hover:underline hover:text-blue-600 cursor-pointer ">{job.title}</h3>
              )}
              <p className="text-gray-500 text-sm">{job.positions} Open Positions</p>
            </div>
          ))}
        </div>
  
    <div className="w-full flex flex-col items-center px-6 md:px-12 lg:px-24 py-12 bg-gray-100  mt-[30px] ">
      {/* How Jobify Works */}
      <section className="text-center mb-16 ">
        <h2 className="text-3xl font-semibold mb-6">How Jobify Works</h2>
        <div className="flex flex-wrap justify-center gap-6">
          {[
            { title: "Create Account", desc: "Aliquam facilisis egestas sapien, nec tempor leo tristique at." },
            { title: "Upload CV/Resume", desc: "Curabitur sit amet maximus ligula. Nam a nulla ante." },
            { title: "Find Suitable Job", desc: "Phasellus quis eleifend ex. Morbi nec fringilla nibh." },
            { title: "Apply Job", desc: "Curabitur sit amet maximus ligula. Nam a nulla ante." },
          ].map((step, index) => (
            <div key={index} className="bg-white shadow-md p-6 rounded-lg w-64">
              <h3 className="text-lg font-semibold">{step.title}</h3>
              <p className="text-gray-500 text-sm">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Popular Category */}
      <section className="mb-16 w-full max-w-5xl">
        <h2 className="text-3xl font-semibold mb-6">Popular Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[
            { title: "Jobs and Openings", count: 357 },
            { title: "Code & Programming", count: 312 },
            { title: "Internships", count: 297 },
            { title: "Video & Animation", count: 247 },
            { title: "Music & Audio", count: 204 },
            { title: "Hackathons", count: 187 },
            { title: "Health & Care", count: 125 },
            { title: "Data & Science", count: 57 },
          ].map((category, index) => (
            <div key={index} className="bg-white shadow-md p-4 rounded-lg text-center">
              <h3 className="text-lg font-semibold">{category.title}</h3>
              <p className="text-gray-500 text-sm">{category.count} Open positions</p>
            </div>
          ))}
        </div>
      </section>

      {/* Top Companies */}
      <section className="w-full max-w-5xl">
        <h2 className="text-3xl font-semibold mb-6">Top Companies</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array(6).fill({ name: "Dribbble", location: "Dhaka, Bangladesh", positions: 3 }).map((company, index) => (
            <div key={index} className="bg-white shadow-md p-6 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold">{company.name}</h3>
                <span className="bg-red-100 text-red-600 px-2 py-1 text-xs rounded">Featured</span>
              </div>
              <p className="text-gray-500 text-sm mb-4">{company.location}</p>
              <button className="bg-blue-500 text-white px-4 py-2 rounded">Open Positions ({company.positions})</button>
            </div>
          ))}
        </div>
      </section>
      <section className="w-full max-w-5xl mt-16">
        <h2 className="text-3xl font-semibold mb-6">Client Testimonials</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { name: "John Doe", feedback: "This platform helped me land my dream job!" },
            { name: "Jane Smith", feedback: "A very user-friendly experience and great job listings." },
            { name: "Robert Brown", feedback: "Highly recommended for job seekers!" }
          ].map((testimonial, index) => (
            <div key={index} className="bg-white shadow-md p-6 rounded-lg">
              <p className="text-gray-700 italic">"{testimonial.feedback}"</p>
              <h3 className="text-lg font-semibold mt-2">{testimonial.name}</h3>
            </div>
          ))}
        </div>
      </section>
      </div>
    </div>
    </div>
    
  );
};

export default Home;
