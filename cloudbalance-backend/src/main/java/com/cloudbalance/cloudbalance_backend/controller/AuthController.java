package com.cloudbalance.cloudbalance_backend.controller;

import com.cloudbalance.cloudbalance_backend.dto.LoginRequestDto;
import com.cloudbalance.cloudbalance_backend.entity.RefreshToken;
import com.cloudbalance.cloudbalance_backend.entity.User;
import com.cloudbalance.cloudbalance_backend.service.AuthService;
import com.cloudbalance.cloudbalance_backend.service.RefreshTokenService;
import com.cloudbalance.cloudbalance_backend.utils.JwtUtils;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@Slf4j


public class AuthController {
    @Autowired
    private AuthService authService;
   @Autowired
    private JwtUtils jwtUtils;
    @Autowired
    private RefreshTokenService refreshTokenService;


    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequestDto loginRequestDto) {

        return authService.authenticate(loginRequestDto);

    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout() {
        return authService.logout();


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


    @PostMapping("/refresh")
    public ResponseEntity<?> regenerateToken(HttpServletRequest request){
//        String refreshToken = Arrays.stream(request.getCookies())
//                .filter(c -> "refreshToken".equals(c.getName()))
//                .map(Cookie::getValue)
//                .findFirst()
//                .orElseThrow(() -> new RuntimeException("Refresh token missing"));
        String refreshToken = jwtUtils.parseJwt(request,"refreshToken");

        return refreshTokenService.regenerateToken(refreshToken);

    }




}
