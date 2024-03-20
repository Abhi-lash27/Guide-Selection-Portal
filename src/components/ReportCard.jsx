import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { tokens, useMode } from "../theme";
import { Button, CardActions, Box } from "@mui/material";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { red } from "@mui/material/colors";
import Modal from "@mui/material/Modal";
import axios from "axios";
import {toast} from "react-toastify"


const ReportCard = ({ name, handleSubmit, handleFileId1, handleFileId2, handleDeleteReview }) => {

  const [theme, colorMode] = useMode();
  const colors = tokens(theme.palette.mode);
  const danger = red[500];

  const [upload, setUpload] = useState(false);
  const [update, setUpdate] = useState(false);
  const [del, setDel] = useState(false);

  const [file1, setFile1] = useState(null);
  const [file2, setFile2] = useState(null);

  const [id1, setId1] = useState(null)
  const [id2, setId2] = useState(null)

  const [token, setToken] = useState(null)

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if(!storedToken) {
      return window.location.href = "/"
    }
    setToken(storedToken);
  }, [])

  const handleFileChange1 = (event) => {
    setFile1(event.target.files[0]);
  };

  const handleFileChange2 = (event) => {
    setFile2(event.target.files[0]);
  };

  const handleFileUpload1 = async () => {
    try {
      const formData = new FormData();
      formData.append("data", file1);
      formData.append("type", "pdf")

      const res = await axios.post(`http://localhost:7777/api/files`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      })


      const fileId = res.data.id;

      setId1(fileId)

      handleFileId1(fileId)

      if(res.status === 200) {
        setId1(null)

        return alert("Pdf uploaded")
        // toast.success("Pdf Uploaded")
      }

      setUpload(false);
    } catch (error) {
      toast.error("Error Uploading Pdf")
      console.error("Error uploading files: ", error);
    }
  };

  const handleFileUpload2 = async () => {
    try {
      const formData = new FormData();
      formData.append("data", file2);
      formData.append("type", "ppt")

      const res = await axios.post(`http://localhost:7777/api/files`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      })

      const fileId = res.data.id

      setId2(fileId)

      handleFileId2(fileId)

      if(res.status === 200) {
        setId2(null)

        return alert("PPT uploaded")
        // toast.success("PPT Uploaded")
      }

      setUpload(false);
    } catch (error) {
      console.error("Error uploading files: ", error);
      toast.error("Error Uploading PPT")
    }
  };

  const handleUpload = () => setUpload(true);
  const handleClose = () => setUpload(false);
  const handleUpdate = () => setUpdate(true);
  const closeUpdate = () => setUpdate(false);
  const handleDelete = () => setDel(true);
  const closeDelete = () => setDel(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "white",
    color: "black",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4
  };
  return (
    <Card
      sx={{
        minWidth: 380,
        mx: 10,
        backgroundColor: colors.primary[400],
        marginBottom: 5
      }}
    >
      <CardContent>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={{ fontSize: 24 }}
        >
          {name}
        </Typography>

        <CardActions>
          <Box>
            <Button
              onClick={handleUpload}
              size="small"
              sx={{
                color: colors.greenAccent[400],
                border: 1
              }}
            >
              <FileUploadOutlinedIcon></FileUploadOutlinedIcon>
              Upload
            </Button>
            <Modal
              open={upload}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography
                  id="modal-modal-title"
                  variant="h4"
                  component="h2"
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    fontStyle: "bold",
                    textTransform: "uppercase"
                  }}
                >
                  Upload files
                </Typography>
                <br />
                <Typography
                  style={{
                    fontSize: "16px"
                  }}
                >Review form</Typography>
                <input type="file" onChange={handleFileChange1} />
                <button
                  onClick={handleFileUpload1}
                  type="submit"
                  style={{
                    backgroundColor: "rgba(69,83,147,0.73)",
                    color: "white",
                    marginTop: "3px",
                    borderRadius: "5px"
                  }}
                >Upload File
                </button>
                <br /> <br />
                <Typography
                  style={{
                    fontSize: "16px"
                  }}
                >PPT</Typography>
                <input type="file" onChange={handleFileChange2} />
                <button
                  onClick={handleFileUpload2}
                  type="submit"
                  style={{
                    backgroundColor: "rgba(69,83,147,0.73)",
                    color: "white",
                    marginTop: "3px",
                    borderRadius: "5px"
                  }}
                >Upload File
                </button>
                <br />
                <button
                  onClick={handleSubmit}
                  type="submit"
                  style={{ marginRight: 5, marginTop: 5, backgroundColor: "green", color: "white" }}
                >
                  Submit
                </button>
                <button
                  type="button"
                  style={{ backgroundColor: "red", color: "white" }}
                  onClick={handleClose}
                >
                  Cancel
                </button>
              </Box>
            </Modal>
            {/*<Button*/}
            {/*  onClick={handleUpdate}*/}
            {/*  size="small"*/}
            {/*  sx={{*/}
            {/*    color: colors.blueAccent[400],*/}
            {/*    border: 1,*/}
            {/*    mx: 2*/}
            {/*  }}*/}
            {/*>*/}
            {/*  <FileUploadOutlinedIcon></FileUploadOutlinedIcon>*/}
            {/*  Update*/}
            {/*</Button>*/}
            {/*<Modal*/}
            {/*  open={update}*/}
            {/*  onClose={closeUpdate}*/}
            {/*  aria-labelledby="modal-modal-title"*/}
            {/*  aria-describedby="modal-modal-description"*/}
            {/*>*/}
            {/*  <Box sx={style}>*/}
            {/*    <Typography*/}
            {/*      id="modal-modal-title"*/}
            {/*      variant="h4"*/}
            {/*      component="h2"*/}
            {/*      style={{*/}
            {/*        display: "flex",*/}
            {/*        justifyContent: "flex-start"*/}
            {/*      }}*/}
            {/*    >*/}
            {/*      Update Files*/}
            {/*    </Typography>*/}
            {/*    <br />*/}
            {/*    <Typography*/}
            {/*      style={{*/}
            {/*        fontSize: "16px"*/}
            {/*      }}*/}
            {/*    >Review form</Typography>*/}
            {/*    <input type="file" />*/}
            {/*    <br /> <br />*/}
            {/*    <Typography*/}
            {/*      style={{*/}
            {/*        fontSize: "16px"*/}
            {/*      }}*/}
            {/*    >PPT</Typography>*/}
            {/*    <input type="file" />*/}
            {/*    <br />*/}
            {/*    <button*/}
            {/*      type="submit"*/}
            {/*      style={{ marginRight: 5, marginTop: 5, backgroundColor: "green", color: "white" }}*/}
            {/*    >*/}
            {/*      Submit*/}
            {/*    </button>*/}
            {/*    <button*/}
            {/*      type="button"*/}
            {/*      style={{ backgroundColor: "red", color: "white" }}*/}
            {/*      onClick={closeUpdate}*/}
            {/*    >*/}
            {/*      Cancel*/}
            {/*    </button>*/}
            {/*  </Box>*/}
            {/*</Modal>*/}
            <Button
              onClick={handleDelete}
              size="small"
              sx={{
                color: danger,
                border: 1,
                mx: 2
              }}
            >
              <DeleteOutlineIcon></DeleteOutlineIcon>
              Delete
            </Button>
            <Modal
              open={del}
              onClose={closeDelete}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography
                  id="modal-modal-title"
                  variant="h4"
                  component="h2"
                  style={{
                    display: "flex",
                    justifyContent: "flex-start"
                  }}
                >
                  DELETE
                </Typography>
                <Typography
                  id="modal-modal-description"
                  variant="h5"
                  component="h4"
                >
                  Are you sure to delete the file??
                </Typography>
                <br />
                <button
                  onClick={handleDeleteReview}
                  type="submit"
                  style={{
                    marginRight: 5,
                    marginTop: 5,
                    backgroundColor: "red",
                    color: "white"
                  }}
                >
                  Delete
                </button>
                <button
                  type="button"
                  style={{ backgroundColor: "green", color: "white" }}
                  onClick={closeDelete}
                >
                  Cancel
                </button>
              </Box>
            </Modal>
          </Box>
        </CardActions>
      </CardContent>
    </Card>
  );
};

export default ReportCard;