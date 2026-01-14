import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { Card, Col, Row, Button, Form, Spinner, Alert } from "react-bootstrap";
import logo from "../assets/images/cash.png";
import { BASE_URL } from "../../constants";

axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";

const LoginScreen = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);

    const emailPattern =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    setIsValidEmail(emailPattern.test(value));
  };

  const onLogin = async (e) => {
    e.preventDefault();

    if (!isValidEmail) {
      setMessage("Please enter a valid email address");
      return;
    }

    try {
      setIsLoading(true);
      await axios.post(`${BASE_URL}/login`,
        { email, passwordHash: password },
        { withCredentials: false }
      );
      navigate("/dashboard");
      localStorage.setItem("uid", res.data.uid);
    } catch (error) {
      setMessage("Invalid email or password");
      setIsLoading(false);
    }
  };

  return (
    <Row className="justify-content-center mt-5">
      <Col md={6} lg={4}>
        <Card className="p-4 shadow-sm">
          <div className="text-center mb-4">
            <img src={logo} alt="logo" height="90" />
          </div>

          {message && <Alert variant="danger">{message}</Alert>}

          <Form onSubmit={onLogin}>
            <Form.Group className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="example@email.com"
                value={email}
                onChange={handleEmailChange}
                isInvalid={!isValidEmail && email !== ""}
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <div className="d-flex justify-content-between">
                <Form.Label>Password</Form.Label>
                <Button
                  variant="link"
                  className="p-0"
                  onClick={() => navigate("/forgotpassword")}
                >
                  Forgot password?
                </Button>
              </div>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <div className="d-grid mt-4">
              <Button type="submit" variant="primary" disabled={isLoading}>
                {isLoading ? (
                  <Spinner size="sm" animation="border" />
                ) : (
                  "Sign in"
                )}
              </Button>
            </div>
          </Form>

          <div className="text-center mt-3">
            Not a member?{" "}
            <Link to="/signup" className="fw-semibold">
              Sign up
            </Link>
          </div>
        </Card>
      </Col>
    </Row>
  );
};

export default LoginScreen;
