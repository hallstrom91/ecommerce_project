import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FloatingLabel,
  Form,
  Stack,
  Button,
  Col,
  Row,
  Container,
  Card,
} from "react-bootstrap";

/* JWT AUTH */
import { useAuth } from "@provider/AuthProvider";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // call function to register user
  const { handleRegistration } = useAuth();
  const navigate = useNavigate();

  const handleRegisterClick = async () => {
    try {
      // confirm password check
      if (password !== confirmPassword) {
        setError("Lösenorden matchar inte.");
        setTimeout(() => setError("", 5000));
      }
      // collect & send all values to context-api function
      const response = await handleRegistration(
        name,
        username,
        password,
        email,
        address,
        city,
        postalCode
      );
      // clear all input-fields at success
      setName("");
      setUsername("");
      setPassword("");
      setEmail("");
      setAddress("");
      setCity("");
      setPostalCode("");
      // success message
      setSuccessMsg("Registrering lyckad. Avvakta så skickar vi dig rätt.");
      setTimeout(() => setSuccessMsg(""), 5000);
      // send user to /login after successfull registration
      const redirectToLogin = setTimeout(() => {
        navigate("/login");
      }, 5500);
    } catch (error) {
      // show dynamic error message
      setError(error.message);
      setTimeout(() => setError(""), 5000);
    }
  };

  return (
    <>
      {/* User Register Input Field */}
      <Container className="p-4">
        <Row className="d-flex justify-content-center">
          <Col md={8}>
            {/* Register Card */}
            <Card className="text-black shadow-lg">
              <Card.Header className="border-0  text-center list-group-header">
                <strong className="text-center text-white">
                  Skapa ett Konto
                </strong>
              </Card.Header>
              <Card.Body>
                {/* User Legal/Full Name Input Field */}
                <Form>
                  <Form.Floating className="mb-3">
                    <Form.Control
                      id="registerFullName"
                      type="text"
                      placeholder="Legal_Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      autoComplete="name"
                    />
                    <label htmlFor="registerFullName">Fullständigt Namn</label>
                  </Form.Floating>

                  {/* User Username Input Field */}
                  <Form.Floating className="mb-3">
                    <Form.Control
                      id="registerUsername"
                      type="text"
                      autoComplete="username"
                      placeholder="Username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                    <label htmlFor="registerUsername">Användarnamn</label>
                  </Form.Floating>

                  {/* User email Input Field */}
                  <Form.Floating className="mb-3">
                    <Form.Control
                      id="registerEmail"
                      type="email"
                      placeholder="Email"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <label htmlFor="registerEmail">Email</label>
                  </Form.Floating>

                  <Stack direction="horizontal" gap={3}>
                    {/* User Password Input Field */}
                    <Form.Floating className="mb-3 w-50">
                      <Form.Control
                        id="registerPassword"
                        type={showPassword ? "text" : "password"}
                        autoComplete="current-password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <label htmlFor="registerPassword">Lösenord</label>
                    </Form.Floating>

                    {/* User Password Input Field */}
                    <Form.Floating className="mb-3 w-50">
                      <Form.Control
                        id="registerConfirmPassword"
                        type={showPassword ? "text" : "password"}
                        autoComplete="current-password"
                        placeholder="ConfirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                      <label htmlFor="registerConfirmPassword">
                        Bekräfta Lösenord
                      </label>
                    </Form.Floating>
                  </Stack>
                  {/* User Adress Input Field */}

                  <Form.Floating className="mb-3 w-100">
                    <Form.Control
                      id="registerAddress"
                      type="text"
                      placeholder="Address"
                      autoComplete="address-line1"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="fs-6"
                    />
                    <label htmlFor="registerAddress">Gatunamn</label>
                  </Form.Floating>
                  <Stack direction="horizontal" gap={2}>
                    {/* User City Input Field */}

                    <Form.Floating className="mb-3 w-100">
                      <Form.Control
                        id="registerCity"
                        type="text"
                        placeholder="City"
                        autoComplete="address-level2"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                      />
                      <label htmlFor="registerCity">Stad</label>
                    </Form.Floating>

                    {/* User Postal Code Input Field */}

                    <Form.Floating className="mb-3 w-50">
                      <Form.Control
                        id="registerPostalCode"
                        type="text"
                        placeholder="Postal_Code"
                        autoComplete="postal-code"
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                      />
                      <label htmlFor="registerPostalCode">Postkod</label>
                    </Form.Floating>
                  </Stack>
                </Form>
                {/* checkbox toggle password show */}
                <Form.Check
                  id="showPasswordRegister"
                  type="checkbox"
                  label="Visa lösenord"
                  className="m-2 text-white fw-bold"
                  onChange={() => setShowPassword(!showPassword)}
                />
                <div className="px-2">
                  <Button
                    className="border-2 border-black"
                    variant="success"
                    type="submit"
                    onClick={() => handleRegisterClick()}
                  >
                    Skicka
                  </Button>
                </div>
                <div className="mt-4 mx-4">
                  <p className="text-start fs-5 text-white">
                    Minimilängden på lösenord är 8 tecken, måste innehålla:
                  </p>
                  <ul className="fs-6 text-white">
                    <li>En liten bokstav</li>
                    <li>En stor bokstav</li>
                    <li>En siffra (0-9)</li>
                    <li>Ett specialtecken bland dessa @$!%*?&#</li>
                  </ul>
                </div>
                {/* Switch to Login Form - Button */}
                <Card.Text className="text-end fs-5 fw-bold text-white">
                  Redan medlem?
                </Card.Text>
                <div className="d-flex mb-4 justify-content-end">
                  <Button variant="outline-dark" as={Link} to="/login">
                    Logga In
                  </Button>
                </div>
              </Card.Body>
              {/* Registration Form Submit Button */}
              {/* Dynamic Error & Success Messages Display */}
              <Card.Footer className="border-0 list-group-header py-5">
                {successMsg && (
                  <p className="text-white">
                    {successMsg}
                    <span className="text-success">!</span>
                  </p>
                )}
                {error && (
                  <p className="text-white">
                    {error}
                    <span className="text-danger">!</span>
                  </p>
                )}
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
