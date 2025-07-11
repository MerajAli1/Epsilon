import { Container, Row, Col, Form, Button, InputGroup } from "react-bootstrap";
import login from "../../assets/login.png";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Header from "../../components/Navbar";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://emsbackend-eight.vercel.app/api/user/signin",
        {
          UserId: email,
          Password: password,
        }
      );

      const { message, token, user } = res.data;

      if (message === "Signin successful") {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        // Redirect based on service
        switch (user.Service) {
          case "EMS":
            navigate("/emsuser");
            break;
          case "EMS (IR)":
            navigate("/emsir");
            break;
          case "Automation":
            navigate("/automation");
            break;
          case "EMS + EMS(IR)":
            navigate("/emsAndEmsir");
            break;
          case "EMS + EMS(IR) + Automation":
            navigate("/emsAndEmsirAutomation");
            break;
          case "Automation(HD)":
            navigate("/automationhd");
            break;
          case "IR":
            navigate("/ir");
            break;
        }
      } else {
        alert("Invalid login response.");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert(err.response?.data?.message || "An error occurred during login.");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <Header />
      <Container
        fluid
        style={{ minHeight: "100vh", backgroundColor: "#f7f7f7" }}
      >
        <Row className="align-items-center" style={{ minHeight: "100vh" }}>
          <Col md={6} className="p-5">
            <h2 className="mb-4">Login</h2>
            <Form onSubmit={handleLogin}>
              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <InputGroup>
                  <Form.Control
                    type="Text"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <InputGroup.Text>
                    <i className="bi bi-info-circle"></i>
                  </InputGroup.Text>
                </InputGroup>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <InputGroup>
                  <Form.Control
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <InputGroup.Text
                    onClick={togglePasswordVisibility}
                    style={{ cursor: "pointer" }}
                  >
                    <i
                      className={`bi ${
                        showPassword ? "bi-eye" : "bi-eye-slash"
                      }`}
                    ></i>
                  </InputGroup.Text>
                </InputGroup>
              </Form.Group>

              <div className="d-flex justify-content-between align-items-center">
                <Button
                  variant="primary"
                  type="submit"
                  className="px-4 rounded-pill w-50"
                >
                  Login
                </Button>
                <Link
                  to={"/changePassword"}
                  style={{ color: "#007bff", textDecoration: "none" }}
                >
                  Forget password?
                </Link>
              </div>
            </Form>
          </Col>

          <Col md={6} className="text-center p-4">
            <img
              width={"60%"}
              src={login}
              alt="Not Found"
              className="img-fluid"
            />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default LoginPage;
