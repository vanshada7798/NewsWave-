package com.itvedant.model;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Base64;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:5174")
@RestController
@RequestMapping("/api/auth")
public class UserController {

    private static final Logger logger = LoggerFactory.getLogger(UserController.class);
    private final UserService userService;
    private final JwtUtil jwtUtil;
    private final BCryptPasswordEncoder passwordEncoder;

    @Autowired
    public UserController(UserService userService, JwtUtil jwtUtil) {
        this.userService = userService;
        this.jwtUtil = jwtUtil;
        this.passwordEncoder = new BCryptPasswordEncoder(); // Initialize BCrypt encoder
    }

    /**
     * ✅ Register new user with encrypted password
     */
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        try {
            // 🔐 Encrypt password before saving
            user.setPassword(passwordEncoder.encode(user.getPassword()));

            User registeredUser = userService.registerUser(user);
            return ResponseEntity.status(HttpStatus.CREATED).body(registeredUser);
        } catch (RuntimeException e) {
            logger.warn("❌ Registration failed: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    /**
     * ✅ Login user (Generate JWT)
     */
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {
        if (!credentials.containsKey("email") || !credentials.containsKey("password")) {
            return ResponseEntity.badRequest().body("Email and password are required");
        }

        String email = credentials.get("email");
        String rawPassword = credentials.get("password");

        logger.info("🔍 Login attempt with email: {}", email);

        Optional<User> userOptional = userService.getUserByEmail(email);

        if (userOptional.isPresent()) {
            User user = userOptional.get();

            // 🔐 Check if the provided password matches the hashed password
            if (!passwordEncoder.matches(rawPassword, user.getPassword())) {
                logger.warn("❌ Invalid password for email: {}", email);
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
            }

            // 🔐 Generate JWT Token
            String token = jwtUtil.generateToken(user.getEmail());

            // Convert profile picture to Base64 (if exists)
            String base64Image = (user.getProfilePicture() != null)
                ? Base64.getEncoder().encodeToString(user.getProfilePicture())
                : "";

            // Create response with user details + token
            Map<String, Object> response = new HashMap<>();
            response.put("username", user.getUsername());
            response.put("email", user.getEmail());
            response.put("bio", user.getBio());
            response.put("github", user.getGithub());
            response.put("linkedin", user.getLinkedin());
            response.put("twitter", user.getTwitter());
            response.put("profilePicture", base64Image);
            response.put("token", token);  // ✅ Return JWT token

            return ResponseEntity.ok(response);
        } else {
            logger.warn("❌ Invalid login attempt for email: {}", email);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
    }

    /**
     * ✅ Get user by username
     */
    @GetMapping("/user/{username}")
    public ResponseEntity<?> getUserByUsername(@PathVariable String username) {
        Optional<User> userOptional = userService.getUserByUsername(username);

        if (userOptional.isPresent()) {
            User user = userOptional.get();

            // Convert profile picture to Base64 (if exists)
            String base64Image = (user.getProfilePicture() != null)
                ? Base64.getEncoder().encodeToString(user.getProfilePicture())
                : "";

            // Create response with user details
            Map<String, Object> response = new HashMap<>();
            response.put("username", user.getUsername());
            response.put("email", user.getEmail());
            response.put("bio", user.getBio());
            response.put("github", user.getGithub());
            response.put("linkedin", user.getLinkedin());
            response.put("twitter", user.getTwitter());
            response.put("profilePicture", base64Image);

            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
    }
}
