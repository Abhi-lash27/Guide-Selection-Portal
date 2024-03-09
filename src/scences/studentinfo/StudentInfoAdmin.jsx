import React, { useState, useEffect } from "react";
import { ColorModeContext, useMode } from "../../theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import "./studentinfo.css";
import Topbar from "../global/Topbar";
import AdminSidebar from "../global/AdminSidebar";
import DataTable from "react-data-table-component";
import axios from "axios";

const StudentInfoAdmin = () => {
  const [theme, colorMode] = useMode();
  const [data, setData] = useState([]);
  const [filterdata, setFilterdata] = useState([]);

  const [token, setToken] = useState(null)

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    setToken(storedToken);
  }, [])

  const customStyle = {
    headRow: {
      style: {
        backgroundColor: "#45a049",
        color: "white"
      }
    },
    headCells: {
      style: {
        fontSize: "16px"
      }
    },
    cells: {
      style: {
        fontSize: "15px",
      }
    }
  };

  const columns = [
    {
      name: "Name",
      selector: row => row.fullName,
      sortable: true,
    },
    {
      name: "Email",
      selector: row => row.email,
      sortable: false,
    },
    {
      name: "Register Number",
      selector: row => row.regNo,
      sortable: false,

    },
    {
      name: "Batch",
      selector: row => row.batch,
      sortable: false,
    },
    {
      name: "Actions",
      cell: (row) => (
        <button
          className="delete-student"
          onClick={() => handleDelete(row)}
        >
          Delete
        </button>
      ),
    },

  ]

  const fetchStudents = async () => {
    try {
      const response = await axios.get(`http://localhost:7777/api/students`, {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`
        }
      });

      console.log(response);
      const responseData = response.data;
      setData(responseData.students);
      console.log('Data after setting:', responseData); // Log the data after setting
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  useEffect(() => {
    if(token) {
      fetchStudents()
    }
  }, [token]);

  const handleFilter = (event) => {
    const newRecord = data.filter(data => data.fullName.toLowerCase().includes(event.target.value.toLowerCase()))
    setFilterdata(newRecord); // Update filter data state
  }

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <AdminSidebar />
          <main className="content">
            <Topbar />
            <div style={{padding: "50px 10%"}}>
              <h2>Student Information</h2>
              <div style={{display: "flex", justifyContent: "left"}}>
                <input type="text" placeholder="Search by Name" onChange={handleFilter} style={{padding: "6px 10px"}}/>
              </div>
              <br/>
              <DataTable
                columns={columns}
                data={filterdata.length ? filterdata : data} // Use filtered data if available, otherwise use all data
                customStyles={customStyle}
                pagination
              />
            </div>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default StudentInfoAdmin;
