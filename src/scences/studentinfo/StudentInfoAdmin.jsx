import React, { useState, useEffect } from "react";
import { ColorModeContext, useMode } from "../../theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import "./studentinfo.css";
import Topbar from "../global/Topbar";
import AdminSidebar from "../global/AdminSidebar";
import DataTable from "react-data-table-component";

const StudentInfoAdmin = () => {
  const [theme, colorMode] = useMode();
  const [data, setData] = useState([]);
  const [filterdata, setFilterdata] = useState([]);

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
      selector: row => row.name,
      sortable: true
    },
    {
      name: "Email",
      selector: row => row.email,
      sortable: true
    },
    {
      name: "Register Number",
      selector: row => row.regno,
      sortable: true
    },
    {
      name: "Batch",
      selector: row => row.batch,
      sortable: true
    }
  ]

  useEffect(() => {
    fetch(`http://localhost:7777/api/students`)
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.log(err));
  }, []);

  const handleFilter = (event) => {
    const newRecord = data.filter(data => data.name.toLowerCase().includes(event.target.value.toLowerCase()))
    setData(newRecord)  
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
                <input type="text" placeholder="Seach by Name" onChange={handleFilter} style={{padding: "6px 10px"}}/>
              </div>
              <br/>
            <DataTable
              columns={column}
              data={data}
              customStyles={customstyle}
              pagination
            ></DataTable>
            </div>
            {/* <div style={{padding: "50px 10%"}}>
              <h2>Student Information</h2>
              <div style={{display: "flex", justifyContent: "left"}}>
                <input type="text" placeholder="Seach Here" onChange={handleFilter} style={{padding: "6px 10px"}}/>
              </div>
              <br/>
            <DataTable 
            columns={column}
            data={data}
            customStyles={customstyle}
            pagination
            ></DataTable>
            </div> */}
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
                  {data.length > 0 ? (
                    data.map((data, index) => {
                      return (
                        <tr key={index}>
                          <td>{data.name}</td>
                          <td>{data.email}</td>
                          <td>{data.regno}</td>
                          <td>{data.batch}</td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div> */}
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default StudentInfoAdmin;
