import { useState } from "react";

const emptyExperience = { title: "", company: "", duration: "", description: "" };
const emptyEducation = { degree: "", institution: "", year: "" };
const emptyProject = { name: "", description: "", tech: "" };

export default function ResumeBuilderForm({ initial, onSave, loading }) {
  const [personalInfo, setPersonalInfo] = useState(initial?.personal_info || { name: "", email: "", phone: "", location: "", linkedin: "" });
  const [experience, setExperience] = useState(initial?.experience || [emptyExperience]);
  const [education, setEducation] = useState(initial?.education || [emptyEducation]);
  const [projects, setProjects] = useState(initial?.projects || [emptyProject]);
  const [skills, setSkills] = useState(initial?.skills?.join(", ") || "");

  const updateListItem = (setter, list, index, field, value) => {
    const updated = list.map((item, i) => i === index ? { ...item, [field]: value } : item);
    setter(updated);
  };

  const addItem = (setter, list, empty) => setter([...list, { ...empty }]);
  const removeItem = (setter, list, index) => setter(list.filter((_, i) => i !== index));

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      personal_info: personalInfo,
      experience,
      education,
      projects,
      skills: skills.split(",").map((s) => s.trim()).filter(Boolean),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
        <h3 className="text-base font-semibold text-gray-800">Personal Information</h3>
        {["name", "email", "phone", "location", "linkedin"].map((field) => (
          <div key={field} className="space-y-1">
            <label className="block text-sm font-medium text-gray-700 capitalize">{field}</label>
            <input
              type="text"
              value={personalInfo[field]}
              onChange={(e) => setPersonalInfo({ ...personalInfo, [field]: e.target.value })}
              className="corporate-input"
            />
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold text-gray-800">Experience</h3>
          <button type="button" onClick={() => addItem(setExperience, experience, emptyExperience)} className="text-sm text-blue-600 font-medium">+ Add</button>
        </div>
        {experience.map((exp, i) => (
          <div key={i} className="border border-gray-100 rounded-lg p-4 space-y-3">
            {["title", "company", "duration", "description"].map((field) => (
              <div key={field} className="space-y-1">
                <label className="block text-xs font-medium text-gray-600 capitalize">{field}</label>
                {field === "description" ? (
                  <textarea
                    value={exp[field]}
                    onChange={(e) => updateListItem(setExperience, experience, i, field, e.target.value)}
                    className="corporate-input text-sm min-h-[80px]"
                  />
                ) : (
                  <input
                    type="text"
                    value={exp[field]}
                    onChange={(e) => updateListItem(setExperience, experience, i, field, e.target.value)}
                    className="corporate-input text-sm"
                  />
                )}
              </div>
            ))}
            {experience.length > 1 && (
              <button type="button" onClick={() => removeItem(setExperience, experience, i)} className="text-xs text-red-500 font-medium">Remove</button>
            )}
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold text-gray-800">Education</h3>
          <button type="button" onClick={() => addItem(setEducation, education, emptyEducation)} className="text-sm text-blue-600 font-medium">+ Add</button>
        </div>
        {education.map((edu, i) => (
          <div key={i} className="border border-gray-100 rounded-lg p-4 space-y-3">
            {["degree", "institution", "year"].map((field) => (
              <div key={field} className="space-y-1">
                <label className="block text-xs font-medium text-gray-600 capitalize">{field}</label>
                <input
                  type="text"
                  value={edu[field]}
                  onChange={(e) => updateListItem(setEducation, education, i, field, e.target.value)}
                  className="corporate-input text-sm"
                />
              </div>
            ))}
            {education.length > 1 && (
              <button type="button" onClick={() => removeItem(setEducation, education, i)} className="text-xs text-red-500 font-medium">Remove</button>
            )}
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold text-gray-800">Projects</h3>
          <button type="button" onClick={() => addItem(setProjects, projects, emptyProject)} className="text-sm text-blue-600 font-medium">+ Add</button>
        </div>
        {projects.map((proj, i) => (
          <div key={i} className="border border-gray-100 rounded-lg p-4 space-y-3">
            {["name", "description", "tech"].map((field) => (
              <div key={field} className="space-y-1">
                <label className="block text-xs font-medium text-gray-600 capitalize">{field}</label>
                <input
                  type="text"
                  value={proj[field]}
                  onChange={(e) => updateListItem(setProjects, projects, i, field, e.target.value)}
                  className="corporate-input text-sm"
                />
              </div>
            ))}
            {projects.length > 1 && (
              <button type="button" onClick={() => removeItem(setProjects, projects, i)} className="text-xs text-red-500 font-medium">Remove</button>
            )}
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-2">
        <h3 className="text-base font-semibold text-gray-800">Skills</h3>
        <p className="text-xs text-gray-400">Comma separated — e.g. React, Node.js, PostgreSQL</p>
        <input
          type="text"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
          className="corporate-input"
        />
      </div>

      <button type="submit" disabled={loading} className="corporate-button w-full">
        {loading ? "Saving..." : "Save Resume"}
      </button>
    </form>
  );
}