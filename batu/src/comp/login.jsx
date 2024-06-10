import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import "./login.css";
import { CiLogin } from "react-icons/ci";
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";

export default function Login() {
  return (
    <>
      <div className="camelCase">
        <img src="/src/assets/image/bf.png" alt="" />
        <div style={{ width: "400px", height: "30rem" }}>
          <Form className="main-div">
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
              />
              <FaUser className="icon" />
            </FormGroup>
            <FormGroup className="nasiYani">
              <Input
                id="examplePassword"
                name="password"
                placeholder="Password "
                type="password"
              />
              <FaLock className="icon" />
            </FormGroup>

            <Button>Submit</Button>
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
    </>
  );
}
