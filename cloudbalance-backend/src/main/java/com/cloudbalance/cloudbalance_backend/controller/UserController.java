package com.cloudbalance.cloudbalance_backend.controller;

import com.cloudbalance.cloudbalance_backend.dto.CreateUserDto;
import com.cloudbalance.cloudbalance_backend.dto.UpdateUserDto;
import com.cloudbalance.cloudbalance_backend.dto.UpdateUserResponseDto;
import com.cloudbalance.cloudbalance_backend.dto.UserResponseDto;
import com.cloudbalance.cloudbalance_backend.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {


    private final UserService userService;

    @GetMapping("/{id}")
    public ResponseEntity<CreateUserDto> getUser(@PathVariable Long id ){

        CreateUserDto createUserDto = userService.getUser(id);
        return ResponseEntity.ok(createUserDto);
    }
    @GetMapping
    public ResponseEntity<?> getAllUser(){

        List<UserResponseDto> users = userService.getAllUsers();

        return ResponseEntity.status(200).body(users);
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> createUser( @Valid @RequestBody CreateUserDto createUserDto){

        System.out.println(createUserDto);
          userService.createUser(createUserDto);
          return ResponseEntity.status(201).build();
    }
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping
    public ResponseEntity<?> updateUser(@RequestParam Long id, @Valid @RequestBody UpdateUserDto updateUserDto){
        System.out.println("updating user");
        UpdateUserResponseDto userResponseDto = userService.updateUser(id, updateUserDto);
        return ResponseEntity.ok(userResponseDto);
    }



}
