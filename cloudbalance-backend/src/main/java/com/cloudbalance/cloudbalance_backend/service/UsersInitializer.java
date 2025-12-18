package com.cloudbalance.cloudbalance_backend.service;

import com.cloudbalance.cloudbalance_backend.dto.UserDto;
import com.cloudbalance.cloudbalance_backend.entity.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

@Component
public class UsersInitializer implements ApplicationRunner {
    @Autowired
    UserService userService;

    @Override
    public void run(ApplicationArguments args) throws Exception {
        System.out.println("initialized file");
          UserDto admin = new UserDto();
          admin.setFirstName("admin");
          admin.setLastName("1");
          admin.setEmail("admin@gmail.com");
          admin.setPassword("admin123");
          admin.setRole(Role.ADMIN.name());
          userService.createUser(admin);
    }
}
