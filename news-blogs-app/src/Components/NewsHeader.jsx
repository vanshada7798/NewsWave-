import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { Facebook, Instagram, LinkedIn, Twitter } from "@mui/icons-material"; // Material UI Icons
import "./NewsHeader.css";

const NewsHeader = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [showProfile, setShowProfile] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setShowProfile(false);
    navigate("/register");
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        showProfile &&
        !event.target.closest(".profile-popup") &&
        !event.target.closest(".profile-icon")
      ) {
        setShowProfile(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, [showProfile]);

  return (
    <header className="news-header">
      <div className="header-container">
        <h1 className="logo" onClick={() => navigate("/")}>
          NewsWave
        </h1>

        <nav className="nav-links">
          <button className="nav-button" onClick={() => navigate("/news")}>
            News
          </button>
          <button className="nav-button" onClick={() => navigate("/myblog")}>
            Create Your Blog
          </button>
          <button className="nav-button" onClick={() => navigate("/contact")}>
            Contact
          </button>

          {/* Social Media Icons */}
          <div className="social-icons">
            <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
              <Facebook fontSize="medium" className="social-icon" />
            </a>
            <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
              <Instagram fontSize="medium" className="social-icon" />
            </a>
            <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer">
              <LinkedIn fontSize="medium" className="social-icon" />
            </a>
            <a href="https://www.twitter.com/" target="_blank" rel="noopener noreferrer">
              <Twitter fontSize="medium" className="social-icon" />
            </a>
          </div>

          {!user && (
            <button className="nav-button" onClick={() => navigate("/register")}>
              Register
            </button>
          )}
        </nav>

        {/* Profile Section */}
        {user ? (
          <div className="profile-icon" onClick={() => setShowProfile(!showProfile)}>
            <img
              src={user.profilePicture ? `data:image/png;base64,${user.profilePicture}` : "/default-avatar.png"}
              alt="Profile"
              className="profile-pic"
            />
          </div>
        ) : (
          <FaUserCircle className="profile-icon-img" onClick={() => navigate("/register")} />
        )}

        {/* Profile Popup */}
        {showProfile && user && (
          <div className="profile-popup">
            <img
              src={user.profilePicture ? `data:image/png;base64,${user.profilePicture}` : "/default-avatar.png"}
              alt="Profile"
              className="profile-popup-pic"
            />
            <h3>{user.fullName || user.username}</h3> {/* Display fullName if available */}
            <p>{user.email}</p>
            <p>{user.bio}</p>
             {/* Social Links */}
    <div className="profile-social-icons">
      {user.linkedin && (
        <a href={user.linkedin} target="_blank" rel="noopener noreferrer">
          <LinkedIn fontSize="medium" className="social-icon" />
        </a>
      )}
      {user.twitter && (
        <a href={user.twitter} target="_blank" rel="noopener noreferrer">
          <Twitter fontSize="medium" className="social-icon" />
        </a>
      )}
    </div>
            <button className="logout-button" onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default NewsHeader;
