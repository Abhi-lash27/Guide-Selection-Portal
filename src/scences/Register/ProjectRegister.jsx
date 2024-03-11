import React, { useEffect, useState } from "react";
import StaffSidebar from "../global/StaffSidebar";
import Topbar from "../global/Topbar";
import { ColorModeContext, useMode } from "../../theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import StudentSidebar from "../global/StudentSidebar";
import SearchableDropdown from "../../components/common/SearchableDropdown";
import axios from "axios";
import { toast } from 'react-toastify';


const Createstudent = () => {
  const [theme, colorMode] = useMode();

  const [guideDropdown, setGuideDropdown] = useState([]);
  const [studentDropdown, setStudentDropdown] = useState([]);

  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (!storedToken) {
      return window.location.href = "/"
    }
    setToken(storedToken);
    fetchData();
    fetchStudents();
  }, []);


  const fetchStudents = async () => {
    try {
      const res = await axios.get(`http://localhost:7777/api/students`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      });
      const responseData = res.data;
      console.log(responseData);
      setStudentDropdown(responseData.students);
    } catch (err) {
      console.log("Error fetching students:", err);
    }
  };

  const fetchData = async () => {
    try {
      const res = await axios.get('http://localhost:7777/api/staffs');
      const data = res.data.staff;
      console.log(data);
      setGuideDropdown(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Map studentDropdown to options
  const options = studentDropdown.map(student => ({
    label: student.regNo,
    value: student.id
  }));

  const [formData, setFormData] = useState({
    regNo1: "",
    regNo2: "",
    title: "",
    guide: ""
  });

  const handleInputChange = (name, id) => {
    setFormData({
      ...formData,
      [name]: id
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    try {
      // Construct the data object in the required format
      const postData = {
        title: formData.title,
        studentIds: [formData.regNo1, formData.regNo2],
        staffId: formData.guide
      };

      // Make the POST request
      const res = await axios.post('http://localhost:7777/api/projects', postData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });

      console.log("Form submission successful:", res.data);
      toast.success("Form submission successful");

      // Clear form fields after successful submission
      setFormData({
        regNo1: "",
        regNo2: "",
        title: "",
        guide: ""
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error("Error submitting form. Please try again.");
    }
  };


  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <StudentSidebar />
          <main className="content">
            <Topbar />
            <div className="forms-container" style={{ marginRight: "20%", marginLeft: "20%" }}>
              <div className="form">
                <h1 className="h1-form">REGISTER PROJECT</h1>
                <form onSubmit={handleSubmit}>
                  <h2>Enter Details</h2>
                  <label htmlFor="regno1">Select Your Register Number: </label>
                  <SearchableDropdown
                    options={options}
                    onChange={(selectedOption) => handleInputChange("regNo1", selectedOption.value)}
                  />
                  <label htmlFor="regno2">Select Team- Register Number: </label>
                  <SearchableDropdown
                    options={options}
                    onChange={(selectedOption) => handleInputChange("regNo2", selectedOption.value)}
                  />
                </form>
              </div>
              <div className="form">
                <h1 className="h1-form">PROJECT DETAILS</h1>
                <form onSubmit={handleSubmit}>
                  <label htmlFor="title">Project Title:</label>
                  <input
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    type="text"
                    name="title"
                    id="title"
                    placeholder="Enter your Project Title"
                    required
                  />
                  <label htmlFor="guide">Select Guide:</label>
                  <select
                    id="guide"
                    value={formData.guide}
                    onChange={(e) => setFormData({ ...formData, guide: e.target.value })}
                    required
                  >
                    <option value="">Select Guide</option>
                    {guideDropdown.map((guide) => (
                      <option key={guide.id} value={guide.id}>
                        {guide.fullName}
                      </option>
                    ))}
                  </select>
                  <button className="btn-form1" type="submit">
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default Createstudent;
