package com.cloudbalance.cloudbalance_backend.dto;

import com.cloudbalance.cloudbalance_backend.entity.Role;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.util.List;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CreateUserDto {
//    @NotBlank
//    @Size(min=3, max = 20, message = "First name should be at least  3 and less than equal to 20")
    private  String firstName;

    private  String lastName;

//    @NotBlank
    @Email
    private  String email;

    @NotBlank
    @Size(min=6)
    private String password;

    private String role;
    private List<Long> accountIds;
}
