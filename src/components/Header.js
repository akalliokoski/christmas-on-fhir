import React, { Component } from "react";

class Header extends Component {
  render() {
    return (
      <nav className="navbar navbar-dark bg-primary">
        <div className="navbar-header">
          <a
            className="navbar-brand"
            href="https://akalliokoski.github.io/christmas-on-fhir"
          >
            Christmas on FHIR
          </a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            role="button"
            href="http://hapi.fhir.org/"
            className="btn btn-secondary"
          >
            Use FHIR
          </a>
        </div>

        <ul className="navbar-nav">
          <li className="nav-item">
            <a
              className="nav-link"
              target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/akalliokoski/christmas-on-fhir"
            >
              GitHub
            </a>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Header;
