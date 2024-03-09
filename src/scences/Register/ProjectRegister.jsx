import React from "react";
import { useState } from "react";
import StaffSidebar from "../global/StaffSidebar";
import Topbar from "../global/Topbar";
import { ColorModeContext, useMode } from "../../theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import StudentSidebar from "../global/StudentSidebar";
import SearchableDropdown from "../../components/common/SearchableDropdown";



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
      const options = [
        {  label: '41120001' },
        {  label: '41120002' },
        {  label: '41120003' },
        {  label: '41120004' },
        {  label: '41120005' },
        {  label: '41120008' },
        {  label: '41120007' },
      ];
      const [guide, setGuide] = useState("");

    const [name, setName] = useState("");
    const [regno,setRegno] = useState("");
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
        <div className="forms-container" style={{marginRight: "20%", marginLeft: "20%"}}>
            <div className="form" >
                <h1 className="h1-form">REGISTER PROJECT</h1>
                <form >
                  <h2>Enter Details</h2>
                    <label htmlFor="regno">Select Your Register Number: </label>
                    {/* <input
                        value={regno}
                        onChange={(e) => setRegno(e.target.value)}
                        type="text"
                        name="regno"
                        id="regno"
                        placeholder="Enter Register number"
                        required
                    /> */}
                    <SearchableDropdown options={options} />
                    <label htmlFor="regno">Select Team- Register Number: </label>
                    {/* <input
                        value={regno}
                        onChange={(e) => setRegno(e.target.value)}
                        type="text"
                        name="regno"
                        id="regno"
                        placeholder="Enter Register number"
                        required
                    /> */}
                    <SearchableDropdown options={options} />
                </form>
            </div>
            <div className="form">
                <h1 className="h1-form">PROJECT DETAILS</h1>
                <form>
                    <label htmlFor="title">Project Title:</label>
                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        type="text"
                        name="title"
                        id="title"
                        placeholder="Enter your Project Title"
                        required
                    />
                    <label htmlFor="guide">Select Guide:</label>
                    <select
                        id="guide"
                        value={guide}
                        onChange={(e) => setGuide(e.target.value)}
                        required
                    >
                        <option value="">Select Guide</option>
                        {Guide.map((guide) => (
                            <option key={guide} value={guide}>
                                {guide}
                            </option>
                        ))}
                    </select>
                    <button className="btn-form1" type="submit" onClick={Submit}>
                    Submit
                    </button>
                </form>
            </div>
            
        </div>
    </main>
</div>

        </ThemeProvider>
      </ColorModeContext.Provider>
    );
  };
  
  export default Createstudent;