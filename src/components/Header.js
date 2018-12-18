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
        </div>
        <ul class="navbar-nav">
          <li class="nav-item">
            <a
              className="nav-link"
              target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/akalliokoski/christmas-on-fhir"
            >
              Github
            </a>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Header;
