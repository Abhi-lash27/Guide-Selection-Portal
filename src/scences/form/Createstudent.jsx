import React, { useEffect } from "react";
import axios from "axios";

import { useState } from "react";
import './form.css';
import AdminSidebar from "../global/AdminSidebar";
import Topbar from "../global/Topbar";
import { ColorModeContext, useMode } from "../../theme";
import { CssBaseline, ThemeProvider } from "@mui/material";



const Createstudent = () => {
    const [theme, colorMode] = useMode();

    const [fullName, setFullName] = useState("");
    const [regNo, setRegNo] = useState("");
    const [email, setEmail] = useState("");
    const [batch, setBatch] = useState("");
    const [password, setPassword] = useState("");
    const [phoneNo, setPhoneNo] = useState("")

    const [token, setToken] = useState(null)

    useEffect(() => {
      const storedToken = localStorage.getItem('token');
      setToken(storedToken);
    }, [])

    async function Submit(event) {
      event.preventDefault();
    
      try {
        const response = await axios.post('http://localhost:7777/signup', {
          fullName,
          regNo,
          phoneNo,
          batch,
          email,
          password,
        }, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
        });
    
        if (response.data) {
          alert('Success');
        }
      } catch (error) {
        console.error('Error from create student :', error);
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
            <h1 className="h1-form">Create Student</h1>
            <fieldset>
                <form action="#" method="get">
                    <label htmlFor="fullName">Enter Name:</label>
                    <input
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        type="text"
                        name="fullName"
                        id="fullName"
                        placeholder="Enter Name"
                        required
                    />
                    <br />
                    <label htmlFor="regNo">Enter Register Number: </label>
                    <input
                        value={regNo}
                        onChange={(e) => setRegNo(e.target.value)}
                        type="text"
                        name="regNo"
                        id="regNo"
                        placeholder="Enter Register number"
                        required
                    />
                    <br />
                    <label htmlFor="regno">Enter Phone Number: </label>
                    <input
                        value={phoneNo}
                        onChange={(e) => setPhoneNo(e.target.value)}
                        type="text"
                        name="phoneNo"
                        id="phoneNo"
                        placeholder="Enter Phone number"
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
                    <label htmlFor="batch">Batch:</label>
                    <input
                        value={batch}
                        onChange={(e) => setBatch(e.target.value)}
                        type="text"
                        name="batch"
                        id="batch"
                        placeholder="Enter batch"
                        required
                    />
                    <br />
                    <button className="btn-form1" type="submit" value="Submit" onClick={Submit}>
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
  
  export default Createstudent;