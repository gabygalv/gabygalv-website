import React from 'react';
import { Link } from 'react-router-dom';
import about from '../assets/about.png';
import aboutRev from '../assets/aboutRev.png';
import contact from '../assets/contact.png';
import contactRev from '../assets/contactRev.png';
import projects from '../assets/projects.png';
import projectsRev from '../assets/projectsRev.png';
import ggLogo from '../assets/gg-logo.png';

const Navbar = () => {
  return (
    <div className="ui menu navbar">
      <Link to="/" className="navbar-logo">
        <img
          src={ggLogo}
          alt="Home"
          id="home"
        />
      </Link>
      <Link to="/about" className="navbar-item">
        <img
          src={about}
          onMouseOver={() => (document.getElementById('about').src = aboutRev)}
          onMouseOut={() => (document.getElementById('about').src = about)}
          alt="About"
          id="about"
        />
      </Link>
      <Link to="/projects" className="navbar-item">
        <img
          src={projects}
          onMouseOver={() => (document.getElementById('projects').src = projectsRev)}
          onMouseOut={() => (document.getElementById('projects').src = projects)}
          alt="Projects"
          id="projects"
        />
      </Link>
      <Link to="/contact" className="navbar-item">
        <img
          src={contact}
          onMouseOver={() => (document.getElementById('contact').src = contactRev)}
          onMouseOut={() => (document.getElementById('contact').src = contact)}
          alt="Contact"
          id="contact"
        />
      </Link>
    </div>
  );
};

export default Navbar;
