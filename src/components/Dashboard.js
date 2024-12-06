// Dashboard.js
import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import '../App.css'; 

const Dashboard = () => {
    return (
        <div className="dashboard">
            <h1>HUMAN RESOURCE MANAGEMENT SYSTEM</h1>
            <nav>
                <Link to="/employees">Employees</Link>
                <Link to="/vehicles">Procurement</Link>
                <Link to="/development">Professional Development</Link> 
            </nav>
            <p className="description">
                Welcome to the HR Management System! Here you can manage employees, vehicles, and professional development programs efficiently.
            </p>
            <div className="social-media-icons">
                <h3>Connect with us:</h3>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faFacebook} size="2x" style={{ margin: '0 10px' }} />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faTwitter} size="2x" style={{ margin: '0 10px' }} />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faLinkedin} size="2x" style={{ margin: '0 10px' }} />
                </a>
            </div>
        </div>
    );
};

export default Dashboard;