import React, { useEffect } from "react";
import { useState } from "react";
import './form.css';
import AdminSidebar from "../global/AdminSidebar";
import Topbar from "../global/Topbar";
import { ColorModeContext, useMode } from "../../theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import axios from 'axios';
import {toast} from "react-toastify"

const Createstaff = () => {
  const [theme, colorMode] = useMode();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [specializations, setSpecializations] = useState("");
  const [profileImg, setProfileImg] = useState(null);

  const [token, setToken] = useState(null)

  useEffect(() => {
    const storedToken = localStorage.getItem('admin-token');
    setToken(storedToken);
  }, [])

  async function Submit(event) {
    event.preventDefault();

    const formData = new FormData();
    formData.append("fullName", fullName);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("specializations", specializations);
    formData.append("profileImg", profileImg);

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/staffs`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`
      }
    });

    if (res.data.staff) {
      // alert("Staff created successfully");
      toast.success("Staff created successfully")
      // Reset form fields
      setFullName("");
      setEmail("");
      setPassword("");
      setSpecializations("");
      setProfileImg(null);
    }
  } catch (error) {
    console.error("Error:", error);
    // alert("Failed to create staff");
    toast.error("Error Creating Staff")
  }
}

return (
  <ColorModeContext.Provider value={colorMode}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="app">
        <AdminSidebar />
        <main className="content">
          <Topbar />
          <div className="FORM">
            <h1 className="h1-form">Create Staff</h1>
            <fieldset>
              <form onSubmit={Submit}>
                <label htmlFor="fullName">Enter Full Name:</label>
                <input
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  type="text"
                  name="fullName"
                  id="fullName"
                  placeholder="Enter Full Name"
                  required
                />
                <br />
                <label htmlFor="email">Email ID:</label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter Email"
                  required
                />
                <br />
                <label htmlFor="specializations">Enter Specializations:</label>
                <input
                  value={specializations}
                  onChange={(e) => setSpecializations(e.target.value)}
                  type="text"
                  name="specializations"
                  id="specializations"
                  placeholder="AI, ML, DL"
                  required
                />
                <br />
                <label htmlFor="password">Password:</label>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Enter Password"
                  required
                />
                <br />
                <label htmlFor="profileImg">Profile Image:</label>
                <input
                  type="file"
                  onChange={(e) => setProfileImg(e.target.files[0])}
                  name="profileImg"
                  id="profileImg"
                  accept="image/*"
                  required
                />
                <br />
                <button className="btn-form1" type="submit">
                  Submit
                </button>
              </form>
            </fieldset>
          </div>
        </main>
      </div>
    </ThemeProvider>
  </ColorModeContext.Provider>
);
};

export default Createstaff;