import React from "react";
import Header from "../../components/common/heading/Header";
import '../register/Register.css'


const Register = () =>  {
  return (
    <div>
        <div className="body-register"></div>
        <Header />
      <div className="Form-register">
        <div className="content1-register">
          <h2>Registration Form</h2>
          <br />
          <div className="coloumn-register">
            <label>Name:</label>
            <br />
            <input className="field-register"
              type="text"
              name="name"
              id="name"
              placeholder="Enter name"
              required
            />
            <br />
            <br />
            <label>Register Number:</label>
            <br />
            <input className="field-register"
              type="text"
              name="regno"
              id="regno"
              placeholder="Enter Regno"
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
              name="email"
              id="email"
              placeholder="Enter Mail Id"
              required
            />
            <br />
            <br />
            <label>Batch:</label>
            <br />
            <input className="field-register"
              type="text"
              name="batch"
              id="batch"
              placeholder="Enter your Batch"
              required
            />
            <br />
            <br />
            <label>Password:</label>
            <br />
            <input className="field-register"
              type="password"
              name="batch"
              id="batch"
              placeholder="Enter your Batch"
              required
            />
            <br />
          </div>
          <button type="submit" value="submit" className="btn-register">
            REGISTER
          </button>
        </div>
      </div>
      </div>
  );
}

export default Register