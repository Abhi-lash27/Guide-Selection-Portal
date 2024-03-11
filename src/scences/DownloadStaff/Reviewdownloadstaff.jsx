import React, { useEffect, useState } from "react";
import { ColorModeContext, useMode } from "../../theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Topbar from "../global/Topbar";
import StaffSidebar from "../global/StaffSidebar";
import DataTable from "react-data-table-component";
import axios from "axios";
import { jwtDecode as jwt_decode } from "jwt-decode";
import * as ReactBootStrap from "react-bootstrap";

const DownloadReviewStaff = () => {
  const [theme, colorMode] = useMode();
  const [data, setData] = useState();
  const [token, setToken] = useState(null)
  const [loading, setLoading] =  useState(false);

  const [zeroData, setZeroData] = useState('');
  const [firstData, setFirstData] = useState('');
  const [secondData, setSecondData] = useState('');
  const [thirdData, setThirdData] = useState('');
  const [modelData, setModelData] = useState('');
  const [finalData, setFinalData] = useState('');


  const fetchAllStudentsZero = async () => {
    try {
      const storedToken = localStorage.getItem('staff-token');
      const decodedToken = jwt_decode(storedToken)
      // console.log(decodedToken.id);

      const staffId = decodedToken.id

      const res = await axios.get(`http://localhost:7777/api/projects/${staffId}/reviews?stage=zero`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${storedToken}`
        }
      });
      setLoading(true)
      const responseData = res.data
      setZeroData(responseData.projects)
    } catch (err) {
      console.log(err);
    }
  };

  const fetchAllStudentsFirst = async () => {
    try {
      const storedToken = localStorage.getItem('staff-token');
      const decodedToken = jwt_decode(storedToken)
      // console.log(decodedToken.id);

      const staffId = decodedToken.id

      const res = await axios.get(`http://localhost:7777/api/projects/${staffId}/reviews?stage=one`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${storedToken}`
        }
      });
      setLoading(true)
      const responseData = res.data
      setFirstData(responseData.projects)
    } catch (err) {
      console.log(err);
    }
  };

  const fetchAllStudentsSecond = async () => {
    try {
      const storedToken = localStorage.getItem('staff-token');
      const decodedToken = jwt_decode(storedToken)
      // console.log(decodedToken.id);

      const staffId = decodedToken.id

      const res = await axios.get(`http://localhost:7777/api/projects/${staffId}/reviews?stage=two`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${storedToken}`
        }
      });
      setLoading(true)
      const responseData = res.data
      setSecondData(responseData.projects)
    } catch (err) {
      console.log(err);
    }
  };

  const fetchAllStudentsThird = async () => {
    try {
      const storedToken = localStorage.getItem('staff-token');
      const decodedToken = jwt_decode(storedToken)
      // console.log(decodedToken.id);

      const staffId = decodedToken.id

      const res = await axios.get(`http://localhost:7777/api/projects/${staffId}/reviews?stage=three`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${storedToken}`
        }
      });
      setLoading(true)
      const responseData = res.data
      setThirdData(responseData.projects)
    } catch (err) {
      console.log(err);
    }
  };

  const fetchAllStudentsModel = async () => {
    try {
      const storedToken = localStorage.getItem('staff-token');
      const decodedToken = jwt_decode(storedToken)
      // console.log(decodedToken.id);

      const staffId = decodedToken.id

      const res = await axios.get(`http://localhost:7777/api/projects/${staffId}/reviews?stage=model`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${storedToken}`
        }
      });
      setLoading(true)
      const responseData = res.data
      setModelData(responseData.projects)
    } catch (err) {
      console.log(err);
    }
  };

  const fetchAllStudentsFinal = async () => {
    try {
      const storedToken = localStorage.getItem('staff-token');
      const decodedToken = jwt_decode(storedToken)
      // console.log(decodedToken.id);

      const staffId = decodedToken.id

      const res = await axios.get(`http://localhost:7777/api/projects/${staffId}/reviews?stage=final`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${storedToken}`
        }
      });
      setLoading(true)
      const responseData = res.data
      setFinalData(responseData.projects)
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    const storedToken = localStorage.getItem('staff-token');
    if (!storedToken) {
      window.location.href = "/";
      return;
    }

    setToken(storedToken);
    fetchAllStudentsZero();
    fetchAllStudentsFirst()
    fetchAllStudentsSecond()
    fetchAllStudentsThird()
    fetchAllStudentsModel()
    fetchAllStudentsFinal()
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
      link.setAttribute('download', 'review.pdf'); // you can set file name here
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error('Error downloading file:', error);
    }
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

  const zeroth = [
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
      name: "REVIEW",
      cell: (row) => (
        row.reviews && row.reviews.length > 0 ?
          <button onClick={() => handleDownload(row.reviews[0].fileId[0])}>Download</button>
          : ""
      ),
      sortable: true,
    },
    // {
    //   name: "APPROVE STATUS",
    //   selector: (row) => row.reviews && row.reviews.length > 0 ? row.reviews[0].status : "",
    //   sortable: true,
    // },
    // {
    //   name: "Actions",
    //   cell: (row) => (
    //     <div>
    //       {row.reviews && row.reviews.length > 0 && row.reviews[0].status === 'pending' && (
    //         <>
    //           <button className="btn-approve" onClick={() => {}}>Approve</button>
    //           <button className="btn-decline" onClick={() => {}}>Decline</button>
    //         </>
    //       )}
    //       {row.reviews && row.reviews.length > 0 && row.reviews[0].status === 'approved' && <span>Approved</span>}
    //       {row.reviews && row.reviews.length > 0 && row.reviews[0].status === 'declined' && <span>Declined</span>}
    //     </div>
    //   ),
    //   sortable: false,
    // }
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
      name: "REVIEW",
      cell: (row) => (
        row.reviews && row.reviews.length > 0 ?
          <button onClick={() => handleDownload(row.reviews[0].fileId[0])}>Download</button>
          : ""
      ),
      sortable: true,
    },
    // {
    //   name: "APPROVE STATUS",
    //   selector: (row) => row.reviews && row.reviews.length > 0 ? row.reviews[0].status : "",
    //   sortable: true,
    // },
    // {
    //   name: "Actions",
    //   cell: (row) => (
    //     <div>
    //       {row.reviews && row.reviews.length > 0 && row.reviews[0].status === 'pending' && (
    //         <>
    //           <button className="btn-approve" onClick={() => {}}>Approve</button>
    //           <button className="btn-decline" onClick={() => {}}>Decline</button>
    //         </>
    //       )}
    //       {row.reviews && row.reviews.length > 0 && row.reviews[0].status === 'approved' && <span>Approved</span>}
    //       {row.reviews && row.reviews.length > 0 && row.reviews[0].status === 'declined' && <span>Declined</span>}
    //     </div>
    //   ),
    //   sortable: false,
    // }
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
      name: "REVIEW",
      cell: (row) => (
        row.reviews && row.reviews.length > 0 ?
          <button onClick={() => handleDownload(row.reviews[0].fileId[0])}>Download</button>
          : ""
      ),
      sortable: true,
    },
    // {
    //   name: "APPROVE STATUS",
    //   selector: (row) => row.reviews && row.reviews.length > 0 ? row.reviews[0].status : "",
    //   sortable: true,
    // },
    // {
    //   name: "Actions",
    //   cell: (row) => (
    //     <div>
    //       {row.reviews && row.reviews.length > 0 && row.reviews[0].status === 'pending' && (
    //         <>
    //           <button className="btn-approve" onClick={() => {}}>Approve</button>
    //           <button className="btn-decline" onClick={() => {}}>Decline</button>
    //         </>
    //       )}
    //       {row.reviews && row.reviews.length > 0 && row.reviews[0].status === 'approved' && <span>Approved</span>}
    //       {row.reviews && row.reviews.length > 0 && row.reviews[0].status === 'declined' && <span>Declined</span>}
    //     </div>
    //   ),
    //   sortable: false,
    // }
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
      name: "REVIEW",
      cell: (row) => (
        row.reviews && row.reviews.length > 0 ?
          <button onClick={() => handleDownload(row.reviews[0].fileId[0])}>Download</button>
          : ""
      ),
      sortable: true,
    },
    // {
    //   name: "APPROVE STATUS",
    //   selector: (row) => row.reviews && row.reviews.length > 0 ? row.reviews[0].status : "",
    //   sortable: true,
    // },
    // {
    //   name: "Actions",
    //   cell: (row) => (
    //     <div>
    //       {row.reviews && row.reviews.length > 0 && row.reviews[0].status === 'pending' && (
    //         <>
    //           <button className="btn-approve" onClick={() => {}}>Approve</button>
    //           <button className="btn-decline" onClick={() => {}}>Decline</button>
    //         </>
    //       )}
    //       {row.reviews && row.reviews.length > 0 && row.reviews[0].status === 'approved' && <span>Approved</span>}
    //       {row.reviews && row.reviews.length > 0 && row.reviews[0].status === 'declined' && <span>Declined</span>}
    //     </div>
    //   ),
    //   sortable: false,
    // }
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
      name: "REVIEW",
      cell: (row) => (
        row.reviews && row.reviews.length > 0 ?
          <button onClick={() => handleDownload(row.reviews[0].fileId[0])}>Download</button>
          : ""
      ),
      sortable: true,
    },
    // {
    //   name: "APPROVE STATUS",
    //   selector: (row) => row.reviews && row.reviews.length > 0 ? row.reviews[0].status : "",
    //   sortable: true,
    // },
    // {
    //   name: "Actions",
    //   cell: (row) => (
    //     <div>
    //       {row.reviews && row.reviews.length > 0 && row.reviews[0].status === 'pending' && (
    //         <>
    //           <button className="btn-approve" onClick={() => {}}>Approve</button>
    //           <button className="btn-decline" onClick={() => {}}>Decline</button>
    //         </>
    //       )}
    //       {row.reviews && row.reviews.length > 0 && row.reviews[0].status === 'approved' && <span>Approved</span>}
    //       {row.reviews && row.reviews.length > 0 && row.reviews[0].status === 'declined' && <span>Declined</span>}
    //     </div>
    //   ),
    //   sortable: false,
    // }
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
      name: "REVIEW",
      cell: (row) => (
        row.reviews && row.reviews.length > 0 ?
          <button onClick={() => handleDownload(row.reviews[0].fileId[0])}>Download</button>
          : ""
      ),
      sortable: true,
    },
    // {
    //   name: "APPROVE STATUS",
    //   selector: (row) => row.reviews && row.reviews.length > 0 ? row.reviews[0].status : "",
    //   sortable: true,
    // },
    // {
    //   name: "Actions",
    //   cell: (row) => (
    //     <div>
    //       {row.reviews && row.reviews.length > 0 && row.reviews[0].status === 'pending' && (
    //         <>
    //           <button className="btn-approve" onClick={() => {}}>Approve</button>
    //           <button className="btn-decline" onClick={() => {}}>Decline</button>
    //         </>
    //       )}
    //       {row.reviews && row.reviews.length > 0 && row.reviews[0].status === 'approved' && <span>Approved</span>}
    //       {row.reviews && row.reviews.length > 0 && row.reviews[0].status === 'declined' && <span>Declined</span>}
    //     </div>
    //   ),
    //   sortable: false,
    // }
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
              <br />
              <h2>LIST OF STUDENTS</h2>
              <div style={{display: "flex", justifyContent: "left"}}>
                <input type="text" placeholder="Seach by Project" onChange={handleFilter} style={{padding: "6px 10px"}}/>
              </div>
              <br />
              {loading ? 
              <>
              <h3 style={{textAlign:'center', color:'#9E1C3F'}}>Zeroth Review</h3>
              <DataTable
                columns={zeroth}
                data={zeroData}
                customStyles={customStyles}
                pagination
              /> 
              <h3 style={{textAlign:'center', color:'#9E1C3F'}}>First Review</h3>
              <DataTable 
                columns={first}
                data={firstData}
                customStyles={customStyles}
                pagination
              />
              
              <h3 style={{textAlign:'center', color:'#9E1C3F'}}>Second Review</h3>
              <DataTable 
                columns={second}
                data={secondData}
                customStyles={customStyles}
                pagination
              />
              <h3 style={{textAlign:'center', color:'#9E1C3F'}}>Third Review</h3>
              <DataTable 
                columns={third}
                data={thirdData}
                customStyles={customStyles}
                pagination
              />
              <h3 style={{textAlign:'center', color:'#9E1C3F'}}>Model Review</h3>
              <DataTable 
                columns={model}
                data={modelData}
                customStyles={customStyles}
                pagination
              />
              <h3 style={{textAlign:'center', color:'#9E1C3F'}}>Final Review</h3>
              <DataTable 
                columns={final}
                data={finalData}
                customStyles={customStyles}
                pagination
              />
              </>
              :
              <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}> 
              <ReactBootStrap.Spinner animation="border"/>
              </div>}
              
            </div>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default DownloadReviewStaff;