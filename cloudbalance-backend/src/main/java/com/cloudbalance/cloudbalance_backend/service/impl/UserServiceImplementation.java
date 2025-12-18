package com.cloudbalance.cloudbalance_backend.service.impl;

import com.cloudbalance.cloudbalance_backend.dto.UserDto;
import com.cloudbalance.cloudbalance_backend.entity.Role;
import com.cloudbalance.cloudbalance_backend.entity.User;
import com.cloudbalance.cloudbalance_backend.repository.UserRepository;
import com.cloudbalance.cloudbalance_backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import static java.lang.String.valueOf;

@Component
public class UserServiceImplementation implements UserService {
    @Autowired
    CustomUserDetailsService customUserDetailsService;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserServiceImplementation(UserRepository userRepository,
                                     PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User createUser(UserDto request) {
        if (userRepository.existsByEmail(request.getEmail())) {
             return userRepository.findByEmail(request.getEmail()).orElseThrow(()-> new RuntimeException("Problem occured in create User"));
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
    public UserDto getUser(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException(
                        "User not found with id: " + id
                ));

        UserDto dto = new UserDto();

        dto.setEmail(user.getEmail());
        dto.setFirstName(user.getFirstName());
        dto.setLastName(user.getLastName());
        dto.setRole(user.getRole().name());

        return dto;
    }

    public UserDto updateUser(UserDto request){

    }



}
