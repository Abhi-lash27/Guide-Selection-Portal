import React, {useState, useEffect} from "react";
import { ColorModeContext, useMode } from "../../theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import "../../index.css";
import Topbar from "../global/Topbar";
import StudentSidebar from "../global/StudentSidebar";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const StudentDashboard = () => {
  const [theme, colorMode] = useMode();
  const [data, setData] = useState([]);
  const [token, setToken] = useState(null)

  const getStudentDetails = async() => {
    try{
      const storedToken = localStorage.getItem("token")
      const decodedToken = jwtDecode(storedToken)
      const studentId = decodedToken.id
      const res = await axios.get(`http://localhost:7777/api/students/${studentId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization : `Bearer ${storedToken}`
        }
      }
      );
      // console.log(res);
      const projectId = res.data.projectId

      const newResponse = await axios.get(`http://localhost:7777/api/projects/${projectId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization : `Bearer ${storedToken}`
        }
      }
      );
      // console.log(newResponse);
      setData(newResponse.data)

    }catch(error){
      console.log(error);
    }
  }

  console.log(data);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if(!storedToken) {
      return window.location.href = "/"
    }
    setToken(storedToken);
    getStudentDetails();
  }, [])
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <StudentSidebar />
          <main className="content">
            <Topbar />
            <div>
              <h2>Project Information</h2>
              <table>
                <tbody>
                  <tr>
                    <td><strong>Project Title:</strong></td>
                    <td>{data.title}</td>
                  </tr>
                  <tr>
                    <td colSpan="2"><strong>Students:</strong></td>
                  </tr>
                  {Array.isArray(data.students) && data.students.map((student) => (
                    <>
                    <tr key={student.id}>
                      <td>Name:</td>
                      <td>{student.fullName}</td>
                    </tr>
                    <tr key={student.id}>
                      <td>Reg No:</td>
                      <td>{student.regNo}</td>
                    </tr>
                    </>
                  ))}
                  <tr>
                    <td>Staff Name:</td>
                    <td>{data.staff.fullName}</td>
                  </tr>
                  
                </tbody>
              </table>
            </div>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
  
  
                  }

 

export default StudentDashboard;
