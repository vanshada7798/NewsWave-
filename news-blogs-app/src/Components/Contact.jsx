import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import { Box, Typography } from "@mui/material";
import "./Contact.css"; // Import external CSS

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // EmailJS configuration
    const serviceId = "service_e4p62mo"; // Your Service ID
    const templateId = "template_ogn66kd"; // Your Template ID
    const publicKey = "aj3ymn0cqylfo-8s2"; // Your EmailJS Public Key

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      message: formData.message,
      reply_to: formData.email,
    };

    emailjs
      .send(serviceId, templateId, templateParams, publicKey)
      .then((response) => {
        alert("Message sent successfully!");
        console.log("Email sent:", response);
        setFormData({ name: "", email: "", message: "" }); // Reset form
      })
      .catch((error) => {
        console.error("Error sending email:", error);
        alert("Failed to send message. Please try again later.");
      });
  };

  return (
    <div className="contact-container">
      <div className="contact-content">
        <h2 className="contact-title">Contact Us</h2>
        <p className="contact-text">
          Have any questions or feedback? Feel free to reach out to us.
        </p>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="contact-form">
          <input
            type="text"
            name="name"
            className="contact-input"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            className="contact-input"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            className="contact-textarea"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
          <button type="submit">Send</button>
        </form>
      </div>

      {/* Footer Section */}
      <Box className="contact-footer">
        <div className="footer-content">
          <div className="footer-row">
            <div className="footer-col">
              <h5 className="footer-title">Contact Us</h5>
              <ul className="footer-list">
                <li>Email: nawarevanshada@gmail.com</li>
                <li>Phone: +91 7798229767</li>
                <li>Address: 456 Media Street, News City, USA</li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <Typography variant="body2">
              &copy; 2025 NewsWave Services. All Rights Reserved.
            </Typography>
          </div>
        </div>
      </Box>
    </div>
  );
};

export default Contact;
