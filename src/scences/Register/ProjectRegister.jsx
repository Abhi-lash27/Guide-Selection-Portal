import React from "react";
import { useState } from "react";
import StaffSidebar from "../global/StaffSidebar";
import Topbar from "../global/Topbar";
import { ColorModeContext, useMode } from "../../theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import StudentSidebar from "../global/StudentSidebar";



const Createstudent = () => {
    const [theme, colorMode] = useMode();
    const Guide = [
        "Dr.R.Subhashini",
        "Dr.S.Revathy",
        "Dr.P.Jeyanthi",
        "Dr.L.Mary Gladence",
        "Ms.C.Geetha",
        "Ms.D.Ramalakshmi",
        "Ms.J.Merlin Mary Jenitha",
        "Dr.Rajasekar",
        "Dr.K.Sundaravel Rani",
        "Dr.A.Sathiyaraj",
        "Dr.Kamtchi K S",
        "Dr.D.Adhimuga Sivasakthi",
        "Ms. T G Ruby Angel",
        "Ms.Sageengrana",
        "Mr.R.Ravi Karthick",
      ];
      const [guide, updateGuide] = useState("");

    const [name, setName] = useState("");
    const [regno, setRegno] = useState("");
    const [email, setEmail] = useState("");
    const [title, setTitle] = useState("");

    async function Submit(event) {
      event.preventDefault()

      const res = await fetch(`http://localhost:7777/api/register-student`, {
        method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        name,
        regno,
        batch,
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
            <StudentSidebar />
            <main className="content">
            <Topbar />
            <div className="FORM">
            <h1 className="h1-form">REGISTER PROJECT</h1>
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
                    <label for="regno">Enter Register Number: </label>
                    <input
                        value={regno}
                        onChange={(e) => setRegno(e.target.value)}
                        type="text"
                        name="regno"
                        id="regno"
                        placeholder="Enter Register number"
                        required
                    />
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
                    <label for="regno">Enter Register Number: </label>
                    <input
                        value={regno}
                        onChange={(e) => setRegno(e.target.value)}
                        type="text"
                        name="regno"
                        id="regno"
                        placeholder="Enter Register number"
                        required
                    />
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
                    <label for="title">Project Title:</label>
                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        type="text"
                        name="title"
                        id="title"
                        placeholder="Enter your Project Title"
                        required
                    />
                    <label>Select Guide:</label>
                    <select
                    id="guide"
                    value={guide}
                    onChange={(e) => updateGuide(e.target.value)}
                    required
                    >
                    <option />
                    {Guide.map((guide) => (
                        <option key={guide} value={guide}>
                        {guide}
                        </option>
                    ))}
                    </select>
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