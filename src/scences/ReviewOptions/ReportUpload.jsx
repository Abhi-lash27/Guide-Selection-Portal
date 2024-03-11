import React, { useEffect, useState } from "react";
import { ColorModeContext, useMode } from "../../theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import "../../index.css";
import Topbar from "../global/Topbar";
import StudentSidebar from "../global/StudentSidebar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { tokens } from "../../theme";
import { Button, CardActions, Box } from "@mui/material";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import Stack from "@mui/material/Stack";
import { toast } from 'react-toastify';

import { jwtDecode as jwt_decode } from "jwt-decode";


import ReportCard from "../../components/ReportCard";
import FinalCard from  "../../components/FinalCard"
import axios from "axios";

const ReportUpload = () => {
  const [theme, colorMode] = useMode();
  const colors = tokens(theme.palette.mode);

  const [token, setToken] = useState(null)

  const [studentId, setStudentId] = useState(null)
  const [projectId, setProjectId] = useState(null);
  const [staffId, setStaffId] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if(!storedToken) {
      return window.location.href = "/"
    }

    const decodedToken = jwt_decode(storedToken)
    const studentId = decodedToken.id
    setStudentId(studentId)
    setToken(storedToken);

    if(storedToken) {
      fetchStudentData();
    }
  }, [token]);

  const fetchStudentData = async () => {
    try {
      const res = await axios.get(`http://localhost:7777/api/students/${studentId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });

      const projectId = res.data.projectId
      const staffId = res.data.project.staffId

      setProjectId(projectId)
      setStaffId(staffId)
    } catch (err) {
      console.log(err);
    }
  }

  const [fileId1, setFileId1] = useState(null);
  const [fileId2, setFileId2] = useState(null);
  const [fileId3, setFileId3] = useState(null);

  const handleFileId1 = (id) => {
    setFileId1(id);
  };

  const handleFileId2 = (id) => {
    setFileId2(id);
  };

  const handleFileId3 = (id) => {
    setFileId3(id)
  }

  const submitZero = async () => {
    try {

      const data = {
        fileId: [fileId1, fileId2],
        projectId: projectId,
        staffId: staffId,
        type: "report",
        stage: "zero"
      }

      const res = await axios.post(`http://localhost:7777/api/reviews`, data, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      })

      if(res.status >= 200 && res.status < 300) {
        return toast.success("Uploaded Succesfully")
        // return alert("Success")
      }

    } catch (err) {
      console.log("Error from report upload");
      toast.error("Error uploading document");
    }
  }

  const submitFirst = async () => {
    try {
      const data = {
        fileId: [fileId1, fileId2],
        projectId: projectId,
        staffId: staffId,
        type: "report",
        stage: "one"
      }

      const res = await axios.post(`http://localhost:7777/api/reviews`, data, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      })

      if(res.status >= 200 && res.status < 300) {
        return toast.success("Uploaded Succesfully")
        // return alert("Success")
      }

    } catch (err) {
      console.log("Error from report upload");
      toast.error("Error uploading document")
    }
  }

  const submitSecond = async () => {
    try {
      const data = {
        fileId: [fileId1, fileId2],
        projectId: projectId,
        staffId: staffId,
        type: "report",
        stage: "two"
      }

      const res = await axios.post(`http://localhost:7777/api/reviews`, data, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      })

      if(res.status >= 200 && res.status < 300) {
        return toast.success("Uploaded Succesfully")
        // return alert("Success")
      }

    } catch (err) {
      console.log("Error from report upload");
      toast.error("Error uploading document")
    }
  }

  const submitThird = async () => {
    try {
      const data = {
        fileId: [fileId1, fileId2],
        projectId: projectId,
        staffId: staffId,
        type: "report",
        stage: "three"
      }

      const res = await axios.post(`http://localhost:7777/api/reviews`, data, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      })

      if(res.status >= 200 && res.status < 300) {
        return toast.success("Uploaded Succesfully")
        // return alert("Success")
      }

    } catch (err) {
      console.log("Error from report upload");
      toast.error("Error uploading document")
    }
  }

  const submitModel = async () => {
    try {
      const data = {
        fileId: [fileId1, fileId2, fileId3],
        projectId: projectId,
        staffId: staffId,
        type: "report",
        stage: "model"
      }

      const res = await axios.post(`http://localhost:7777/api/reviews`, data, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      })

      if(res.status >= 200 && res.status < 300) {
        return toast.success("Uploaded Succesfully")
        // return alert("Success")
      }

    } catch (err) {
      console.log("Error from report upload");
      toast.error("Error uploading document")
    }
  }

  const submitFinal = async () => {
    try {
      const data = {
        fileId: [fileId1, fileId2, fileId3],
        projectId: projectId,
        staffId: staffId,
        type: "report",
        stage: "final"
      }

      const res = await axios.post(`http://localhost:7777/api/reviews`, data, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      })

      if(res.status >= 200 && res.status < 300) {
        return toast.success("Uploaded Succesfully")
        // return alert("Success")
      }

    } catch (err) {
      console.log("Error from report upload");
      toast.error("Error uploading document")
    }
  }

  const deleteZero = async () => {
    try {
      const res = await axios.delete(`http://localhost:7777/api/projects/${projectId}/reviews?stage=zero`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      })

      if(res.status === 200) {
      return toast.success("Deleted Succesfully")
      // return alert("deleted successfully")
      }

    } catch (err) {
      console.log("Error from delete");
      toast.error("Error deleting document")
    }
  }

  const deleteFirst = async () => {
    try {
      const res = await axios.delete(`http://localhost:7777/api/projects/${projectId}/reviews?stage=one`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      })

      if(res.status === 200) 
      {
        return toast.success("Deleted Succesfully")
        // return alert("deleted successfully")
      }

    } catch (err) {
      console.log("Error from delete");
      toast.error("Error deleting document")
    }
  }

  const deleteSecond = async () => {
    try {
      const res = await axios.delete(`http://localhost:7777/api/projects/${projectId}/reviews?stage=two`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      })

      if(res.status === 200){
        return toast.success("Deleted Succesfully")
        // return alert("deleted successfully")
      } 

    } catch (err) {
      console.log("Error from delete");
      toast.error("Error deleting document")
    }
  }

  const deleteThree = async () => {
    try {
      const res = await axios.delete(`http://localhost:7777/api/projects/${projectId}/reviews?stage=three`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      })

      if(res.status === 200){
        return toast.success("Deleted Succesfully")
        // return alert("deleted successfully")
      } 

    } catch (err) {
      console.log("Error from delete");
      toast.error("Error deleting document")
    }
  }

  const deleteModel = async () => {
    try {
      const res = await axios.delete(`http://localhost:7777/api/projects/${projectId}/reviews?stage=model`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      })

      if(res.status === 200){
        return toast.success("Deleted Succesfully")
        // return alert("deleted successfully")
      } 

    } catch (err) {
      console.log("Error from delete");
      toast.error("Error deleting document")
    }
  }

  const deleteFinal = async () => {
    try {
      const res = await axios.delete(`http://localhost:7777/api/projects/${projectId}/reviews?stage=final`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      })

      if(res.status === 200){
        return toast.success("Deleted Succesfully")
        // return alert("deleted successfully")
      } 

    } catch (err) {
      console.log("Error from delete");
      toast.error("Error deleting document")
    }
  }


  const downloadReviewForm = async () => {
    try {
      const res = await axios.get("http://localhost:7777/api/review-form", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: "blob", // This is important to indicate that the response is a binary blob
      });

      // Create a URL for the blob data
      const url = window.URL.createObjectURL(new Blob([res.data]));

      // Create a temporary anchor element
      const link = document.createElement("a");

      // Set the href attribute of the anchor to the blob URL
      link.href = url;

      // Specify the filename for the download
      link.setAttribute("download", "review_form.pdf");

      // Append the anchor to the document body
      document.body.appendChild(link);

      // Trigger a click event on the anchor
      link.click();

      // Remove the anchor from the document body after the download starts
      document.body.removeChild(link);
      toast.success("Downloaded Successfully")
    } catch (err) {
      console.log("error while downloading review form",err);
      toast.error("Error Downloading File")
    }
  };

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <StudentSidebar />
          <main className="content">
            <Topbar />
            <div>
              <Stack direction="row">
                <Card
                  sx={{
                    minWidth: 920,
                    mx: 10,
                    backgroundColor: colors.primary[400],
                    marginBottom: 5,
                  }}
                >
                  <CardContent>
                    <Box>
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        style={{
                          textAlign: "center",
                          paddingTop: 10,
                          fontSize: 24,
                        }}
                      >
                        UPLOAD FILES
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Stack>
              <Card
                    sx={{
                      maxWidth: 920,
                      mx: 10,
                      backgroundColor: colors.primary[400],
                      marginBottom: 5,
                    }}
                  >
                    <CardContent style={{ display: "inline-block" }}>
                      <Box>
                        <Typography
                          gutterBottom
                          variant="h5"
                          component="div"
                          sx={{ fontSize: 24 }}
                        >
                          Download Review Form
                        </Typography>
                      </Box>
                      <CardActions>
                        <Box>
                          <Button
                            onClick={downloadReviewForm}
                            size="small"
                            sx={{
                              color: colors.blueAccent[400],
                              border: 1,
                              marginRight: 5,
                            }}
                          >
                            <DownloadOutlinedIcon></DownloadOutlinedIcon>
                            Download
                          </Button>
                        </Box>
                      </CardActions>
                    </CardContent>
                  </Card>
              <Stack direction="row">
                <ReportCard name="0th Review" handleSubmit={submitZero} handleFileId1={handleFileId1} handleFileId2={handleFileId2} handleDeleteReview={deleteZero} />
                <ReportCard name="1st Review" handleSubmit={submitFirst} handleFileId1={handleFileId1} handleFileId2={handleFileId2} handleDeleteReview={deleteFirst}/>
              </Stack>
              <Stack direction="row">
                <ReportCard name="2nd Review" handleSubmit={submitSecond} handleFileId1={handleFileId1} handleFileId2={handleFileId2} handleDeleteReview={deleteSecond}/>
                <ReportCard name="3rd Review" handleSubmit={submitThird} handleFileId1={handleFileId1} handleFileId2={handleFileId2} handleDeleteReview={deleteThree}/>
              </Stack>
              <Stack direction="row">
                <FinalCard name="Model Review" handleSubmit={submitModel} handleFileId1={handleFileId1} handleFileId2={handleFileId2} handleFileId3={handleFileId3} handleDeleteReview={deleteModel}/>
                <FinalCard name="Final Review" handleSubmit={submitFinal} handleFileId1={handleFileId1} handleFileId2={handleFileId2} handleFileId3={handleFileId3} handleDeleteReview={deleteFinal} />
              </Stack>
            </div>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default ReportUpload;