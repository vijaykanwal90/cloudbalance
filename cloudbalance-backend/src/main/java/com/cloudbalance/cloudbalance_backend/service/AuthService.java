package com.cloudbalance.cloudbalance_backend.service;

import com.cloudbalance.cloudbalance_backend.dto.LoginRequestDto;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public interface AuthService {
    public ResponseEntity<?> authenticate(LoginRequestDto loginRequestDto);
    public ResponseCookie logout ();
    public boolean checkIsLoggedIn();
}
