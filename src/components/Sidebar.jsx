import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-blue-800 text-white p-5 fixed">
      <h2 className="text-2xl font-bold mb-6 flex items-center space-x-2">
        <span>📂</span> <span>Jobify</span>
      </h2>
      <nav className="flex flex-col space-y-4">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `p-2 rounded ${isActive ? "bg-blue-700 border-b-2 border-white" : ""}`
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/jobs"
          className={({ isActive }) =>
            `p-2 rounded ${isActive ? "bg-blue-700 border-b-2 border-white" : ""}`
          }
        >
          Jobs
        </NavLink>
        <NavLink
          to="/hackathon"
          className={({ isActive }) =>
            `p-2 rounded ${isActive ? "bg-blue-700 border-b-2 border-white" : ""}`
          

          }
        >
          Hackathon
        </NavLink>
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `p-2 rounded ${isActive ? "bg-blue-700 border-b-2 border-white" : ""}`
          }
        >
          Dashboard
        </NavLink>
        <NavLink to="#" className="p-2 rounded hover:bg-blue-700">Soon</NavLink>
        <NavLink to="#" className="p-2 rounded hover:bg-blue-700">Soon</NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;