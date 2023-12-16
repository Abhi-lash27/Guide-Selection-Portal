import React, { useEffect, useState } from "react";
import { ColorModeContext, useMode } from "../../theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import DataTable from "react-data-table-component";
import "../../index.css";
import Topbar from "../global/Topbar";
import AdminSidebar from "../global/AdminSidebar";
import { rootShouldForwardProp } from "@mui/material/styles/styled";

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

  const column = [
    {
      name: "Name",
      selector: data => data.name,
      sortable: true
    },
    {
      name: "Email",
      selector: data => data.email,
      sortable: true
    }
  ]

  useEffect(() => {
    fetch(`http://localhost:7777/api/staffs`)
    .then(res => res.json())
    .then(data => setData(data))
    .catch(err => console.log(err))
  })

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
              <h2>Staff Information</h2>
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
