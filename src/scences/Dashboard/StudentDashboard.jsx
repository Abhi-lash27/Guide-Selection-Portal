import React, {useState, useEffect} from "react";
import { ColorModeContext, useMode } from "../../theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import "../../index.css";
import Topbar from "../global/Topbar";
import StudentSidebar from "../global/StudentSidebar";

const StudentDashboard = () => {
  const [theme, colorMode] = useMode();
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:7777/api/projects`)
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <StudentSidebar />
          <main className="content">
            <Topbar />
            <div>
              <h2>Student Information</h2>
              <table>
                <tbody>
                  {(data.length > 0)? data.map((data, index) => {
                        return (
                          <tr key={index}>
                            <tr>
                              <th>Project Title</th>
                              <td>{data.title}</td>
                            </tr>
                            <tr>
                              <th>Team Member 1</th>
                              <td>{data.member1}</td>
                            </tr>
                            <tr>
                              <th>Register No 1</th>
                              <td>{data.regno1}</td>
                            </tr>
                            <tr>
                              <th>Guide Name</th>
                              <td>{data.guide}</td>
                            </tr>
                            <tr>
                              <th>Email 1</th>
                              <td>{data.email1}</td>
                            </tr>
                            <tr>
                              <th>Phone No 1</th>
                              <td>{data.phno1}</td>
                            </tr>
                            <tr>
                              <th>Team Member 2</th>
                              <td>{data.member2}</td>
                            </tr>
                            <tr>
                              <th>Register No 2</th>
                              <td>{data.regno2}</td>
                            </tr>
                            <tr>
                              <th>Email 2</th>
                              <td>{data.email2}</td>
                            </tr>
                          </tr>
                        );
                      })
                    : null }
                  {/* : //{" "} */}
                  {/* <tr>
                    // <th>Project Title</th>
                    // <td>Cell 1</td>
                    //{" "}
                  </tr>
                  //{" "}
                  <tr>
                    // <th>Team Member 1</th>
                    // <td>Cell 1</td>
                    //{" "}
                  </tr>
                  //{" "}
                  <tr>
                    // <th>Register No 1</th>
                    // <td>Cell 2</td>
                    //{" "}
                  </tr>
                  //{" "}
                  <tr>
                    // <th>Guide Name</th>
                    // <td>Cell 2</td>
                    //{" "}
                  </tr>
                  //{" "}
                  <tr>
                    // <th>Email 1</th>
                    // <td>Cell 2</td>
                    //{" "}
                  </tr>
                  //{" "}
                  <tr>
                    // <th>Phone No 1</th>
                    // <td>Cell 2</td>
                    //{" "}
                  </tr>
                  //{" "}
                  <tr>
                    // <th>Team Member 2</th>
                    // <td>Cell 2</td>
                    //{" "}
                  </tr>
                  //{" "}
                  <tr>
                    // <th>Register No 2</th>
                    // <td>Cell 2</td>
                    //{" "}
                  </tr>
                  //{" "}
                  <tr>
                    // <th>Email 2</th>
                    // <td>Cell 2</td>
                    //{" "}
                  </tr> */}
                </tbody>
              </table>
            </div>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default StudentDashboard;
