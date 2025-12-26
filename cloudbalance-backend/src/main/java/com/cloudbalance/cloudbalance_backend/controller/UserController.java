package com.cloudbalance.cloudbalance_backend.controller;

import com.cloudbalance.cloudbalance_backend.dto.CreateUserDto;
import com.cloudbalance.cloudbalance_backend.dto.UpdateUserDto;
import com.cloudbalance.cloudbalance_backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    UserService userService;

    @GetMapping("/{id}")
    public ResponseEntity<CreateUserDto> getUser(@PathVariable Long id ){

        CreateUserDto createUserDto = userService.getUser(id);
        return ResponseEntity.ok(createUserDto);
    }

    @PostMapping("/createUser")
    public ResponseEntity<?> createUser(@RequestBody CreateUserDto createUserDto){

          userService.createUser(createUserDto);
          return ResponseEntity.status(201).build();

    }
    @PutMapping("/")
    public ResponseEntity<?> updateUser(@RequestParam Long id,@RequestBody UpdateUserDto updateUserDto){
        userService.updateUser(id, updateUserDto);
        return ResponseEntity.ok(200);
    }



}
