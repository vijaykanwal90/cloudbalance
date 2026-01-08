package com.cloudbalance.cloudbalance_backend.service;

import com.cloudbalance.cloudbalance_backend.dto.AccountResponseDto;
import com.cloudbalance.cloudbalance_backend.dto.CreateAccountDto;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface AccountService {

    public List<AccountResponseDto> getAllAccounts();
        public AccountResponseDto getAccountById(Long id);
    public ResponseEntity<?> addAccount(CreateAccountDto createAccountDto);


}
