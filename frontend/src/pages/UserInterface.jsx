import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Col, Row, Container, Button } from "react-bootstrap";
//components
import UserDetails from "@user/UserDetails";
import SavedCartSelect from "@user/SavedCartSelect";
// Auth Provider
import { useAuth } from "@provider/AuthProvider";

export default function UserInterface() {
  const [userInfo, setUserInfo] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // import from AuthProvider
  const { isAuthenticated, checkAuthentication, fetchUserInfo, handleLogout } =
    useAuth();

  // collect user data from backend, if jwt is correct
  const fetchUserData = async () => {
    const token = localStorage.getItem("token");
    try {
      const result = await fetchUserInfo(token);
      setUserInfo(result);
    } catch (error) {
      setError(error.message);
      setTimeout(() => setError(""), 5000);
    }
  };

  // validate JWT of user, if missing send to /login, if valid, fetch user data.
  useEffect(() => {
    const checkAuth = async () => {
      const isAuthenticated = await checkAuthentication();
      if (!isAuthenticated) {
        navigate("/login");
      } else {
        fetchUserData();
      }
    };
    checkAuth();
  }, []);

  return (
    <>
      <Container className="p-4">
        {userInfo ? (
          <Container className="mb-5">
            <Row>
              {/* users greetings + name from DB */}
              <Col>
                <div>
                  <h2 className="text-center fs-1">
                    Välkommen, {userInfo.name}
                  </h2>
                </div>
              </Col>
            </Row>

            <Row>
              {/* users saved carts display & restore */}
              <Col md={8} className="mt-4">
                <SavedCartSelect user={userInfo} />
              </Col>

              {/* users button -> pop-modul to view or change saved address / logout btn */}
              <Col md={4} className="mt-4 text-center">
                <h6 className="fs-5">
                  <strong>Inställningar - Konto</strong>
                </h6>
                <div className="mt-2 mb-4 d-flex justify-content-center">
                  <UserDetails user={userInfo} />
                  <Button
                    variant="outline-danger"
                    onClick={() => handleLogout()}
                    className="ms-2"
                  >
                    Logga Ut
                  </Button>
                </div>
              </Col>
            </Row>
          </Container>
        ) : (
          <Container>
            <Row>
              <Col>
                <p>Loading user information!</p>
              </Col>
            </Row>
          </Container>
        )}
        {/*       Display error message if user is not verified for this route! 
        Access is restriced with private-route and checkAuth function but just to be sure. */}
        {error && (
          <Container>
            <Row>
              <Col>
                <p className="text-danger">Error: {error}</p>
              </Col>
            </Row>
          </Container>
        )}
      </Container>
    </>
  );
}
