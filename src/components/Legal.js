// Legal.js
import React from 'react';
import '../App.css'; // Optional: Import CSS for styling

const Legal = () => {
    return (
        <div className="legal">
            <h1>Legal Information</h1>

            <section className="privacy-policy">
                <h2>Privacy Policy</h2>
                <p><strong>Effective Date:</strong> [03 December 2024]</p>
                <p>Welcome to the AWY Human Resource Management System (HRMS). <br/>
                    This Privacy Policy outlines how we collect, use, disclose, <br/>
                    and protect your personal information when you use our system. <br/>
                    By accessing or using our services, you agree to the terms of <br/>
                    this Privacy Policy.</p>
                <h3>1. Information We Collect</h3>
                <p>
                    <strong><p>Personal Information:</p></strong> <p>Name, employee ID, email, phone number, etc.</p><br/>
                    <strong><p>Professional Development Information:</p></strong> <p>Training records and qualifications.</p><br/>
                    <strong><p>Vehicle Information:</p></strong> <p>Company vehicle details, if applicable.</p><br/>
                </p>
                <h3>2. How We Use Your Information</h3>
                <p>
                    To manage employee records.<br/>
                    To track professional development.<br/>
                    To manage vehicle assignments.<br/>
                    </p>
                <h3>3. Disclosure of Your Information</h3>
                <p>
                    To service providers under confidentiality agreements.<br/>
                    To legal authorities if required.<br/>
                </p>
                <h3>4. Data Security</h3>
                <p>We implement reasonable measures to protect your data but cannot guarantee absolute security.</p>
                <h3>5. Your Rights</h3>
                <p>You may have rights regarding your personal information. Contact us to exercise these rights.</p>
                <h3>6. Changes to This Privacy Policy</h3>
                <p>We may update this policy and will notify you of changes.</p>
                <h3>7. Contact Us</h3>
                <p>If you have questions, please contact us at: [+266 59339961]</p>
            </section>

            <section className="terms-of-service">
                <h2>Terms of Service</h2>
                <p><strong>Effective Date:</strong> [03/12/2024]</p>
                <p>By using our services, you agree to comply with the following terms:</p>
                <h3>1. Acceptance of Terms</h3>
                <p>By accessing our services, you accept these terms.</p>
                <h3>2. User Responsibilities</h3>
                <p>You agree to use the services responsibly and in accordance with applicable laws.</p>
                <h3>3. Limitation of Liability</h3>
                <p>We are not liable for any indirect or consequential damages arising from your use of our services.</p>
                <h3>4. Governing Law</h3>
                <p>These terms are governed by the laws of [Insert Jurisdiction].</p>
            </section>

            <section className="contact-us">
                <h2>Contact Us</h2>
                <p>If you have any questions or concerns, please reach out to us:</p>
                <p>
                    <strong>AWY Human Resource Management System</strong><br />
                    Email: [mashaikadimo@gmanil.com]<br />
                    Phone: [+266 65287590]<br />
                    Address: [rycoh]
                </p>
            </section>
        </div>
    );
};

export default Legal;