package com.cloudbalance.cloudbalance_backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateAccountDto {


     @NotBlank
     @Size(min=3 ,max=20, message ="AccountName  must be in between 3 and 20 ")
    private String accountName;
    @NotBlank
    @Size(min = 12, max = 12, message = "AccountId must be exactly 12 characters")
    private String accountId;
    @NotBlank
    private String accountARN;
}
