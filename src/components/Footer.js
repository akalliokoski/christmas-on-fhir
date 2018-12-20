import React, { Component } from "react";

class Footer extends Component {
  render() {
    return (
      <footer className="mastfoot mt-auto">
        <div className="inner pt-2 pb-1">
          <div>
            Made by{" "}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.linkedin.com/in/akalliokoski/"
            >
              akalliokoski
            </a>
          </div>
          <div>
            Sponsored by{" "}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.codeo.fi"
            >
              Codeo
            </a>
          </div>
          <div>
            Powered by{" "}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.hl7.org/fhir/"
            >
              FHIR
            </a>
            <span> and </span>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="http://hapi.fhir.org/"
            >
              HAPI-FHIR Test Server
            </a>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
