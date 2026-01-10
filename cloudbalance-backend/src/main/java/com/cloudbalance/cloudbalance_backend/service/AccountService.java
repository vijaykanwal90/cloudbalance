package com.cloudbalance.cloudbalance_backend.service;

import com.cloudbalance.cloudbalance_backend.dto.AccountAssignDto;
import com.cloudbalance.cloudbalance_backend.dto.AccountResponseDto;
import com.cloudbalance.cloudbalance_backend.dto.CreateAccountDto;
import com.cloudbalance.cloudbalance_backend.entity.Account;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface AccountService {

    public List<AccountResponseDto> getAllAccounts();
        public AccountResponseDto getAccountById(Long id);
    public ResponseEntity<?> onboardAccount(CreateAccountDto createAccountDto);

    public ResponseEntity<?> assignAccounts(Long userId, AccountAssignDto accountAssignDto);
    public List<Account> userAccounts(Long userId);
    public List<Account> myAccounts();



}
