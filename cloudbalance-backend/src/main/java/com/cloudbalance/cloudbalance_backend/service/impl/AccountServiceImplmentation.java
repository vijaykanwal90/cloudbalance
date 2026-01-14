package com.cloudbalance.cloudbalance_backend.service.impl;

import com.cloudbalance.cloudbalance_backend.dto.AccountAssignDto;
import com.cloudbalance.cloudbalance_backend.dto.AccountResponseDto;
import com.cloudbalance.cloudbalance_backend.dto.CreateAccountDto;
import com.cloudbalance.cloudbalance_backend.entity.Account;
import com.cloudbalance.cloudbalance_backend.entity.User;
import com.cloudbalance.cloudbalance_backend.exception.ResourceAlreadyExistException;
import com.cloudbalance.cloudbalance_backend.exception.ResourceNotFoundException;
import com.cloudbalance.cloudbalance_backend.repository.AccountRepository;
import com.cloudbalance.cloudbalance_backend.repository.UserRepository;
import com.cloudbalance.cloudbalance_backend.service.AccountService;
import com.cloudbalance.cloudbalance_backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AccountServiceImplmentation implements AccountService {
    private final AccountRepository accountRepository;
    private final UserRepository userRepository;

    @Override
    public List<AccountResponseDto> getAllAccounts() {
        return accountRepository.findAll().stream().map(account -> {
            AccountResponseDto response = new AccountResponseDto();
            response.setId(account.getId());
            response.setAccountId(account.getAccountId());
            response.setAccountARN(account.getAccountARN());
            response.setAccountName(account.getAccountName());
            return response;
        }).toList();
    }

    @Override
    public AccountResponseDto getAccountById(Long id) {
        Account account = accountRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Account not found with id " + id));
        AccountResponseDto responseAccount = new AccountResponseDto();
        responseAccount.setId(account.getId());
        responseAccount.setAccountName(account.getAccountName());
        responseAccount.setAccountARN(account.getAccountARN());
        responseAccount.setAccountId(account.getAccountId());
        return responseAccount;
    }

    @Override
    public ResponseEntity<?> onboardAccount(CreateAccountDto createAccountDto) {
        if (accountRepository.existsAccountByAccountId(createAccountDto.getAccountId())) {
            throw new ResourceAlreadyExistException("Account already exist with accountId" + createAccountDto.getAccountId());
        }
        Account newAccount = new Account();
        newAccount.setAccountId(createAccountDto.getAccountId());
        newAccount.setAccountARN(createAccountDto.getAccountARN());
        newAccount.setAccountName(createAccountDto.getAccountName());
        accountRepository.save(newAccount);
        return ResponseEntity.status(201).build();
    }

    @Override
    @Transactional(readOnly = true)
    public ResponseEntity<?> assignAccounts(Long userId, AccountAssignDto accountAssignDto) {
        User user = userRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("user not found with userid " + userId));
        List<Long> requestedIds = accountAssignDto.getAccountIds();
        user.getAccounts().clear();
        if(requestedIds==null || requestedIds.size() ==0){
            userRepository.save(user);
            return ResponseEntity.status(200).body("done");
        }
        List<Account> accounts = accountRepository.findAllById(requestedIds);
        Set<Long> foundIds = accounts.stream()
                .map(Account::getId)
                .collect(Collectors.toSet());
        List<Long> invalidIds = requestedIds.stream()
                .filter(id -> !foundIds.contains(id))
                .toList();

        accounts.forEach((account)->{
            user.addAccount(account);
            accountRepository.save(account);
        });
        userRepository.save(user);
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Some account IDs are invalid");
        response.put("invalidAccountIds", invalidIds);
        return ResponseEntity.status(200).body(response);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Account> userAccounts(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("user not found with userid " + userId));
        List<Account> userAccounts =  user.getAccounts().stream().toList();
        return userAccounts;
    }

    @Override
    @Transactional(readOnly = true)
    public List<Account> myAccounts() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User userDetails = (User) authentication.getPrincipal();
        Long userId = userDetails.getId();
        User user = userRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("user not found with userid " + userId));
        List<Account> accounts  = user.getAccounts().stream().toList();
        return accounts;

    }
    @Transactional
    public List<AccountResponseDto> getOrphanAccounts(){
        List<Account> accounts = accountRepository.findAll().stream().toList();
        List<AccountResponseDto> orphanAccounts = accounts.stream().filter(account->
                     account.getUsers().isEmpty()


                ).map(account ->{
                        AccountResponseDto response = new AccountResponseDto();
                        response.setId(account.getId());
                        response.setAccountId(account.getAccountId());
                        response.setAccountARN(account.getAccountARN());
                        response.setAccountName(account.getAccountName());
            return response;
    }
        ).toList();

        return orphanAccounts;
    }
}
