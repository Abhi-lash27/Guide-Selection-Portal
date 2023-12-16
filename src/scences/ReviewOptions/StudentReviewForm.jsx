import React, { useState } from "react";
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
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { red } from "@mui/material/colors";
import Modal from "@mui/material/Modal";

const StudentReviewForm = () => {
  const [theme, colorMode] = useMode();
  const [upload, setUpload] = useState(false);
  const [update, setUpdate] = useState(false);
  const [del, setDel] = useState(false);

  const handleUpload = () => setUpload(true);
  const handleClose = () => setUpload(false);
  const handleUpdate = () => setUpdate(true);
  const closeUpdate = () => setUpdate(false);
  const handleDelete = () => setDel(true);
  const closeDelete = () => setDel(false);

  const colors = tokens(theme.palette.mode);
  const danger = red[500];

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
    p: 4,
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
              <Box
                sx={{
                  width: {
                    xs: 100,
                    sm: 200,
                    md: 300,
                    lg: 400,
                    xl: 500,
                  },
                }}
              >
                <Stack direction={{ xs: "column", sm: "row" }}>
                  <Card
                    sx={{
                      minWidth: 920,
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
                </Stack>
                <Stack direction={{ xs: "column", sm: "row" }}>
                  <Card
                    sx={{
                      minWidth: 380,
                      mx: 10,
                      backgroundColor: colors.primary[400],
                      marginBottom: 5,
                    }}
                  >
                    <CardContent>
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        sx={{ fontSize: 24 }}
                      >
                        0th Review
                      </Typography>

                      <CardActions>
                        <Box>
                          <Button
                            onClick={handleUpload}
                            size="small"
                            sx={{
                              color: colors.greenAccent[400],
                              border: 1,
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
                                }}
                              >
                                Select a file to upload
                              </Typography>
                              <input type="file" />
                              <br />
                              <button
                                type="submit"
                                style={{ marginRight: 5, marginTop: 5 }}
                              >
                                Submit
                              </button>
                              <button
                                type="button"
                                style={{ backgroundColor: "red" }}
                                onClick={handleClose}
                              >
                                Cancel
                              </button>
                            </Box>
                          </Modal>
                          <Button
                            onClick={handleUpdate}
                            size="small"
                            sx={{
                              color: colors.blueAccent[400],
                              border: 1,
                              mx: 2,
                            }}
                          >
                            <FileUploadOutlinedIcon></FileUploadOutlinedIcon>
                            Update
                          </Button>
                          <Modal
                            open={update}
                            onClose={closeUpdate}
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
                                }}
                              >
                                Select a file to Update
                              </Typography>
                              <input type="file" />
                              <br />
                              <button
                                type="submit"
                                style={{ marginRight: 5, marginTop: 5 }}
                              >
                                Submit
                              </button>
                              <button
                                type="button"
                                style={{ backgroundColor: "red" }}
                                onClick={closeUpdate}
                              >
                                Cancel
                              </button>
                            </Box>
                          </Modal>
                          <Button
                            onClick={handleDelete}
                            onClose={closeDelete}
                            size="small"
                            sx={{
                              color: danger,
                              border: 1,
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
                                  justifyContent: "flex-start",
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
                                type="submit"
                                style={{
                                  marginRight: 5,
                                  marginTop: 5,
                                  backgroundColor: "red",
                                }}
                              >
                                Delete
                              </button>
                              <button
                                type="button"
                                style={{ backgroundColor: "green" }}
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

                  <Card
                    sx={{
                      minWidth: 380,
                      mx: 10,
                      backgroundColor: colors.primary[400],
                      marginBottom: 5,
                    }}
                  >
                    <CardContent>
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        sx={{ fontSize: 24 }}
                      >
                        1st Review
                      </Typography>

                      <CardActions>
                        <Box>
                          <Button
                            onClick={handleUpload}
                            size="small"
                            sx={{
                              color: colors.greenAccent[400],
                              border: 1,
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
                                }}
                              >
                                Select a file to upload
                              </Typography>
                              <input type="file" />
                              <br />
                              <button
                                type="submit"
                                style={{ marginRight: 5, marginTop: 5 }}
                              >
                                Submit
                              </button>
                              <button
                                type="button"
                                style={{ backgroundColor: "red" }}
                                onClick={handleClose}
                              >
                                Cancel
                              </button>
                            </Box>
                          </Modal>
                          <Button
                            onClick={handleUpdate}
                            size="small"
                            sx={{
                              color: colors.blueAccent[400],
                              border: 1,
                              mx: 2,
                            }}
                          >
                            <FileUploadOutlinedIcon></FileUploadOutlinedIcon>
                            Update
                          </Button>
                          <Modal
                            open={update}
                            onClose={closeUpdate}
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
                                }}
                              >
                                Select a file to Update
                              </Typography>
                              <input type="file" />
                              <br />
                              <button
                                type="submit"
                                style={{ marginRight: 5, marginTop: 5 }}
                              >
                                Submit
                              </button>
                              <button
                                type="button"
                                style={{ backgroundColor: "red" }}
                                onClick={closeUpdate}
                              >
                                Cancel
                              </button>
                            </Box>
                          </Modal>
                          <Button
                            onClick={handleDelete}
                            size="small"
                            sx={{
                              color: danger,
                              border: 1,
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
                                  justifyContent: "flex-start",
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
                                type="submit"
                                style={{
                                  marginRight: 5,
                                  marginTop: 5,
                                  backgroundColor: "red",
                                }}
                              >
                                Delete
                              </button>
                              <button
                                type="button"
                                style={{ backgroundColor: "green" }}
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
                </Stack>
                <Stack direction={{ xs: "column", sm: "row" }}>
                  <Card
                    sx={{
                      minWidth: 380,
                      mx: 10,
                      backgroundColor: colors.primary[400],
                      marginBottom: 5,
                    }}
                  >
                    <CardContent>
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        sx={{ fontSize: 24 }}
                      >
                        2nd Review
                      </Typography>

                      <CardActions>
                        <Box>
                          <Button
                            onClick={handleUpload}
                            size="small"
                            sx={{
                              color: colors.greenAccent[400],
                              border: 1,
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
                                }}
                              >
                                Select a file to upload
                              </Typography>
                              <input type="file" />
                              <br />
                              <button
                                type="submit"
                                style={{ marginRight: 5, marginTop: 5 }}
                              >
                                Submit
                              </button>
                              <button
                                type="button"
                                style={{ backgroundColor: "red" }}
                                onClick={handleClose}
                              >
                                Cancel
                              </button>
                            </Box>
                          </Modal>
                          <Button
                            onClick={handleUpdate}
                            size="small"
                            sx={{
                              color: colors.blueAccent[400],
                              border: 1,
                              mx: 2,
                            }}
                          >
                            <FileUploadOutlinedIcon></FileUploadOutlinedIcon>
                            Update
                          </Button>
                          <Modal
                            open={update}
                            onClose={closeUpdate}
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
                                }}
                              >
                                Select a file to Update
                              </Typography>
                              <input type="file" />
                              <br />
                              <button
                                type="submit"
                                style={{ marginRight: 5, marginTop: 5 }}
                              >
                                Submit
                              </button>
                              <button
                                type="button"
                                style={{ backgroundColor: "red" }}
                                onClick={closeUpdate}
                              >
                                Cancel
                              </button>
                            </Box>
                          </Modal>
                          <Button
                            onClick={handleDelete}
                            size="small"
                            sx={{
                              color: danger,
                              border: 1,
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
                                  justifyContent: "flex-start",
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
                                type="submit"
                                style={{
                                  marginRight: 5,
                                  marginTop: 5,
                                  backgroundColor: "red",
                                }}
                              >
                                Delete
                              </button>
                              <button
                                type="button"
                                style={{ backgroundColor: "green" }}
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

                  <Card
                    sx={{
                      minWidth: 380,
                      mx: 10,
                      backgroundColor: colors.primary[400],
                      marginBottom: 5,
                    }}
                  >
                    <CardContent>
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        sx={{ fontSize: 24 }}
                      >
                        3rd Review
                      </Typography>

                      <CardActions>
                        <Box>
                          <Button
                            onClick={handleUpload}
                            size="small"
                            sx={{
                              color: colors.greenAccent[400],
                              border: 1,
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
                                }}
                              >
                                Select a file to upload
                              </Typography>
                              <input type="file" />
                              <br />
                              <button
                                type="submit"
                                style={{ marginRight: 5, marginTop: 5 }}
                              >
                                Submit
                              </button>
                              <button
                                type="button"
                                style={{ backgroundColor: "red" }}
                                onClick={handleClose}
                              >
                                Cancel
                              </button>
                            </Box>
                          </Modal>
                          <Button
                            onClick={handleUpdate}
                            size="small"
                            sx={{
                              color: colors.blueAccent[400],
                              border: 1,
                              mx: 2,
                            }}
                          >
                            <FileUploadOutlinedIcon></FileUploadOutlinedIcon>
                            Update
                          </Button>
                          <Modal
                            open={update}
                            onClose={closeUpdate}
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
                                }}
                              >
                                Select a file to Update
                              </Typography>
                              <input type="file" />
                              <br />
                              <button
                                type="submit"
                                style={{ marginRight: 5, marginTop: 5 }}
                              >
                                Submit
                              </button>
                              <button
                                type="button"
                                style={{ backgroundColor: "red" }}
                                onClick={closeUpdate}
                              >
                                Cancel
                              </button>
                            </Box>
                          </Modal>
                          <Button
                            onClick={handleDelete}
                            size="small"
                            sx={{
                              color: danger,
                              border: 1,
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
                                  justifyContent: "flex-start",
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
                                type="submit"
                                style={{
                                  marginRight: 5,
                                  marginTop: 5,
                                  backgroundColor: "red",
                                }}
                              >
                                Delete
                              </button>
                              <button
                                type="button"
                                style={{ backgroundColor: "green" }}
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
                </Stack>
                <Stack direction={{ xs: "column", sm: "row" }}>
                  <Card
                    sx={{
                      minWidth: 380,
                      mx: 10,
                      backgroundColor: colors.primary[400],
                      marginBottom: 5,
                    }}
                  >
                    <CardContent>
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        sx={{ fontSize: 24 }}
                      >
                        Model Review
                      </Typography>

                      <CardActions>
                        <Box>
                          <Button
                            onClick={handleUpload}
                            size="small"
                            sx={{
                              color: colors.greenAccent[400],
                              border: 1,
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
                                }}
                              >
                                Select a file to upload
                              </Typography>
                              <input type="file" />
                              <br />
                              <button
                                type="submit"
                                style={{ marginRight: 5, marginTop: 5 }}
                              >
                                Submit
                              </button>
                              <button
                                type="button"
                                style={{ backgroundColor: "red" }}
                                onClick={handleClose}
                              >
                                Cancel
                              </button>
                            </Box>
                          </Modal>
                          <Button
                            onClick={handleUpdate}
                            size="small"
                            sx={{
                              color: colors.blueAccent[400],
                              border: 1,
                              mx: 2,
                            }}
                          >
                            <FileUploadOutlinedIcon></FileUploadOutlinedIcon>
                            Update
                          </Button>
                          <Modal
                            open={update}
                            onClose={closeUpdate}
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
                                }}
                              >
                                Select a file to Update
                              </Typography>
                              <input type="file" />
                              <br />
                              <button
                                type="submit"
                                style={{ marginRight: 5, marginTop: 5 }}
                              >
                                Submit
                              </button>
                              <button
                                type="button"
                                style={{ backgroundColor: "red" }}
                                onClick={closeUpdate}
                              >
                                Cancel
                              </button>
                            </Box>
                          </Modal>
                          <Button
                            onClick={handleDelete}
                            size="small"
                            sx={{
                              color: danger,
                              border: 1,
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
                                  justifyContent: "flex-start",
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
                                type="submit"
                                style={{
                                  marginRight: 5,
                                  marginTop: 5,
                                  backgroundColor: "red",
                                }}
                              >
                                Delete
                              </button>
                              <button
                                type="button"
                                style={{ backgroundColor: "green" }}
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

                  <Card
                    sx={{
                      minWidth: 380,
                      mx: 10,
                      backgroundColor: colors.primary[400],
                      marginBottom: 5,
                    }}
                  >
                    <CardContent>
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        sx={{ fontSize: 24 }}
                      >
                        Final Review
                      </Typography>

                      <CardActions>
                        <Box>
                          <Button
                            onClick={handleUpload}
                            size="small"
                            sx={{
                              color: colors.greenAccent[400],
                              border: 1,
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
                                }}
                              >
                                Select a file to upload
                              </Typography>
                              <input type="file" />
                              <br />
                              <button
                                type="submit"
                                style={{ marginRight: 5, marginTop: 5 }}
                              >
                                Submit
                              </button>
                              <button
                                type="button"
                                style={{ backgroundColor: "red" }}
                                onClick={handleClose}
                              >
                                Cancel
                              </button>
                            </Box>
                          </Modal>
                          <Button
                            onClick={handleUpdate}
                            size="small"
                            sx={{
                              color: colors.blueAccent[400],
                              border: 1,
                              mx: 2,
                            }}
                          >
                            <FileUploadOutlinedIcon></FileUploadOutlinedIcon>
                            Update
                          </Button>
                          <Modal
                            open={update}
                            onClose={closeUpdate}
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
                                }}
                              >
                                Select a file to Update
                              </Typography>
                              <input type="file" />
                              <br />
                              <button
                                type="submit"
                                style={{ marginRight: 5, marginTop: 5 }}
                              >
                                Submit
                              </button>
                              <button
                                type="button"
                                style={{ backgroundColor: "red" }}
                                onClick={closeUpdate}
                              >
                                Cancel
                              </button>
                            </Box>
                          </Modal>
                          <Button
                            onClick={handleDelete}
                            size="small"
                            sx={{
                              color: danger,
                              border: 1,
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
                                  justifyContent: "flex-start",
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
                                type="submit"
                                style={{
                                  marginRight: 5,
                                  marginTop: 5,
                                  backgroundColor: "red",
                                }}
                              >
                                Delete
                              </button>
                              <button
                                type="button"
                                style={{ backgroundColor: "green" }}
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
                </Stack>
              </Box>
            </div>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default StudentReviewForm;
