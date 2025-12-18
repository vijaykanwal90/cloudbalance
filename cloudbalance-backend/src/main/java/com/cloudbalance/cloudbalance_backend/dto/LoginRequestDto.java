package com.cloudbalance.cloudbalance_backend.dto;

import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Component;


@Getter
@Setter
public class LoginRequestDto {

    private String email;
    private String password;
}
