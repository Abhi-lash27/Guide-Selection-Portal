import React from "react";
import '../Login/Login.css'
import user from "../../images/user.png"
import { useState } from "react"
import passwordImg from "../../images/password.png";
import Header from "../../components/common/heading/Header";

const Staff = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  async function Login(event) {
    event.preventDefault();

    const res = await fetch(`http://localhost:7777/api/login-staff`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    console.log(res);
    const data = await res.json();
    console.log(data);
    if (data) {
      alert("success");
      window.location.href = "/staff-dashboard";
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
            <div className="text-login">Staff Login</div>
            <div className="underline-login"></div>
          </div>
          <form>
            <div className="inputs-login">
              <div className="input-login">
                <img src={user} alt="" />
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="Email Address"
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
            <div className="submit-cont-login">
              <div onClick={Login} className="submit-login">
                Login
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Staff;
