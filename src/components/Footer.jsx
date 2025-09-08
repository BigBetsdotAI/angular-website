import React from 'react';
import '../styles/Footer.css';
import { FaLinkedin, FaTwitter } from "react-icons/fa";

function Footer() {
    return (
        <footer className="footer-dark">
            <div className="footer-container">
                <div className="footer-logo">
                    <img src={require('../assets/images/logo.png')} alt="Logo" />
                </div>
                <div className="footer-columns">
                    <div>
                        <h3>Products</h3>
                        <ul>
                            <li>Professional Podcast Studio</li>
                            <li>Content Creation</li>
                            <li>Digital Marketing</li>
                            <li>Lead Generation and Lead Conversion</li>
                            <li>Blogs for your brands</li>
                            <li>Social Growth</li>
                        </ul>
                    </div>
                    <div>
                        <h3>Resources</h3>
                        <ul>
                            <li>Creators</li>
                            <li>Creator – Testimonials</li>
                            <li>Client Success Stories</li>
                            <li>Blog</li>
                            <li>Help</li>
                        </ul>
                    </div>
                    <div>
                        <h3>Company</h3>
                        <ul>
                            <li>About Us</li>
                            <li>Careers</li>
                            <li>Team</li>
                            <li>Contact Us</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <span>Copyright 2022 Circle. All rights reserved.</span>
                <div className="footer-social">
                    <a
                        href="https://linkedin.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="LinkedIn"
                        className="footer-icon-link"
                    >
                        <FaLinkedin />
                    </a>
                    <a
                        href="https://twitter.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Twitter"
                        className="footer-icon-link"
                    >
                        <FaTwitter />
                    </a>
                </div>
                <div className="footer-links">
                    <a href="/privacy-policy">Privacy Policy</a>
                    <span>|</span>
                    <a href="/data-security">Data &amp; Security</a>
                    <span>|</span>
                    <a href="/terms-of-service">Terms of Service</a>
                    <span>|</span>
                    <a href="/data-security">Data &amp; Security</a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
