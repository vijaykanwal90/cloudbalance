package com.cloudbalance.cloudbalance_backend.controller;

import com.cloudbalance.cloudbalance_backend.dto.CreateUserDto;
import com.cloudbalance.cloudbalance_backend.dto.UpdateUserDto;
import com.cloudbalance.cloudbalance_backend.dto.UpdateUserResponseDto;
import com.cloudbalance.cloudbalance_backend.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping("/createuser")
    public ResponseEntity<?> createUser(@Valid @RequestBody CreateUserDto createUserDto){

          userService.createUser(createUserDto);
          return ResponseEntity.status(201).build();
    }
    @PutMapping("/updateuser")
    public ResponseEntity<?> updateUser(@RequestParam Long id, @Valid @RequestBody UpdateUserDto updateUserDto){
        UpdateUserResponseDto userResponseDto = userService.updateUser(id, updateUserDto);
        return ResponseEntity.ok(userResponseDto);
    }



}
