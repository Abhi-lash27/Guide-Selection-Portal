import React, { useEffect, useState } from "react";
import { ColorModeContext, useMode } from "../../theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import '../../index.css';
import Topbar from "../global/Topbar";
import AdminSidebar from "../global/AdminSidebar";
import DataTable from "react-data-table-component";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const AdminDashboard = () => {
  const [theme, colorMode] = useMode();
  const [token, setToken] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    const storedToken = localStorage.getItem('admin-token');
    if (!storedToken) {
      window.location.href = "/"; // Redirect to login if token is missing
    } else {
      setToken(storedToken);
      fetchProjects(storedToken); // Fetch projects data
    }
  }, []);

  // Function to fetch projects data
  const fetchProjects = async (token) => {
    try {
      const response = await axios.get(`http://localhost:7777/api/projects`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      });
      setData(response.data.projects); // Set projects data in state
    } catch (error) {
      console.log(error);
    }
  };

  const customstyle = {
    headRow: {
      style: {
        backgroundColor: "#45a049",
        color: "white",
        margin : "20px"
      }
    },
    headCells: {
      style: {
        fontsize: "16px",
        textTransform: "uppercase"
      }
    },
    cells: {
      style: {
        fontsize: "15px",
      }
    }
  };

  // Columns configuration for DataTable
  const columns = [
    {
      name: "Project Title",
      selector: "title",
      sortable: true
    },
    {
      name: "Student 1 Name",
      selector: row => row.students && row.students.length > 0 ? row.students[0].fullName : "",
      sortable: true
    },
    {
      name: "Student 1 Register Number",
      selector: row => row.students && row.students.length > 0 ? row.students[0].regNo : "",
      sortable: true
    },
    {
      name: "Student 2 Name",
      selector: row => row.students && row.students.length > 1 ? row.students[1].fullName : "",
      sortable: true
    },
    {
      name: "Student 2 Register Number",
      selector: row => row.students && row.students.length > 1 ? row.students[1].regNo : "",
      sortable: true
    },
    {
      name: "Guide Name",
      selector: "staff.fullName",
      sortable: true
    }
  ];

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <AdminSidebar />
          <main className="content">
            <Topbar />
            <div>
              <h2>LIST OF TEAMS</h2>
              <br />
              <DataTable
                columns={columns}
                data={data}
                customStyles={customstyle}
                pagination
                highlightOnHover
              />
            </div>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default AdminDashboard;
