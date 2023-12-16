import React from "react";
import { useState } from "react";
import '../Login/Login.css'
import user from "../../images/user.png";
import passwordImg from "../../images/password.png";
import Header from "../../components/common/heading/Header";

const Student = () => {
  const [regno, setRegno] = useState();
  const [password, setPassword] = useState();

  async function Login(event) {
    event.preventDefault();

    const res = await fetch(`http://localhost:7777/api/login-student`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        regno,
        password,
      }),
    });
    console.log(res);
    const data = await res.json();
    console.log(data);
    if (data.token) {
      alert("success");
      window.location.href = "/student-dashboard";
    } else {
      alert("error");
    }

    // console.log(data);
  }

  return (
    <div>
    <div className="body-login"></div>
      <Header />
      <div className="sec__one-login">
        <div className="form-login">
          <div className="header-login">
            <div className="text-login">Student Login</div>
            <div className="underline-login"></div>
          </div>
          <form>
            <div className="inputs-login">
              <div className="input-login">
                <img src={user} alt="" />
                <input
                  value={regno}
                  onChange={(e) => setRegno(e.target.value)}
                  type="text"
                  placeholder="Register Number"
                  required
                />
              </div>
              <div className="input-login">
                <img src={passwordImg} alt="" />
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  placeholder="Password"
                  required
                />
              </div>
            </div>
            <div className="forgot-pass-login">
              Forgot Password?<span>Click Here</span>
            </div>
            <div onClick={Login} className="submit-cont-login">
              <div className="submit-login">Login</div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Student;
