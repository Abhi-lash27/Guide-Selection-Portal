import React from "react";
import { useState } from "react";
import './form.css';
import AdminSidebar from "../global/AdminSidebar";
import Topbar from "../global/Topbar";
import { ColorModeContext, useMode } from "../../theme";
import { CssBaseline, ThemeProvider } from "@mui/material";


const Createstaff = () => {
    const [theme, colorMode] = useMode();
  
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function Submit(event) {
      event.preventDefault()

      const res = await fetch(`http://localhost:7777/api/register-staff`, {
        method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
      })

      const data = await res.json()

      if(data) {
        alert("success")
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
                <form action="#" method="get">
                    <label for="name">Enter Name:</label>
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Enter Name"
                        required
                    />
                    <br />
                    <label for="email">Email ID:</label>
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
                    <label for="password">Password:</label>
                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        name="password"
                        id="tel"
                        placeholder="Enter password"
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
  
  export default Createstaff;