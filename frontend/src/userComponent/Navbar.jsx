import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

const Header = ({ onExportPdf }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <Navbar className="sticky-top bg-white">
      <Container>
        <h1 className="display-5">Epsilon EMS</h1>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            <button
              onClick={onExportPdf} // <--- CALL THE PASSED FUNCTION
              className="btn btn-primary me-2"
            >
              Export Data
            </button>
            <button
              className="btn btn-outline-secondary"
              onClick={handleLogout}
            >
              Logout
            </button>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
