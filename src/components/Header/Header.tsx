import "./Header.scss";
import logo from "../../../public/Logo.svg";

export const Header = () => {
  return (
    <header className="header">
      <a href="" className="header_logo">
        <img src={logo} alt="TestTask" className="header_logo-pic" />
      </a>

      <nav className="header_buttons">
        <a className="header_buttons-button" href="#users">
          Users
        </a>
        <a className="header_buttons-button" href="#post">
          Sign Up
        </a>
      </nav>
    </header>
  );
};
