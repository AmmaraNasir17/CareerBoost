import { useState, useEffect } from 'react'
import Navbar from '../../components/Navbar'
import Sidebar from '../../components/Sidebar'

export default function Profile() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  
  const [profile, setProfile] = useState({
    name: "Abdul Hadi",
    role: "Full Stack Developer",
    location: "Lahore, Pakistan",
    tagline: "Passionate about building modern web applications",
    about: "I am a developer focused on building scalable and modern applications. With expertise in frontend and backend technologies, I love creating seamless user experiences.",
    experience: [
      {
        title: "Frontend Developer",
        company: "Tech Corp",
        duration: "2022 - Present",
        desc: "Working on React applications and modern UI/UX design"
      },
      {
        title: "Intern Developer",
        company: "Startup Inc",
        duration: "2021 - 2022",
        desc: "Learned full stack development with focus on web technologies"
      }
    ],
    skills: ["React", "Node.js", "PostgreSQL", "TailwindCSS", "JavaScript", "Express.js"],
    education: [
      {
        school: "University of Technology",
        degree: "BS in Computer Science",
        year: "2021"
      }
    ],
    contact: {
      email: localStorage.getItem('userEmail') || "hadi@example.com",
      phone: "+92 300 1234567",
      website: "www.hadi123@gmail.com"
    }
  })

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("profile")
    if (saved) {
      try {
        setProfile(JSON.parse(saved))
      } catch (error) {
        console.error("Error loading profile:", error)
      }
    }
  }, [])

  // Save to localStorage on profile change
  useEffect(() => {
    localStorage.setItem("profile", JSON.stringify(profile))
  }, [profile])

  const getAvatarLetter = () => {
    return profile.name.charAt(0).toUpperCase()
  }

  const handleProfileChange = (field, value) => {
    setProfile(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleExperienceChange = (index, field, value) => {
    const newExperience = [...profile.experience]
    newExperience[index] = {
      ...newExperience[index],
      [field]: value
    }
    setProfile(prev => ({
      ...prev,
      experience: newExperience
    }))
  }

  const handleSkillsChange = (value) => {
    const skillsArray = value.split(',').map(skill => skill.trim()).filter(skill => skill)
    setProfile(prev => ({
      ...prev,
      skills: skillsArray
    }))
  }

  const handleSave = () => {
    setIsEditing(false)
  }

  const userRole = localStorage.getItem('userRole') || 'applier'

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar 
        userName={profile.name} 
        userRole={userRole === 'recruiter' ? 'Recruiter' : 'Applier'} 
        onMenuClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
      />
      <Sidebar 
        currentRole={userRole} 
        isMobileOpen={mobileMenuOpen} 
        onClose={() => setMobileMenuOpen(false)} 
      />

      <main className="md:ml-64 mt-16 px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        <div className="max-w-5xl mx-auto">
          
          {/* Banner */}
          <div className="h-40 bg-gradient-to-r from-blue-500 to-blue-600 rounded-t-xl mb-0"></div>

          {/* Profile Header Card */}
          <div className="bg-white rounded-b-xl shadow-lg p-6 mb-6 -mt-20 relative z-10">
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-end">
              {/* Avatar */}
              <div className="w-32 h-32 rounded-full bg-blue-500 text-white flex items-center justify-center text-5xl font-bold shadow-lg flex-shrink-0">
                {getAvatarLetter()}
              </div>

              {/* Profile Info */}
              <div className="flex-1">
                {isEditing ? (
                  <div className="space-y-4">
                    <input
                      type="text"
                      value={profile.name}
                      onChange={(e) => handleProfileChange('name', e.target.value)}
                      className="text-2xl font-bold w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="text"
                      value={profile.role}
                      onChange={(e) => handleProfileChange('role', e.target.value)}
                      className="text-lg text-gray-600 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="text"
                      value={profile.location}
                      onChange={(e) => handleProfileChange('location', e.target.value)}
                      className="text-gray-600 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="text"
                      value={profile.tagline}
                      onChange={(e) => handleProfileChange('tagline', e.target.value)}
                      className="text-gray-600 italic w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                ) : (
                  <>
                    <h1 className="text-2xl font-bold text-gray-900">{profile.name}</h1>
                    <p className="text-lg text-gray-700">{profile.role}</p>
                    <p className="text-gray-600">📍 {profile.location}</p>
                    <p className="text-gray-600 italic mt-2">{profile.tagline}</p>
                  </>
                )}
              </div>

              {/* Edit/Save Button */}
              <div>
                {isEditing ? (
                  <button
                    onClick={handleSave}
                    className="px-6 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Save Profile
                  </button>
                ) : (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Edit Profile
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* About Section */}
              <div className="bg-white rounded-xl shadow p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">About</h2>
                {isEditing ? (
                  <textarea
                    value={profile.about}
                    onChange={(e) => handleProfileChange('about', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-24"
                  />
                ) : (
                  <p className="text-gray-700 leading-relaxed">{profile.about}</p>
                )}
              </div>

              {/* Experience Section */}
              <div className="bg-white rounded-xl shadow p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Experience</h2>
                <div className="space-y-6">
                  {profile.experience.map((exp, index) => (
                    <div key={index} className="pb-6 border-b border-gray-200 last:border-b-0 last:pb-0">
                      {isEditing ? (
                        <div className="space-y-3">
                          <input
                            type="text"
                            value={exp.title}
                            onChange={(e) => handleExperienceChange(index, 'title', e.target.value)}
                            placeholder="Job Title"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-semibold"
                          />
                          <input
                            type="text"
                            value={exp.company}
                            onChange={(e) => handleExperienceChange(index, 'company', e.target.value)}
                            placeholder="Company"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                          <input
                            type="text"
                            value={exp.duration}
                            onChange={(e) => handleExperienceChange(index, 'duration', e.target.value)}
                            placeholder="Duration"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                          <textarea
                            value={exp.desc}
                            onChange={(e) => handleExperienceChange(index, 'desc', e.target.value)}
                            placeholder="Description"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-16"
                          />
                        </div>
                      ) : (
                        <>
                          <h3 className="text-lg font-semibold text-gray-900">{exp.title}</h3>
                          <p className="text-gray-700">{exp.company}</p>
                          <p className="text-sm text-gray-600">{exp.duration}</p>
                          <p className="text-gray-700 mt-2">{exp.desc}</p>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Skills Section */}
              <div className="bg-white rounded-xl shadow p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Skills</h2>
                {isEditing ? (
                  <textarea
                    value={profile.skills.join(', ')}
                    onChange={(e) => handleSkillsChange(e.target.value)}
                    placeholder="Enter skills separated by commas"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {profile.skills.map((skill, index) => (
                      <span key={index} className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>

            </div>

            {/* Right Column */}
            <div className="space-y-6">
              
              {/* Contact Section */}
              <div className="bg-white rounded-xl shadow p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Contact</h2>
                <div className="space-y-4">
                  <div>
                    <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Email</p>
                    <p className="text-gray-900 break-all">{profile.contact.email}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Phone</p>
                    <p className="text-gray-900">{profile.contact.phone}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Website</p>
                    <p className="text-blue-600">{profile.contact.website}</p>
                  </div>
                </div>
              </div>

              {/* Education Section */}
              <div className="bg-white rounded-xl shadow p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Education</h2>
                <div className="space-y-4">
                  {profile.education.map((edu, index) => (
                    <div key={index}>
                      <h3 className="font-semibold text-gray-900">{edu.school}</h3>
                      <p className="text-gray-700 text-sm">{edu.degree}</p>
                      <p className="text-gray-600 text-sm">{edu.year}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Profile Stats */}
              <div className="bg-white rounded-xl shadow p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Profile Stats</h2>
                <div className="space-y-3">
                  <div className="flex justify-between text-gray-700">
                    <span>Profile Views</span>
                    <span className="font-semibold">245+</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Post Impressions</span>
                    <span className="font-semibold">1.2K</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Connections</span>
                    <span className="font-semibold">450+</span>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>
      </main>
    </div>
  )
}
