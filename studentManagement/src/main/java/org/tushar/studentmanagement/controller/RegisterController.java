package org.tushar.studentmanagement.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

import org.tushar.studentmanagement.dto.RegisterRequest;
import org.tushar.studentmanagement.entity.User;
import org.tushar.studentmanagement.repository.UserRepository;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class RegisterController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public String register(@Valid @RequestBody RegisterRequest request) {

        // Check whether email already exists
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            return "Email already registered.";
        }

        // Create new user
        User user = new User();

        user.setEmail(request.getEmail());

        // Store password as BCrypt hash
        user.setPassword(
                passwordEncoder.encode(request.getPassword())
        );

        // Every self-registered account is USER
        user.setRole("USER");

        userRepository.save(user);

        return "User registered successfully.";
    }
}