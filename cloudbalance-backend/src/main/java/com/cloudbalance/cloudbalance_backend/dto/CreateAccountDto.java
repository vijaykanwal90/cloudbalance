package com.cloudbalance.cloudbalance_backend.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateAccountDto {


    private String accountNumber;
    private String accountId;
    private String accountARN;
}
