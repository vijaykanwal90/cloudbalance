package com.cloudbalance.cloudbalance_backend.service.impl;

import com.cloudbalance.cloudbalance_backend.dto.AccountResponseDto;
import com.cloudbalance.cloudbalance_backend.dto.CreateAccountDto;
import com.cloudbalance.cloudbalance_backend.entity.Account;
import com.cloudbalance.cloudbalance_backend.exception.ResourceAlreadyExistException;
import com.cloudbalance.cloudbalance_backend.exception.ResourceNotFoundException;
import com.cloudbalance.cloudbalance_backend.repository.AccountRepository;
import com.cloudbalance.cloudbalance_backend.service.AccountService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AccountServiceImplmentation implements AccountService {
    private final AccountRepository accountRepository;
    @Override
    public List<AccountResponseDto> getAllAccounts() {
        return accountRepository.findAll().stream().map(account->{
                        AccountResponseDto response = new AccountResponseDto();
                        response.setId(account.getId());
                        response.setAccountId(account.getAccountId());
                        response.setAccountARN(account.getAccountARN());
                        response.setAccountNumber(account.getAccountNumber());
                        return response;
    }).toList();
    }

    @Override
    public AccountResponseDto getAccountById(Long id) {
        Account account =  accountRepository.findById(id).orElseThrow( ()-> new ResourceNotFoundException("Account not found with id " + id ));
        AccountResponseDto responseAccount = new AccountResponseDto();
        responseAccount.setAccountNumber(account.getAccountId());
        responseAccount.setAccountARN(account.getAccountARN());
        responseAccount.setAccountId(account.getAccountId());
        return responseAccount;
    }

    @Override
    public ResponseEntity<?> addAccount(CreateAccountDto createAccountDto) {
        if(accountRepository.existsAccountByAccountId(createAccountDto.getAccountId())){
            throw  new ResourceAlreadyExistException("Account already exist with accountId" + createAccountDto.getAccountId());
        }
        Account newAccount = new Account();
        newAccount.setAccountId(createAccountDto.getAccountId());
        newAccount.setAccountARN(createAccountDto.getAccountARN());
        newAccount.setAccountNumber(createAccountDto.getAccountNumber());
         accountRepository.save(newAccount);
         return ResponseEntity.status(201).build();
    }
}
