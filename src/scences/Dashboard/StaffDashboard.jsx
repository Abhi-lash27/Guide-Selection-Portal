import React from "react";
import { ColorModeContext, useMode } from "../../theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import "../../index.css";
import Topbar from "../global/Topbar";
import StaffSidebar from "../global/StaffSidebar";

const StaffDashboard = () => {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <StaffSidebar />
          <main className="content">
            <Topbar />
            <div>
              <h2
                style={{
                  display: "flex",
                  alignContent: "flex-start",
                  padding: "20px",
                  marginLeft: "45px",
                }}
              >
                Staff Name: Dr.R. Subhashini
              </h2>
              <br />
              <h2>LIST OF TEAMS</h2>
              <br />
              <table style={{ width: 1200 }}>
                <thead>
                  <tr>
                    <th>PROJECT TITLE</th>
                    <th>STUDENT-1 NAME</th>
                    <th>REGISTER NUMBER</th>
                    <th>EMAIL</th>
                    <th>PHONE NUMBER</th>
                    <th>STUDENT-2 NAME</th>
                    <th>REGISTER NUMBER</th>
                    <th>EMAIL</th>
                    <th>PHONE NUMBER</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default StaffDashboard;
