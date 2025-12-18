package com.cloudbalance.cloudbalance_backend.dto;

import com.cloudbalance.cloudbalance_backend.entity.Role;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.stereotype.Component;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserDto {

    private  String firstName;
    private  String lastName;
    private  String email;
    private String password;
    private String role;

}
