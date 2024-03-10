import React, { useEffect, useState } from "react";
import { ColorModeContext, useMode } from "../../theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import DataTable from "react-data-table-component";
import "../../index.css";
import Topbar from "../global/Topbar";
import AdminSidebar from "../global/AdminSidebar";
import { rootShouldForwardProp } from "@mui/material/styles/styled";
import axios from "axios";
import * as ReactBootStrap from "react-bootstrap";

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


const StaffInfoAdmin = () => {
  const [theme, colorMode] = useMode();
  const [data, setData] = useState([])
  const [filterdata, setFilterdata] = useState([]);
  const [loading, setLoading] =  useState(false);


  const [token, setToken] = useState(null)

  useEffect(() => {
    const storedToken = localStorage.getItem('admin-token');
    setToken(storedToken);
  }, [])

  const fetchStudents = async () => {
    try {
      const response = await axios.get(`http://localhost:7777/api/staffs`, {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`
        }
      });
      setLoading(true);
      console.log(response);
      const responseData = response.data;
      setData(responseData.staff);
      console.log('Data after setting:', responseData); // Log the data after setting
    } catch (error) {
      console.error('Error fetching staffs:', error);
    }
  };

  useEffect(() => {
    if(token) {
      fetchStudents()
    }
  }, [token]);

  const column = [
    {
      name: "Name",
      selector: data => data.fullName,
      sortable: true
    },
    {
      name: "Email",
      selector: data => data.email,
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

  // const handleFilter = (event) => {
  //   const newRecord = data.filter(data => data.fullName.toLowerCase().includes(event.target.value.toLowerCase()))
  //   setData(newRecord)
  // }
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
              <h2>Staff Information</h2>
              <div style={{display: "flex", justifyContent: "left"}}>
                <input type="text" placeholder="Seach by Name" onChange={handleFilter} style={{padding: "6px 10px"}}/>
              </div>
              <br/>
              {/*<h1>{data.fullName}</h1>*/}
              {loading ? <DataTable
            columns={column}
            data={filterdata.length ? filterdata : data}
            customStyles={customstyle}
            pagination
            ></DataTable> : <ReactBootStrap.Spinner animation="border" /> }
            
            </div>
            {/* <div>
      <h2>Staff Information</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody tbody>
          {(data.length > 0 ) ? data.map((data, index) => {
            return (
              <tr key={index}>
                <td>{data.name}</td>
                <td>{data.email}</td>
              </tr>
            )
          }): <tr>
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

export default StaffInfoAdmin;
