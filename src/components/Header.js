import React, { Component } from "react";

class Header extends Component {
  render() {
    return (
      <nav className="navbar navbar-default">
        <div className="navbar-header">
          <a
            className="navbar-brand"
            href="https://akalliokoski.github.io/christmas-on-fhir"
          >
            Christmas on FHIR
          </a>
        </div>
        <a
          className="nav-link"
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/akalliokoski/christmas-on-fhir"
        >
          Github
        </a>
      </nav>
    );
  }
}

export default Header;
