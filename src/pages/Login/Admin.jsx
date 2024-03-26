import React, { useState } from "react";
import '../Login/Login.css'
import user from "../../images/user.png";
import passwordImg from "../../images/password.png";
import Header from "../../components/common/heading/Header";
import { jwtDecode as jwt_decode } from "jwt-decode";
import axios from 'axios';
import {toast} from "react-toastify";

const Admin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function login(event) {
    event.preventDefault();

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/login/admin`, {
        email,
        password
      });

      const { token } = response.data;

      if (token) {
        localStorage.setItem('admin-token', token);
        const decodedToken = jwt_decode(token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        window.location.href = "/admin-dashboard";
        toast.success("Login Successful")
      } else {
        throw new Error('Token not found in response!');
      }

    } catch (error) {
      console.error("Login error:", error);
      // setError("Invalid email or password");
      toast.error("Invalid email or password");

    }
  }

  return (
    <div>
      <div className="body-login"></div>
      <Header />
      <div className="sec__one-login">
        <div className="form-login">
          <div className="header-login">
            <div className="text-login">Admin Login</div>
            <div className="underline-login"></div>
          </div>
          <form onSubmit={login}>
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
            {error && <div className="error-message">{error}</div>}
            <div className="submit-cont-login">
              <button type="submit" className="submit-login">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Admin;
