import React, { useState, useEffect } from "react";
import { ColorModeContext, useMode } from "../../theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import "../../index.css";
import Topbar from "../global/Topbar";
import StudentSidebar from "../global/StudentSidebar";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import * as ReactBootStrap from "react-bootstrap";

const StudentDashboard = () => {
  const [theme, colorMode] = useMode();
  const [data, setData] = useState([]);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false);

  const getStudentDetails = async () => {
    try {
      const storedToken = localStorage.getItem("token");
      const decodedToken = jwtDecode(storedToken);
      const studentId = decodedToken.id;
      const res = await axios.get(
        `http://localhost:7777/api/students/${studentId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${storedToken}`,
          },
        }
      );
      const projectId = res.data.projectId;

      const newResponse = await axios.get(
        `http://localhost:7777/api/projects/${projectId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${storedToken}`,
          },
        }
      );
      setLoading(true),
      setData(newResponse.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      return (window.location.href = "/");
    }
    setToken(storedToken);
    getStudentDetails();
  }, []);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div >
          <div className="row">
            <div className="col-md-3">
              <StudentSidebar />
            </div>
            <div className="col-md-8">
              <Topbar />
              <div className="container mt-4">
                <h2>Project Information</h2>
        {loading ? 
        
              
                <div className="table-responsive">
                  <table className="table table-bordered">
                    <tbody>
                      <tr>
                        <td>
                          <strong>Project Title:</strong>
                        </td>
                        <td>{data.title}</td>
                      </tr>
                      <tr>
                        <td colSpan="2">
                          <strong>Students:</strong>
                        </td>
                      </tr>
                      {Array.isArray(data.students) &&
                        data.students.map((student) => (
                          <React.Fragment key={student.id}>
                            <tr>
                              <td>Name:</td>
                              <td>{student.fullName}</td>
                            </tr>
                            <tr>
                              <td>Reg No:</td>
                              <td>{student.regNo}</td>
                            </tr>
                            <tr>
                              <td>Email:</td>
                              <td>{student.email}</td>
                            </tr>
                            <tr>
                              <td>Phone Number:</td>
                              <td>{student.phoneNo}</td>
                            </tr>
                            <tr>
                              <td>Batch:</td>
                              <td>{student.batch}</td>
                            </tr>
                          </React.Fragment>
                        ))}
                      <tr>
                        <td>
                          <strong>Staff Name:</strong>
                        </td>
                        <td>{data.staff && data.staff.fullName}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              
            : <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}> 
              <ReactBootStrap.Spinner animation="border" /> 
              </div>
              }
              </div>
              </div>
          </div>
        </div> 
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default StudentDashboard;
