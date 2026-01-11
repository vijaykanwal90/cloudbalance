package com.cloudbalance.cloudbalance_backend.dto;


import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@RequiredArgsConstructor

public class UpdateUserDto {

    @Size(min = 3, max = 20, message = "First name must be between 3 and 20 characters")
    private String firstName;

    @Size(min = 3, max = 20)
    private String lastName;

    @Email(message = "Invalid email format")
    private String email;

//    private Role role;

      private String role;
    private List<Long> accountIds;

}
