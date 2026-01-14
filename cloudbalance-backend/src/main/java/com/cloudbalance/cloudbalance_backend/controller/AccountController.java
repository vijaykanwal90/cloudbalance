package com.cloudbalance.cloudbalance_backend.controller;

import com.cloudbalance.cloudbalance_backend.dto.AccountAssignDto;
import com.cloudbalance.cloudbalance_backend.dto.AccountResponseDto;
import com.cloudbalance.cloudbalance_backend.dto.CreateAccountDto;
import com.cloudbalance.cloudbalance_backend.service.AccountService;
import jakarta.validation.Valid;
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
    private final AccountService accountService;

    @PreAuthorize("hasAnyRole('ADMIN','READ_ONLY')")
    @GetMapping
    public ResponseEntity<?> getAllAccounts() {
        List<AccountResponseDto> accounts = accountService.getAllAccounts();
        return ResponseEntity.status(200).body(accounts);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getAccountById(@PathVariable Long id) {
        AccountResponseDto accountResponseDto = accountService.getAccountById(id);
        return ResponseEntity.status(200).body(accountResponseDto);


    }

    @PreAuthorize("hasRole('ADMIN')")
    @PatchMapping("/assign-accounts/{userId}")
    public ResponseEntity<?> assignAccounts(@PathVariable Long userId, @RequestBody AccountAssignDto accountAssignDto) {

        return accountService.assignAccounts(userId, accountAssignDto);
    }
   @PreAuthorize("hasAnyRole('ADMIN','READ_ONLY')")
   @GetMapping("/orphan-account")
   public ResponseEntity<?> getOrphanAccounts(){
        List<AccountResponseDto> orphanAccounts = accountService.getOrphanAccounts();
        return ResponseEntity.status(200).body(orphanAccounts);
    }

    @PreAuthorize("hasAnyRole('ADMIN','READ_ONLY')")
    @GetMapping("/user-accounts/{userId}")
    public ResponseEntity<?> userAccounts(@PathVariable Long userId) {

        return ResponseEntity.status(200).body(accountService.userAccounts(userId));
    }

    @GetMapping("/my-accounts")
    public ResponseEntity<?> myAccounts() {
        return ResponseEntity.status(200).body(accountService.myAccounts());

    }


    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ResponseEntity<?> onboardAccount(@Valid @RequestBody CreateAccountDto createAccountDto) {
        return accountService.onboardAccount(createAccountDto);

    }

}
