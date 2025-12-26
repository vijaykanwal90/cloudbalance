package com.cloudbalance.cloudbalance_backend.dto;

import com.cloudbalance.cloudbalance_backend.entity.Role;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateUserResponseDto {
        private Long id;
        private String firstName;
        private String lastName;
        private String email;
        private Role role;
}
