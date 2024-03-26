import React, { useState, useEffect } from "react";
import { ColorModeContext, useMode } from "../../theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import'./studentinfo.css';
import Topbar from "../global/Topbar";
import StaffSidebar from "../global/StaffSidebar";
import DataTable from "react-data-table-component";
import axios from "axios";
import * as ReactBootStrap from "react-bootstrap";
import { jwtDecode } from "jwt-decode";

const customstyle = {
    headRow: {
      style: {
        backgroundColor: "#45a049",
        color: "white"
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



const StudentInfoStaff = () => {
  const [theme, colorMode] = useMode();
  const [data, setData] = useState([]);
  const [filterdata, setFilterdata] = useState([]);
  const [loading, setLoading] = useState(false);

  const [token, setToken] = useState(null)

  useEffect(() => {
    const storedToken = localStorage.getItem('staff-token');
    setToken(storedToken);
  }, [])

  const fetchStudents = async () => {
    try {
      const storedToken = localStorage.getItem('staff-token');
      const decodedToken = jwtDecode(storedToken)
      const staffId = decodedToken.id

      const response = await axios.get(`${import.meta.env.VITE_API_URL}/projects/${staffId}/reviews`, {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`
        }
      });
      setLoading(true);
      console.log(response);
      const responseData = response.data;
      setData(responseData.projects);
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

  const column = [
    {
      name: "PROJECT TITLE",
      selector: (row) => row.title,
      sortable: true,
    },
    {
      name: "STUDENT-1 NAME",
      selector: (row) => row.students && row.students.length > 0 ? row.students[0].fullName : "",
      sortable: true,
    },
    {
      name: "REGISTER NUMBER",
      selector: (row) => row.students && row.students.length > 0 ? row.students[0].regNo : "",
      sortable: true,
    },
    {
      name: "phone number",
      selector: (row) => row.students && row.students.length > 0 ? row.students[0].phoneNo : ""
    },
    {
      name: "STUDENT-2 NAME",
      selector: (row) => row.students && row.students.length > 1 ? row.students[1].fullName : "",
      sortable: true,
    },
    {
      name: "REGISTER NUMBER",
      selector: (row) => row.students && row.students.length > 1 ? row.students[1].regNo : "",
      sortable: true,
    },
    {
      name: "phone number",
      selector: (row) => row.students && row.students.length > 0 ? row.students[1].phoneNo : ""
    },
  ];


  const handleFilter = (event) => {
    const inputValue = event.target.value.toLowerCase();
    const newRecord = data.filter(project =>
      project.title.toLowerCase().includes(inputValue)
    );
    setFilterdata(newRecord);
  };

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <StaffSidebar />
          <main className="content">
            <Topbar />
            <div style={{padding: "50px 10%"}}>
              <h2>Student Information</h2>
              <div style={{display: "flex", justifyContent: "left"}}>
                <input type="text" placeholder="Seach by Name" onChange={handleFilter} style={{padding: "6px 10px"}}/>
              </div>
              <br/>
              {loading ? <DataTable
                columns={column}
                data={filterdata.length ? filterdata : data}
                customStyles={customstyle}
                pagination
                highlightOnHover
              /> :
              <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}> 
              <ReactBootStrap.Spinner animation="border" /> 
              </div>
              }
            </div>
           {/* <div>
      <h2>Student Information</h2>
      <table> 
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Registration Number</th>
            <th>Batch</th>
          </tr>
        </thead>
        <tbody>
          {(data.length > 0 ) ? data.map((data, index) => {
            return (
              <tr key={index}>
                <td>{data.name}</td>
                <td>{data.email}</td>
                <td>{data.regno}</td>
                <td>{data.batch}</td>
              </tr>
            )
          }): <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            </tr>}
        </tbody> 
       </table>
     </div>  */}
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default StudentInfoStaff;