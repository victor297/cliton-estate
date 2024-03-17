import { NavbarStyle } from "./navbarStyles";

import { useNavigate } from "react-router-dom";

import Logo from "../../assets/common/clinton_logo_original.svg";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <NavbarStyle>
      <div className="company-logo" onClick={() => navigate("/")}>
        <img src={Logo} alt="" style={{ width: "130px" }} />
      </div>
      <p>Log in</p>
    </NavbarStyle>
  );
};

export default Navbar;
