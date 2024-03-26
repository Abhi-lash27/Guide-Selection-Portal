import React, { useState } from "react";
import Header from "../../components/common/heading/Header";
import "../register/Register.css";
import axios from "axios";
import {toast} from "react-toastify"


const Register = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [regNo, setRegNo] = useState("");
  const [batch, setBatch] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/signup`, {
        fullName,
        email,
        phoneNo,
        batch,
        regNo,
        password
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (res.data) {
        // alert('Success');
        toast.success("Registration Success")
      }

    } catch (e) {
      console.log("Error in registration");
      toast.error("Error in Registration");
    }
  }

  return (
    <div>
      <div className="body-register"></div>
      <Header />
      <div className="sec__one-login">
      <div className="Form-register">
        <form onSubmit={handleSubmit}>
          <div className="content1-register">
            <h2>Registration Form</h2>
            <br />
            <div className="coloumn-register">
              <label>Name:</label>
              <br />
              <input className="field-register"
                     type="text"
                     value={fullName}
                     onChange={(e) => setFullName(e.target.value)}
                     name="fullName"
                     id="fullName"
                     placeholder="Enter Full Name"
                     required
              />
              <br />
              <br />
              <label>Register Number:</label>
              <br />
              <input className="field-register"
                     type="text"
                     value={regNo}
                     onChange={(e) => setRegNo(e.target.value)}
                     name="regNo"
                     id="regNo"
                     placeholder="Enter Register Number"
                     required
                     minLength="8"
                     maxLength="8"
              />
              <br />
              <br />
              <label>Email ID:</label>
              <br />
              <input className="field-register"
                     type="email"
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                     name="email"
                     id="email"
                     placeholder="Enter Mail Id"
                     required
              />
              <br />
              <br />
              <label>Phone No:</label>
              <br />
              <input className="field-register"
                     type="text"
                     value={phoneNo}
                     onChange={(e) => setPhoneNo(e.target.value)}
                     name="phoneNo"
                     id="phoneNo"
                     placeholder="Enter Phone Number"
                     required
              />
              <br />
              <br />
              <label>Batch:</label>
              <br />
              <input className="field-register"
                     type="text"
                     value={batch}
                     onChange={(e) => setBatch(e.target.value)}
                     name="batch"
                     id="batch"
                     placeholder="Eg: 2021-2025"
                     required
              />
              <br />
              <br />
              <label>Password:</label>
              <br />
              <input className="field-register"
                     type="password"
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}
                     name="batch"
                     id="batch"
                     placeholder="Enter Password"
                     required
              />
              <br />
            </div>
            <button type="submit" value="submit" className="btn-register">
              REGISTER
            </button>
          </div>
        </form>
        </div>
      </div>
    </div>
  );
};

export default Register;