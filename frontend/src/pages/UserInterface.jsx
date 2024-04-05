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
        <Row>
          <Col>
            <div className="d-flex justify-content-end mt-2 mb-4">
              <Button variant="outline-danger" onClick={() => handleLogout()}>
                Logga Ut
              </Button>
            </div>
          </Col>
        </Row>
        {userInfo ? (
          <Container>
            <Row>
              <Col>
                <div>
                  <h2 className="text-center">Välkommen, {userInfo.name}</h2>
                </div>
              </Col>
            </Row>

            <Row>
              <Col md={8} className="mt-4">
                {/* users saved carts display & restore */}
                <SavedCartSelect user={userInfo} />
              </Col>
              <Col md={4} className="mt-4 d-flex justify-content-end">
                <div>
                  {/* users button -> pop-modul to view or change saved address */}
                  <h6>Användaruppgifter</h6>
                  <UserDetails user={userInfo} />
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
