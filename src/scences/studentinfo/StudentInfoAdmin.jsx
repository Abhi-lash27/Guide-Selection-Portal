import React, { useState, useEffect } from "react";
import { ColorModeContext, useMode } from "../../theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import "./studentinfo.css";
import Topbar from "../global/Topbar";
import AdminSidebar from "../global/AdminSidebar";
import DataTable from "react-data-table-component";
import axios from "axios";
import * as ReactBootStrap from "react-bootstrap";

const StudentInfoAdmin = () => {
  const [theme, colorMode] = useMode();
  const [data, setData] = useState([]);
  const [filterdata, setFilterdata] = useState([]);
  const [token, setToken] = useState(null);
  const [loading, setLoading] =  useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem('admin-token');
    setToken(storedToken);
  }, []);

  useEffect(() => {
    if(token) {
      fetchStudents();
    }
  }, [token]);

  useEffect(() => {
    if(data.length > 0) {
      const sortedData = [...data].sort((a, b) => (a.fullName < b.fullName) ? -1 : 1);
      setFilterdata(sortedData);
    }
  }, [data]);

  const fetchStudents = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/students`, {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`
        }
      });
      setLoading(true);
      const responseData = response.data;
      setData(responseData.students);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

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
      name: "Phone",
      selector: row => row.phoneNo,
      sortable: false,
    },
    {
      name: "Batch",
      selector: row => row.batch,
      sortable: false,
    },
  ]

  const handleFilter = (event) => {
    const newRecord = data.filter(data => data.fullName.toLowerCase().includes(event.target.value.toLowerCase()))
    setFilterdata(newRecord);
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
              {loading ? <DataTable
                columns={columns}
                data={filterdata}
                customStyles={customStyle}
                pagination
                highlightOnHover
              /> : <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}> 
              <ReactBootStrap.Spinner animation="border"/>
              </div> }
               {/* {} */}
            </div>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default StudentInfoAdmin;
