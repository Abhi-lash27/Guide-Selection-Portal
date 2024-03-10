import React, { useState, useEffect } from "react";
import { ColorModeContext, useMode } from "../../theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import'./studentinfo.css';
import Topbar from "../global/Topbar";
import StaffSidebar from "../global/StaffSidebar";
import DataTable from "react-data-table-component";
import axios from "axios";

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

  const column = [
    {
      name: "Name",
      selector: row => row.fullName,
      sortable: true
    },
    {
      name: "Email",
      selector: row => row.email,
      sortable: true
    },
    {
      name: "Register Number",
      selector: row => row.regNo,
      sortable: true
    },
    {
      name: "Batch",
      selector: row => row.batch,
      sortable: true
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

const StudentInfoStaff = () => {
  const [theme, colorMode] = useMode();
  const [data, setData] = useState([]);
  const [filterdata, setFilterdata] = useState([]);

  const [token, setToken] = useState(null)

  useEffect(() => {
    const storedToken = localStorage.getItem('staff-token');
    setToken(storedToken);
  }, [])

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
          <StaffSidebar />
          <main className="content">
            <Topbar />
            <div style={{padding: "50px 10%"}}>
              <h2>Student Information</h2>
              <div style={{display: "flex", justifyContent: "left"}}>
                <input type="text" placeholder="Seach by Name" onChange={handleFilter} style={{padding: "6px 10px"}}/>
              </div>
              <br/>
            <DataTable
              columns={column}
              data={filterdata.length ? filterdata : data}
              customStyles={customstyle}
              pagination
            ></DataTable>
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