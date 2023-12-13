import React, { useState } from "react";
import basestyle from "../Base.module.css";
import loginstyle from "./Login.module.css";
import axios from "axios";
import { useNavigate, NavLink } from "react-router-dom";

const Login = ({ setUserState }) => {
  const navigate = useNavigate();
  const [user, setUserDetails] = useState({
    email: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setUserDetails({
      ...user,
      [name]: value,
    });
  };

  const validateForm = (values) => {
    const regex = /^[^\s+@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.email) {
      alert("Email is required");
    } else if (!regex.test(values.email)) {
      alert("Please enter a valid email address");
    }
    if (!values.password) {
      alert("Password is required");
    }
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    validateForm(user);

    if (Object.keys(formErrors).length === 0) {
      try {
        const response = await axios.post("http://localhost:9002/login", user);
        alert(response.data.message);
        setUserState(response.data.user);
        navigate("/", { replace: true });
      } catch (error) {
        alert(error.response?.data?.message || "An error occurred");
      }
    }
  };

  return (
    <div className={loginstyle.login}>
      <form>
        <h1>Login</h1>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          onChange={changeHandler}
          value={user.email}
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          onChange={changeHandler}
          value={user.password}
        />
        <button className={basestyle.button_common} onClick={loginHandler}>
          Login
        </button>
      </form>
      <NavLink to="/signup">Register Now</NavLink>
    </div>
  );
};

export default Login;
