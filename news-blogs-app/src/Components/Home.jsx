import React, { useState } from "react";
import { Container, Typography, Box, Grid, Button, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import Slider from "react-slick"; // Importing Slick Slider
import "./Home.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Home = () => {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(true);

  const images = [
    "https://i.pinimg.com/736x/5d/f6/6f/5df66f08fd4b57d49587497015e056eb.jpg",
    "https://i.pinimg.com/736x/75/4c/95/754c95f779afbfc27b6796236a782a9d.jpg",
    "https://i.pinimg.com/736x/09/54/73/095473155e962a12d8fa80805f983a52.jpg",
  ];

  const settings = {
    dots: true, // Shows navigation dots
    infinite: true, // Allows continuous loop of images
    speed: 500, // Speed of transition between images
    slidesToShow: 1, // Show one image at a time
    slidesToScroll: 1, // Scroll one image at a time
    autoplay: true, // Auto scroll images
    autoplaySpeed: 3000, // Auto scroll interval (in ms)
  };

  return (
    <div className="home-container">
      {/* Popup Screen */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-box">
            <IconButton className="popup-close" onClick={() => setShowPopup(false)}>
              <CloseIcon />
            </IconButton>
            <Typography variant="h4" className="popup-text">
              Welcome to News & Blogs!
            </Typography>

            <div className="popup-actions">
              <Button
                variant="contained"
                color="primary"
                onClick={() => navigate("/register")}
                className="popup-button"
              >
                Register
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => navigate("/news")}
                className="popup-button"
              >
                View News
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <Box className="hero-section">
        <Typography variant="h3" className="hero-title">
          Welcome to NewsWave
        </Typography>
        <Typography variant="h6" className="hero-text">
          Your one-stop platform for the latest news and user-created blogs.
        </Typography>
      </Box>

      {/* New Section with images and text */}
      <Container className="content-container intro-section">
        <Grid container spacing={4} alignItems="center">
          {/* Left Column (Images) */}
          <Grid item xs={12} sm={6}>
            <Box className="image-container">
              <Slider {...settings}> {/* Adding the slider here */}
                {images.map((image, index) => (
                  <div key={index}>
                    <img src={image} alt="News Image" className="responsive-image" />
                  </div>
                ))}
              </Slider>
            </Box>
          </Grid>

          {/* Right Column (Text and Buttons) */}
          <Grid item xs={12} sm={6}>
            <Typography variant="h4" className="section-title">
              NewsWave App
            </Typography>
            <Typography variant="body1" className="section-text">
              News & Blogs provides real-time news updates and a blogging platform where users can create and share their thoughts. Stay informed, express yourself, and explore trending topics all in one place.
            </Typography>
            <div className="button-group">
              <Button variant="contained" color="primary" onClick={() => navigate("/myblog")}>
                Create a Blog
              </Button>
              <Button variant="contained" color="secondary" onClick={() => navigate("/register")}>
                Register
              </Button>
              <Button variant="contained" color="success" onClick={() => navigate("/news")}>
                View News
              </Button>
            </div>
          </Grid>
        </Grid>
      </Container>

      {/* Footer */}
      <Box className="footer bg-dark text-light pt-4 pb-4">
        <div className="container">
          <div className="row">
            {/* News & Blog Services Information */}
            <div className="col-md-4">
              <h5>NewsWave Services</h5>
              <p>Stay updated with the latest news and share your thoughts with our platform. From current events to personal blogs, we offer a space for all kinds of content!</p>
            </div>

            {/* Links Section */}
            <div className="col-md-4">
              <h5>Quick Links</h5>
              <ul className="list-unstyled">
                <li><a href="#" className="text-light">Home</a></li>
                <li><a href="#" className="text-light">Latest News</a></li>
                <li><a href="#" className="text-light">Create a Blog</a></li>
                <li><a href="#" className="text-light">Contact Us</a></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className="col-md-4">
              <h5>Contact Us</h5>
              <ul className="list-unstyled">
                <li>Email: nawarevanshada@gmail.com</li>
                <li>Phone: +123 456 7890</li>
                <li>Address: 456 Media Street, News City, USA</li>
              </ul>

              {/* Social Media Icons */}
              <div className="mt-3">
                <a href="#" className="text-light me-3"><i className="fab fa-facebook"></i></a>
                <a href="#" className="text-light me-3"><i className="fab fa-twitter"></i></a>
                <a href="#" className="text-light me-3"><i className="fab fa-instagram"></i></a>
                <a href="#" className="text-light me-3"><i className="fab fa-linkedin"></i></a>
              </div>
            </div>
          </div>

          {/* Copyright Section */}
          <div className="text-center mt-4">
            <Typography variant="body2">&copy; 2025 NewsWave  Services. All Rights Reserved.</Typography>
          </div>
        </div>
      </Box>
    </div>
  );
};

export default Home;
