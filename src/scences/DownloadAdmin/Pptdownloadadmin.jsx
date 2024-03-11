import React, { useState,useEffect } from "react";
import { ColorModeContext, useMode } from "../../theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Topbar from "../global/Topbar";
import AdminSidebar from "../global/AdminSidebar";
import DataTable from "react-data-table-component";
import axios from "axios";

const DownloadPptAdmin = () => {
  const [theme, colorMode] = useMode();
  const [token, setToken] = useState(null)
  // const [data, setData] = useState([
  //   {
  //     title: "Project 1",
  //     name1: "John Doe",
  //     regno1: "123456",
  //     name2: "Jane Doe",
  //     regno2: "654321",
  //     ppt:"https://dagrs.berkeley.edu/sites/default/files/2020-01/sample.pdf",
  //     status: "Pending",
  //   },
  //   {
  //     title: "Project 2",
  //     name1: "Alice Smith",
  //     regno1: "987654",
  //     name2: "Bob Smith",
  //     regno2: "456789",
  //     ppt: "Link to PPT",
  //     status: "Pending",
  //   },
  //   // Add more data objects as needed
  // ]);
  const [data, setData] = useState();
  const [status, setStatus] = useState('');

  const fetchAllStudents = async () => {
    try {
      const storedToken = localStorage.getItem('admin-token');
      const res = await axios.get(`http://localhost:7777/api/projects`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${storedToken}`
        }
      });
      const responseData = res.data
      setData(responseData.projects)
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const storedToken = localStorage.getItem('admin-token');
    if (!storedToken) {
      window.location.href = "/";
      return;
    }
    setToken(storedToken);
    fetchAllStudents();
  }, []);

  const handleDownload = async (fileId) => {
    try {
      const response = await axios({
        url: `http://localhost:7777/api/files/${fileId}`,
        method: 'GET',
        responseType: 'blob', // important
        headers: {
          'Content-Type': 'application/json', // Adjust content type if necessary
          'Authorization': `Bearer ${token}`, // Include your authorization token here
        },
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'ppt.pdf'); // you can set file name here
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };

  // const handleApprove = (rowIndex) => {
  //   const newData = [...data];
  //   newData[rowIndex].status = "Approved";
  //   setData(newData);
  // };

  // const handleDecline = (rowIndex) => {
  //   const newData = [...data];
  //   newData[rowIndex].status = "Declined";
  //   setData(newData);
  // };

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

  const zero = [
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
      name: "STAGE",
      selector: (row) => row.reviews && row.reviews.length > 0 ? row.reviews[0].stage : "",
      sortable: true,
    },
    {
      name: "PPT",
      cell: (row) => (
        row.reviews && row.reviews.length > 0 ?
          <button onClick={() => handleDownload(row.reviews[0].fileId[0])}>Download</button>
          : ""
      ),
      sortable: true,
    },
    {
      name: "APPROVE STATUS",
      selector: (row) => row.reviews && row.reviews.length > 0 ? row.reviews[0].status : "",
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div>
          {row.reviews && row.reviews.length > 0 && row.reviews[0].status === 'pending' && (
            <>
              <button className="btn-approve" onClick={() => {}}>Approve</button>
              <button className="btn-decline" onClick={() => {}}>Decline</button>
            </>
          )}
          {row.reviews && row.reviews.length > 0 && row.reviews[0].status === 'approved' && <span>Approved</span>}
          {row.reviews && row.reviews.length > 0 && row.reviews[0].status === 'declined' && <span>Declined</span>}
        </div>
      ),
      sortable: false,
    }
  ];

  const first = [
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
      name: "STAGE",
      selector: (row) => row.reviews && row.reviews.length > 0 ? row.reviews[0].stage : "",
      sortable: true,
    },
    {
      name: "PPT",
      cell: (row) => (
        row.reviews && row.reviews.length > 0 ?
          <button onClick={() => handleDownload(row.reviews[0].fileId[0])}>Download</button>
          : ""
      ),
      sortable: true,
    },
    {
      name: "APPROVE STATUS",
      selector: (row) => row.reviews && row.reviews.length > 0 ? row.reviews[0].status : "",
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div>
          {row.reviews && row.reviews.length > 0 && row.reviews[0].status === 'pending' && (
            <>
              <button className="btn-approve" onClick={() => {}}>Approve</button>
              <button className="btn-decline" onClick={() => {}}>Decline</button>
            </>
          )}
          {row.reviews && row.reviews.length > 0 && row.reviews[0].status === 'approved' && <span>Approved</span>}
          {row.reviews && row.reviews.length > 0 && row.reviews[0].status === 'declined' && <span>Declined</span>}
        </div>
      ),
      sortable: false,
    }
  ];


  const second = [
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
      name: "STAGE",
      selector: (row) => row.reviews && row.reviews.length > 0 ? row.reviews[0].stage : "",
      sortable: true,
    },
    {
      name: "PPT",
      cell: (row) => (
        row.reviews && row.reviews.length > 0 ?
          <button onClick={() => handleDownload(row.reviews[0].fileId[0])}>Download</button>
          : ""
      ),
      sortable: true,
    },
    {
      name: "APPROVE STATUS",
      selector: (row) => row.reviews && row.reviews.length > 0 ? row.reviews[0].status : "",
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div>
          {row.reviews && row.reviews.length > 0 && row.reviews[0].status === 'pending' && (
            <>
              <button className="btn-approve" onClick={() => {}}>Approve</button>
              <button className="btn-decline" onClick={() => {}}>Decline</button>
            </>
          )}
          {row.reviews && row.reviews.length > 0 && row.reviews[0].status === 'approved' && <span>Approved</span>}
          {row.reviews && row.reviews.length > 0 && row.reviews[0].status === 'declined' && <span>Declined</span>}
        </div>
      ),
      sortable: false,
    }
  ];
  const third = [
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
      name: "STAGE",
      selector: (row) => row.reviews && row.reviews.length > 0 ? row.reviews[0].stage : "",
      sortable: true,
    },
    {
      name: "PPT",
      cell: (row) => (
        row.reviews && row.reviews.length > 0 ?
          <button onClick={() => handleDownload(row.reviews[0].fileId[0])}>Download</button>
          : ""
      ),
      sortable: true,
    },
    {
      name: "APPROVE STATUS",
      selector: (row) => row.reviews && row.reviews.length > 0 ? row.reviews[0].status : "",
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div>
          {row.reviews && row.reviews.length > 0 && row.reviews[0].status === 'pending' && (
            <>
              <button className="btn-approve" onClick={() => {}}>Approve</button>
              <button className="btn-decline" onClick={() => {}}>Decline</button>
            </>
          )}
          {row.reviews && row.reviews.length > 0 && row.reviews[0].status === 'approved' && <span>Approved</span>}
          {row.reviews && row.reviews.length > 0 && row.reviews[0].status === 'declined' && <span>Declined</span>}
        </div>
      ),
      sortable: false,
    }
  ];

  const forth = [
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
      name: "STAGE",
      selector: (row) => row.reviews && row.reviews.length > 0 ? row.reviews[0].stage : "",
      sortable: true,
    },
    {
      name: "PPT",
      cell: (row) => (
        row.reviews && row.reviews.length > 0 ?
          <button onClick={() => handleDownload(row.reviews[0].fileId[0])}>Download</button>
          : ""
      ),
      sortable: true,
    },
    {
      name: "APPROVE STATUS",
      selector: (row) => row.reviews && row.reviews.length > 0 ? row.reviews[0].status : "",
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div>
          {row.reviews && row.reviews.length > 0 && row.reviews[0].status === 'pending' && (
            <>
              <button className="btn-approve" onClick={() => {}}>Approve</button>
              <button className="btn-decline" onClick={() => {}}>Decline</button>
            </>
          )}
          {row.reviews && row.reviews.length > 0 && row.reviews[0].status === 'approved' && <span>Approved</span>}
          {row.reviews && row.reviews.length > 0 && row.reviews[0].status === 'declined' && <span>Declined</span>}
        </div>
      ),
      sortable: false,
    }
  ];

  const model = [
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
      name: "STAGE",
      selector: (row) => row.reviews && row.reviews.length > 0 ? row.reviews[0].stage : "",
      sortable: true,
    },
    {
      name: "PPT",
      cell: (row) => (
        row.reviews && row.reviews.length > 0 ?
          <button onClick={() => handleDownload(row.reviews[0].fileId[0])}>Download</button>
          : ""
      ),
      sortable: true,
    },
    {
      name: "APPROVE STATUS",
      selector: (row) => row.reviews && row.reviews.length > 0 ? row.reviews[0].status : "",
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div>
          {row.reviews && row.reviews.length > 0 && row.reviews[0].status === 'pending' && (
            <>
              <button className="btn-approve" onClick={() => {}}>Approve</button>
              <button className="btn-decline" onClick={() => {}}>Decline</button>
            </>
          )}
          {row.reviews && row.reviews.length > 0 && row.reviews[0].status === 'approved' && <span>Approved</span>}
          {row.reviews && row.reviews.length > 0 && row.reviews[0].status === 'declined' && <span>Declined</span>}
        </div>
      ),
      sortable: false,
    }
  ];

  const final = [
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
      name: "STAGE",
      selector: (row) => row.reviews && row.reviews.length > 0 ? row.reviews[0].stage : "",
      sortable: true,
    },
    {
      name: "PPT",
      cell: (row) => (
        row.reviews && row.reviews.length > 0 ?
          <button onClick={() => handleDownload(row.reviews[0].fileId[0])}>Download</button>
          : ""
      ),
      sortable: true,
    },
    {
      name: "APPROVE STATUS",
      selector: (row) => row.reviews && row.reviews.length > 0 ? row.reviews[0].status : "",
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div>
          {row.reviews && row.reviews.length > 0 && row.reviews[0].status === 'pending' && (
            <>
              <button className="btn-approve" onClick={() => {}}>Approve</button>
              <button className="btn-decline" onClick={() => {}}>Decline</button>
            </>
          )}
          {row.reviews && row.reviews.length > 0 && row.reviews[0].status === 'approved' && <span>Approved</span>}
          {row.reviews && row.reviews.length > 0 && row.reviews[0].status === 'declined' && <span>Declined</span>}
        </div>
      ),
      sortable: false,
    }
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
          <AdminSidebar />
          <main className="content">
            <Topbar />
            <div style={{ maxWidth: '100%', overflowX: 'auto', margin:'20px'}}>
              <h2>LIST OF STUDENTS(PPT)</h2>
              <div style={{display: "flex", justifyContent: "left"}}>
                <input type="text" placeholder="Seach by Project" onChange={handleFilter} style={{padding: "6px 10px"}}/>
              </div>
              <br />
              <h3 style={{textAlign:'center', color:'#9E1C3F'}}>Zeroth Review</h3>
              <DataTable 
                columns={zero}
                data={data}
                customStyles={customStyles}
                pagination
                />
              <h3 style={{textAlign:'center', color:'#9E1C3F'}}>First Review</h3>
              <DataTable 
                columns={first}
                data={data}
                customStyles={customStyles}
                pagination
                />
              <h3 style={{textAlign:'center', color:'#9E1C3F'}}>Second Review</h3>
              <DataTable 
                columns={second}
                data={data}
                customStyles={customStyles}
                pagination
                />
              <h3 style={{textAlign:'center', color:'#9E1C3F'}}>Third Review</h3>
              <DataTable 
                columns={third}
                data={data}
                customStyles={customStyles}
                pagination
                />
              <h3 style={{textAlign:'center', color:'#9E1C3F'}}>Model Review</h3>
              <DataTable 
                columns={model}
                data={data}
                customStyles={customStyles}
                pagination
                />
              <h3 style={{textAlign:'center', color:'#9E1C3F'}}>Final Review</h3>
              <DataTable 
                columns={final}
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

export default DownloadPptAdmin;

