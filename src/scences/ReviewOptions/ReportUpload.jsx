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

import ReportCard from "../../components/ReportCard";
import FinalCard from  "../../components/FinalCard"

const ReportUpload = () => {
  const [theme, colorMode] = useMode();
  const colors = tokens(theme.palette.mode);
  const danger = red[500];

  const [upload, setUpload] = useState(false);
  const [update, setUpdate] = useState(false);
  const [del, setDel] = useState(false);

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
                <ReportCard name="0th Review"/>
                <ReportCard name="1st Review"/>
              </Stack>
              <Stack direction="row">
                <ReportCard name="2nd Review"/>
                <ReportCard name="3rd Review"/>
              </Stack>
              <Stack direction="row">
                <FinalCard name="Model Review" />
                <FinalCard name="Final Review" />
              </Stack>
            </div>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default ReportUpload;