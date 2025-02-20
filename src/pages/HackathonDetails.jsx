import { useParams } from "react-router-dom";
import { useState } from "react";

const HackathonDetails = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("timeline");

  const hackathon = {
    title: "Designathon",
    location: "NIT Kurukshetra, Haryana, India",
    date: "Feb 19, 2025",
    status: "Free",
    registrations: 52,
    teamSize: "1 - 3 Members",
    impressions: "8,674",
    deadline: "4 days left",
    banner: "https://www.brightidea.com/wp-content/uploads/Hackathon-Benefits.png",
    categories: ["College Festival", "Designing", "Case Study"],
    timeline: [
      {
        date: "Feb 19, 2025",
        title: "Idea Submission Round (via Unstop)",
        status: "Live",
        details:
          "For this round, submit a one-page PDF summarizing your approach and ideas. Your document should include: team details, track selection, identified problems, proposed solutions, features & implementation, and design progress.",
        start: "19 Feb 25, 12:47 PM IST",
        end: "24 Feb 25, 11:59 PM IST",
      },
      {
        date: "Mar 1, 2025",
        title: "Final Evaluation Round (Offline)",
        status: "Upcoming",
        details: "This will be an offline round. The 'Enter' button will be visible when the round is live.",
        start: "01 Mar 25, 12:00 AM IST",
        end: "01 Mar 25, 11:59 PM IST",
      },
    ],
    details: {
      description:
        "Get ready to unleash your creativity and innovation at our upcoming Designathon. This is an opportunity to enrich your portfolio and network with the best in the design community.",
      teamSize: "Teams of 1-3 are welcome.",
      caseStudy: "Engage in real-world case study projects.",
      registrationDates: "19th February – 23rd February.",
      rounds: [
        { title: "Round 1 (24th February):", description: "Submission of initial case study documentation." },
        { title: "Round 2 (1st March):", description: "Live presentation and final evaluation." },
      ],
      tools: ["Notion", "Figma"],
    },
  };

  return (
    <div className="ml-64 bg-gray-100 min-h-screen">
      {/* Banner Section */}
      <div className="relative">
        <img src={hackathon.banner} alt="Hackathon Banner" className="w-full h-64 object-cover" />
      </div>

      <div className="p-6 flex">
        {/* Left Section */}
        <div className="w-2/3 bg-white p-6 shadow-md rounded-md">
          <h1 className="text-3xl font-bold">{hackathon.title}</h1>
          <p className="text-gray-500">📍 {hackathon.location}</p>
          <p className="text-gray-500">📅 Updated On: {hackathon.date}</p>

          {/* Categories */}
          <div className="mt-4 flex space-x-3">
            {hackathon.categories.map((category, index) => (
              <span key={index} className="px-3 py-1 bg-gray-200 rounded">
                {category}
              </span>
            ))}
          </div>

          {/* Tabs */}
          <div className="mt-6 flex space-x-6 border-b">
            {["timeline", "details"].map((tab) => (
              <button
                key={tab}
                className={`py-2 px-4 ${
                  activeTab === tab ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-600"
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab === "timeline" ? "Stages & Timeline" : "Details"}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="mt-4">
            {activeTab === "timeline" ? (
              <>
                <h2 className="text-2xl font-bold">Stages and Timelines</h2>
                {hackathon.timeline.map((stage, index) => (
                  <div key={index} className="mt-4 bg-gray-100 p-4 rounded-md">
                    <p className="text-gray-500">{stage.date}</p>
                    <h3 className="text-lg font-semibold">{stage.title}</h3>
                    <p className="text-gray-500">{stage.status}</p>
                    <p className="mt-2">{stage.details}</p>
                    <p className="text-gray-500">🕒 {stage.start} - {stage.end}</p>
                  </div>
                ))}
              </>
            ) : (
              <>
                <h2 className="text-2xl font-bold">All that you need to know about {hackathon.title}</h2>
                <p className="mt-2">{hackathon.details.description}</p>
                <h3 className="mt-4 font-semibold">Team Size</h3>
                <p>{hackathon.details.teamSize}</p>
                <h3 className="mt-4 font-semibold">Case Study Projects</h3>
                <p>{hackathon.details.caseStudy}</p>
                <h3 className="mt-4 font-semibold">Registration Dates</h3>
                <p>{hackathon.details.registrationDates}</p>
                <h3 className="mt-4 font-semibold">Rounds</h3>
                {hackathon.details.rounds.map((round, index) => (
                  <p key={index}>
                    <strong>{round.title}</strong> {round.description}
                  </p>
                ))}
                <h3 className="mt-4 font-semibold">Tools</h3>
                <p>{hackathon.details.tools.join(", ")}</p>
              </>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-1/3 ml-6">
          <div className="bg-white p-4 shadow-md rounded-md">
            <h2 className="text-2xl font-semibold">{hackathon.status}</h2>
            <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded">Register</button>
          </div>
          <div className="bg-white p-4 shadow-md rounded-md mt-4">
            <p>👥 Registered: {hackathon.registrations}</p>
            <p>👤 Team Size: {hackathon.teamSize}</p>
            <p>🔥 Impressions: {hackathon.impressions}</p>
            <p>⏳ Registration Deadline: {hackathon.deadline}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HackathonDetails;