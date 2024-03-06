// import React from "react";
// import { ColorModeContext, useMode } from "../../theme";
// import { CssBaseline, ThemeProvider } from "@mui/material";
// import "../../index.css";
// import Topbar from "../global/Topbar";
// import StaffSidebar from "../global/StaffSidebar";

// const DownloadPptStaff = () => {
//   const [theme, colorMode] = useMode();

//   return (
//     <ColorModeContext.Provider value={colorMode}>
//       <ThemeProvider theme={theme}>
//         <CssBaseline />
//         <div className="app">
//           <StaffSidebar />
//           <main className="content">
//             <Topbar />
//             <div>
//               <h2
//                 style={{
//                   display: "flex",
//                   alignContent: "flex-start",
//                   padding: "20px",
//                   marginLeft: "45px",
//                 }}
//               >
//                 Staff Name: Dr.R. Subhashini
//               </h2>
//               <br />
//               <h2>LIST OF STUDENTS</h2>
//               <br />
//               <table style={{ width: 1200 }}>
//                 <thead>
//                   <tr>
//                     <th>PROJECT TITLE</th>
//                     <th>STUDENT-1 NAME</th>
//                     <th>REGISTER NUMBER</th>
//                     <th>STUDENT-2 NAME</th>
//                     <th>REGISTER NUMBER</th>
//                     <th>PPT</th>
//                     <th>APPROVE STATUS</th>
//                     <th>APPROVE</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   <tr>
//                     <td></td>
//                     <td></td>
//                     <td></td>
//                     <td></td>
//                     <td></td>
//                     <td></td>
//                     <td></td>
//                     <td></td>
//                   </tr>
//                 </tbody>
//               </table>
//             </div>
//           </main>
//         </div>
//       </ThemeProvider>
//     </ColorModeContext.Provider>
//   );
// };

// export default DownloadPptStaff;
import React, { useState } from "react";
import { ColorModeContext, useMode } from "../../theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Topbar from "../global/Topbar";
import StaffSidebar from "../global/StaffSidebar";
import DataTable from "react-data-table-component";

const DownloadPptStaff = () => {
  const [theme, colorMode] = useMode();
  const [data, setData] = useState([
    {
      title: "Project 1",
      name1: "John Doe",
      regno1: "123456",
      name2: "Jane Doe",
      regno2: "654321",
      ppt:"https://dagrs.berkeley.edu/sites/default/files/2020-01/sample.pdf",
      status: "Pending",
    },
    {
      title: "Project 2",
      name1: "Alice Smith",
      regno1: "987654",
      name2: "Bob Smith",
      regno2: "456789",
      ppt: "Link to PPT",
      status: "Pending",
    },
    // Add more data objects as needed
  ]);
  const [status, setStatus] = useState('');

  const handleApprove = (rowIndex) => {
    const newData = [...data];
    newData[rowIndex].status = "Approved";
    setData(newData);
  };

  const handleDecline = (rowIndex) => {
    const newData = [...data];
    newData[rowIndex].status = "Declined";
    setData(newData);
  };

  const customStyles = {
    headRow: {
      style: {
        backgroundColor: "#45a049",
        color: "white",
      },
    },
    headCells: {
      style: {
        fontSize: "16px",
        maxWidth:'50px'
      },
    },
    cells: {
      style: {
        fontSize: "15px",
        maxWidth: "50px",
        // overflow: "hidden",
        textOverflow: "ellipsis",
      },
    },
  };

  const columns = [
    {
      name: "PROJECT TITLE",
      selector: "title",
      sortable: true,
    },
    {
      name: "STUDENT-1 NAME",
      selector: "name1",
      sortable: true,
    },
    {
      name: "REGISTER NUMBER",
      selector: "regno1",
      sortable: true,
    },
    {
      name: "STUDENT-2 NAME",
      selector: "name2",
      sortable: true,
    },
    {
      name: "REGISTER NUMBER",
      selector: "regno2",
      sortable: true,
    },
    {
      name: "PPT",
      cell: (row) => (
        <a href={row.ppt} target="_blank" rel="noopener noreferrer">View PPT</a>
      ),
      sortable: true,
    },
    {
      name: "APPROVE STATUS",
      selector: "status",
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row, rowIndex) => (
        <div>
          {row.status === 'Pending' && (
            <>
              <button className="btn-approve" onClick={() => handleApprove(rowIndex)}>Approve</button>
              <button className="btn-decline" onClick={() => handleDecline(rowIndex)}>Decline</button>
            </>
          )}
          {row.status === 'Approved' && <span>Approved</span>}
          {row.status === 'Declined' && <span>Declined</span>}
        </div>
      ),
      sortable: false,
    },
  ];
  const handleFilter = (event) => {
    const newRecord = data.filter(data => data.title.toLowerCase().includes(event.target.value.toLowerCase()))
    setData(newRecord)  
  }

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <StaffSidebar />
          <main className="content">
            <Topbar />
            <div style={{ maxWidth: '100%', overflowX: 'auto', margin:'20px'}}>
              <h2 style={{ padding: "20px" }}>Staff Name: Dr.R. Subhashini</h2>
              <br />
              <h2>LIST OF STUDENTS</h2>
              <div style={{display: "flex", justifyContent: "left"}}>
                <input type="text" placeholder="Seach by Project" onChange={handleFilter} style={{padding: "6px 10px"}}/>
              </div>
              <br />
              <DataTable 
                columns={columns}
                data={data}
                customStyles={customStyles}
                pagination
              />
            </div>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default DownloadPptStaff;


