package com.cloudbalance.cloudbalance_backend.controller;

import com.cloudbalance.cloudbalance_backend.dto.LoginRequestDto;
import com.cloudbalance.cloudbalance_backend.service.AuthService;
import com.cloudbalance.cloudbalance_backend.utils.JwtUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@Slf4j
public class AuthController {
    @Autowired
    private AuthService authService;
    @Autowired
    JwtUtils jwtUtils;

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequestDto loginRequestDto) {

        return authService.authenticate(loginRequestDto);

    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout() {
        ResponseCookie cookie = authService.logout();
        return ResponseEntity
                .noContent()
                .header(HttpHeaders.SET_COOKIE, cookie.toString())
                .build();

    }

    @GetMapping("/me")
    public ResponseEntity<?> checkIsLoggedIn() {
        boolean result  = authService.checkIsLoggedIn();
//        log.info(result + "result is");
        if (!result) {
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("loggedIn", false));
        }

        return ResponseEntity.status(200).build();
    }


}
