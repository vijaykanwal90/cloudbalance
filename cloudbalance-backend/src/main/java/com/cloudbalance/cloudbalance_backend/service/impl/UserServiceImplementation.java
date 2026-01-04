package com.cloudbalance.cloudbalance_backend.service.impl;

import com.cloudbalance.cloudbalance_backend.dto.CreateUserDto;
import com.cloudbalance.cloudbalance_backend.dto.UpdateUserDto;
import com.cloudbalance.cloudbalance_backend.dto.UpdateUserResponseDto;
import com.cloudbalance.cloudbalance_backend.entity.Role;
import com.cloudbalance.cloudbalance_backend.entity.User;
import com.cloudbalance.cloudbalance_backend.repository.UserRepository;
import com.cloudbalance.cloudbalance_backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class UserServiceImplementation implements UserService {

    private final CustomUserDetailsService customUserDetailsService;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;


    public User createUser(CreateUserDto request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            return userRepository.findByEmail(request.getEmail()).orElseThrow(() -> new RuntimeException("Problem occured in create User"));
        }

        User user = new User();
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setEmail(request.getEmail());
        Role role = Role.valueOf(request.getRole().toUpperCase());
        user.setRole(role);

        return userRepository.save(user);
    }

    public CreateUserDto getUser(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException(
                        "User not found with id: " + id
                ));

        CreateUserDto dto = new CreateUserDto();

        dto.setEmail(user.getEmail());
        dto.setFirstName(user.getFirstName());
        dto.setLastName(user.getLastName());
        dto.setRole(user.getRole().name());

        return dto;
    }

    public UpdateUserResponseDto updateUser(Long id, UpdateUserDto request) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException(
                        "User not found with id: " + id
                ));
        Long currentUserId = getCurrentUserId();
        if (currentUserId.equals(id)) {
            throw new RuntimeException("You are not allowed to update your own profile");
        }
        UpdateUserResponseDto updatedUser = new UpdateUserResponseDto();
        if (!request.getFirstName().isEmpty()) {
            user.setFirstName(request.getFirstName());
        }
        if (!request.getLastName().isEmpty()) {
            user.setLastName(request.getLastName());
        }
        if (!request.getEmail().isEmpty()) {
            user.setEmail(request.getEmail());
        }

        if (request.getRole() != null) {
            user.setRole(Role.valueOf(request.getRole()));
        }
        User savedUser = userRepository.save(user);
        UpdateUserResponseDto response = new UpdateUserResponseDto();
        response.setId(savedUser.getId());
        response.setFirstName(savedUser.getFirstName());
        response.setLastName(savedUser.getLastName());
        response.setEmail(savedUser.getEmail());
        response.setRole(savedUser.getRole());
        return response;
    }

    public Long getCurrentUserId() {
        Authentication authentication = SecurityContextHolder
                .getContext()
                .getAuthentication();

        if (authentication == null || !authentication.isAuthenticated()) {
            throw new RuntimeException("User not authenticated");
        }

        User user = (User) authentication.getPrincipal();
        return user.getId();
    }


}

