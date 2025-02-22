import { useState } from "react";
import { getDocument } from "pdfjs-dist";

const ResumeUpload = ({ setJobs }) => {
  const [resumeText, setResumeText] = useState("");

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file && file.type === "application/pdf") {
      const reader = new FileReader();
      reader.onload = async () => {
        const typedArray = new Uint8Array(reader.result);
        const pdf = await getDocument(typedArray).promise;
        
        let text = "";
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const content = await page.getTextContent();
          const pageText = content.items.map((item) => item.str).join(" ");
          text += pageText + " ";
        }

        setResumeText(text);
        processResume(text);
      };

      reader.readAsArrayBuffer(file);
    } else {
      alert("Please upload a valid PDF file.");
    }
  };

  const processResume = (text) => {
    // Simple keyword-based job recommendation
    const jobList = [
      { title: "Software Developer", keywords: ["JavaScript", "React", "Node.js"] },
      { title: "Data Scientist", keywords: ["Python", "Machine Learning", "AI"] },
      { title: "Graphic Designer", keywords: ["Photoshop", "Illustrator", "UI/UX"] },
    ];

    const recommendedJobs = jobList.filter((job) =>
      job.keywords.some((keyword) => text.includes(keyword))
    );

    setJobs(recommendedJobs);
  };

  return (
    <div className="bg-white p-6 shadow rounded-md mt-6">
      <h3 className="text-lg font-semibold">Upload Your Resume</h3>
      <input
        type="file"
        accept="application/pdf"
        onChange={handleFileUpload}
        className="border p-2 w-full mt-2 rounded-md"
      />
      <p className="text-gray-600 mt-2">
        Extracted Resume Text: {resumeText.substring(0, 200)}...
      </p>
    </div>
  );
};

export default ResumeUpload;
