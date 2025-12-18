package com.cloudbalance.cloudbalance_backend.service;

import com.cloudbalance.cloudbalance_backend.dto.UserDto;
import com.cloudbalance.cloudbalance_backend.entity.User;
import org.springframework.stereotype.Service;

@Service
public interface UserService {
     public User createUser(UserDto request);
     public UserDto getUser(Long id);
     public UserDto updateUser(UserDto request);
}
