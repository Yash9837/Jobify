const JobRecommendations = ({ jobs }) => {
    return (
      <div className="bg-white p-6 shadow rounded-md mt-6">
        <h3 className="text-lg font-semibold">Recommended Jobs</h3>
        {jobs.length > 0 ? (
          <ul className="mt-2">
            {jobs.map((job, index) => (
              <li key={index} className="p-2 border-b">
                {job.title}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">Upload a resume to see recommendations.</p>
        )}
      </div>
    );
  };
  
  export default JobRecommendations;
  