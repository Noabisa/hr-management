// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'; // Import the CSS file
import Dashboard from './components/Dashboard';
import EmployeeForm from './components/EmployeeForm';
import EmployeeList from './components/EmployeeList';
import VehicleForm from './components/VehicleForm';
import VehicleList from './components/VehicleList';
import ProfessionalDevelopment from './components/ProfessionalDevelopment'; // Import the new component
import Legal from './components/Legal'; // Import the Legal component

const App = () => {
    return (
        <Router>
            <div className="app-container">
                <header className="header">
                    <h1>AWY</h1>
                </header>
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/employees" element={
                        <>
                            <div className="form-container">
                                <EmployeeForm fetchEmployees={() => {}} />
                            </div>
                            <div className="list-container">
                                <EmployeeList />
                            </div>
                        </>
                    } />
                    <Route path="/vehicles" element={
                        <>
                            <div className="form-container">
                                <VehicleForm fetchVehicles={() => {}} />
                            </div>
                            <div className="list-container">
                                <VehicleList />
                            </div>
                        </>
                    } />
                    <Route path="/development" element={
                        <div className="development-container">
                            <ProfessionalDevelopment />
                        </div>
                    } />
                    <Route path="/legal" element={<Legal />} /> 
                </Routes>
                <footer className="footer">
                    <div className="footer-content">
                        <p>&copy; {new Date().getFullYear()} AWY Human Resource Management System</p>
                        <p>Developed by [Maremane's Team]</p>
                        <div className="footer-links">
                            <a href="/legal">About us</a> 
                        </div>
                    </div>
                </footer>
            </div>
        </Router>
    );
};

export default App;