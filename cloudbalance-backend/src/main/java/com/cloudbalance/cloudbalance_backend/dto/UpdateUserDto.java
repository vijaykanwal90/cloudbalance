package com.cloudbalance.cloudbalance_backend.dto;


import com.cloudbalance.cloudbalance_backend.entity.Role;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@RequiredArgsConstructor
@NoArgsConstructor
public class UpdateUserDto {
    private  String firstName;
    private  String lastName;
    private String email;
    private Role role;
}
