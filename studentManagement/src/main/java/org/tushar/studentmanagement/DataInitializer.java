package org.tushar.studentmanagement;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.tushar.studentmanagement.entity.User;
import org.tushar.studentmanagement.repository.UserRepository;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner createUsers(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder) {

        return args -> {

            // ==============================
            // CREATE ADMIN USER
            // ==============================

            String adminEmail = "admin@gmail.com";

            if (userRepository.findByEmail(adminEmail).isEmpty()) {

                User admin = new User();

                admin.setEmail(adminEmail);

                admin.setPassword(
                        passwordEncoder.encode("admin123")
                );

                admin.setRole("ADMIN");

                userRepository.save(admin);

                System.out.println("=================================");
                System.out.println("Admin user created successfully!");
                System.out.println("Email: admin@gmail.com");
                System.out.println("Password: admin123");
                System.out.println("Role: ADMIN");
                System.out.println("=================================");

            } else {

                System.out.println("Admin user already exists.");

            }


            // ==============================
            // CREATE NORMAL USER
            // ==============================

            String userEmail = "user@gmail.com";

            if (userRepository.findByEmail(userEmail).isEmpty()) {

                User user = new User();

                user.setEmail(userEmail);

                user.setPassword(
                        passwordEncoder.encode("user123")
                );

                user.setRole("USER");

                userRepository.save(user);

                System.out.println("=================================");
                System.out.println("Normal user created successfully!");
                System.out.println("Email: user@gmail.com");
                System.out.println("Password: user123");
                System.out.println("Role: USER");
                System.out.println("=================================");

            } else {

                System.out.println("Normal user already exists.");

            }
        };
    }
}