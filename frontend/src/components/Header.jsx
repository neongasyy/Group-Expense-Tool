import { Dropdown, Navbar } from "react-bootstrap";
import { BoxArrowRight, PersonCircle } from "react-bootstrap-icons";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <Navbar className="header px-4 py-3">
      <div className="ms-auto">
        <Dropdown align="end">
          <Dropdown.Toggle
            variant="link"
            className="header-dropdown-toggle text-decoration-none d-flex align-items-center gap-2"
            id="user-dropdown"
          >
            <span>Welcome, Dummy username here</span>
          </Dropdown.Toggle>

          <Dropdown.Menu className="header-dropdown-menu">
            <Dropdown.Item className="header-dropdown-item d-flex align-items-center gap-2">
              <BoxArrowRight size={18} />
              Logout
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </Navbar>
  );
};

export default Header;
