package com.cloudbalance.cloudbalance_backend.controller;

import com.cloudbalance.cloudbalance_backend.dto.UserDto;
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
    public ResponseEntity<UserDto> getUser(@PathVariable Long id ){

        UserDto userDto = userService.getUser(id);
        return ResponseEntity.ok(userDto);
    }

    @PostMapping("/createUser")
    public ResponseEntity<?> createUser(@RequestBody UserDto userDto){

          userService.createUser(userDto);
          return ResponseEntity.status(201).build();

    }
    @PutMapping("/")
    public ResponseEntity<?> updateUser(@RequestBody UserDto userDto){
        userService.updateUser(userDto);
        return ResponseEntity.status(200).body(userDto);
    }



}
