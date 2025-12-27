package com.cloudbalance.cloudbalance_backend.controller;

import com.cloudbalance.cloudbalance_backend.dto.LoginRequestDto;
import com.cloudbalance.cloudbalance_backend.dto.UserResponseDto;
import com.cloudbalance.cloudbalance_backend.entity.RefreshToken;
import com.cloudbalance.cloudbalance_backend.entity.User;
import com.cloudbalance.cloudbalance_backend.service.AuthService;
import com.cloudbalance.cloudbalance_backend.service.RefreshTokenService;
import com.cloudbalance.cloudbalance_backend.utils.JwtUtils;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
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

@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    private final JwtUtils jwtUtils;

    private final RefreshTokenService refreshTokenService;


    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid  @RequestBody LoginRequestDto loginRequestDto) {

        return authService.authenticate(loginRequestDto);

    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout() {
        return authService.logout();


    }

    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser() {
        UserResponseDto user  = authService.getCurrentUser();

        if (user==null) {
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("loggedIn", false));
        }

        return ResponseEntity.status(200).body(user);
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
