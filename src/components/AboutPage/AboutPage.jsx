import React from 'react';
import './AboutPage.css'; // Import CSS file for styling

function AboutPage() {
  return (
    <div className="about-container">
      <div className="about-content">
        <h2 className="about-title">About Us</h2>
        <p>Nature Nook</p>
        <p>Here at Nature Nook, we are passionate about plants and fostering a vibrant community of plant lovers.</p>
        <p>Explore our app, connect with fellow enthusiasts, and let's grow together!</p>
        <div className="contact-info">
          <h3>Contact Info</h3>
          <p>If you have any bug reports, feature ideas, or just want to say hello, feel free to get in touch with me at <a href="mailto:dylanbrown588@gmail.com">dylanbrown588@gmail.com</a>.</p>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;