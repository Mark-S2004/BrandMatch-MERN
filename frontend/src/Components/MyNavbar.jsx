import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"
import { Link } from "react-router-dom"

const MyNavbar = ({ loggedInUser, setLoggedInUser }) => {
  const logoutOnClick = () => {
    setLoggedInUser(null)
  }

  return (
    <>
      <Navbar sticky="top" className="bg-black" data-bs-theme="dark">
        <Container>
          <Navbar.Brand as={Link} to={"/"}>
            <img
              src="src/assets/images/Logo Name.svg"
              width="150"
              height="50"
              className="d-inline-block align-top"
              alt="Logo"
            ></img>
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to={"/"}>
              Home
            </Nav.Link>
            <Nav.Link as={Link} to={"/users"}>
              users
            </Nav.Link>
          </Nav>
          {loggedInUser ? (
            <button className="text-white/75" onClick={logoutOnClick}>
              Logout
            </button>
          ) : (
            <Link
              to={"/login"}
              className="btn btn-danger btn-lg"
              href="https://example.com"
            >
              Login
            </Link>
          )}
        </Container>
      </Navbar>
    </>
  )
}

export default MyNavbar
