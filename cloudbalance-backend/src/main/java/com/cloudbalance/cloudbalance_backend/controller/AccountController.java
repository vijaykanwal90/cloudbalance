package com.cloudbalance.cloudbalance_backend.controller;

import com.cloudbalance.cloudbalance_backend.dto.AccountResponseDto;
import com.cloudbalance.cloudbalance_backend.dto.CreateAccountDto;
import com.cloudbalance.cloudbalance_backend.service.AccountService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/account")
public class AccountController {
    private  final AccountService accountService;
    @GetMapping
    public ResponseEntity<?> getAllAccounts(){
            List<AccountResponseDto> accounts = accountService.getAllAccounts();
            return ResponseEntity.status(200).body(accounts);
    }
    @GetMapping("/{id}")
    public ResponseEntity<?> getAccountById(@PathVariable  Long id){
        AccountResponseDto accountResponseDto = accountService.getAccountById(id);
        return ResponseEntity.status(200).body(accountResponseDto);


    }
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ResponseEntity<?> addAccount(@RequestBody CreateAccountDto createAccountDto){
        return accountService.addAccount(createAccountDto);

    }

}
