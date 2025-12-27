package com.cloudbalance.cloudbalance_backend.service;

import com.cloudbalance.cloudbalance_backend.dto.CreateUserDto;
import com.cloudbalance.cloudbalance_backend.dto.UpdateUserDto;
import com.cloudbalance.cloudbalance_backend.dto.UpdateUserResponseDto;
import com.cloudbalance.cloudbalance_backend.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
public interface UserService {
     public User createUser(CreateUserDto request);
     public CreateUserDto getUser(Long id);
     public UpdateUserResponseDto updateUser(Long id, UpdateUserDto request);

     public Long getCurrentUserId();
}
