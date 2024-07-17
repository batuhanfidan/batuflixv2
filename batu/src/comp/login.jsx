import React, { useState } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./login.css";
import { CiLogin } from "react-icons/ci";
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { useHistory } from "react-router-dom";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = {};

    if (!formData.email.trim()) {
      validationErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      validationErrors.email = "Email is invalid";
    }

    if (!formData.password.trim()) {
      validationErrors.password = "Password is required";
    } else if (formData.password.length < 5) {
      validationErrors.password = "Password is invalid";
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      if (
        formData.email === "damacana@hotmail.com" &&
        formData.password === "damacana123"
      ) {
        sendClick();
      } else {
        if (formData.email !== "damacana@hotmail.com") {
          toast.error("Incorrect email");
        }
        if (formData.password !== "damacana123") {
          toast.error("Incorrect password");
        }
      }
    } else {
      for (const error in validationErrors) {
        toast.error(validationErrors[error]);
      }
    }
  };

  let history = useHistory();

  const sendClick = () => {
    history.push("/users");
  };

  return (
    <>
      <div
        className="ne"
        style={{
          height: "100vh",
        }}
      >
        <div id="roots">
          <div className="camelCase">
            <img src="https://i.hizliresim.com/kvnl7ez.png" alt="" />
            <div style={{ width: "400px", height: "30rem" }}>
              <Form className="main-div" onSubmit={handleSubmit}>
                <FormGroup className="tepe">
                  <h1>Login</h1>
                  <CiLogin className="icons" />
                </FormGroup>
                <FormGroup className="nasiYani">
                  <Input
                    id="exampleEmail"
                    name="email"
                    placeholder="Email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  <FaUser className="icon" />
                </FormGroup>
                <FormGroup className="nasiYani">
                  <Input
                    id="examplePassword"
                    name="password"
                    placeholder="Password "
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <FaLock className="icon" />
                </FormGroup>
                <FormGroup className="alt">
                  <Button type="submit">Login</Button>
                  <a href="#" className="sign">
                    You want to join the Batuflix? Sign in!
                  </a>
                </FormGroup>
                <FormGroup check className="alt-takim">
                  <FormGroup className="remember">
                    <Input type="checkbox" /> <Label check> Remember me</Label>
                  </FormGroup>
                  <a href="#" className="forgotten">
                    Forgot Password?
                  </a>
                </FormGroup>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
