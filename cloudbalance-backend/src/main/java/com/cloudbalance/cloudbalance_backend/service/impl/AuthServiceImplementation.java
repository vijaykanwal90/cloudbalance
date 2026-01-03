package com.cloudbalance.cloudbalance_backend.service.impl;

import com.cloudbalance.cloudbalance_backend.dto.LoginRequestDto;
import com.cloudbalance.cloudbalance_backend.dto.UserResponseDto;
import com.cloudbalance.cloudbalance_backend.entity.RefreshToken;
import com.cloudbalance.cloudbalance_backend.entity.Role;
import com.cloudbalance.cloudbalance_backend.entity.User;
import com.cloudbalance.cloudbalance_backend.repository.UserRepository;
import com.cloudbalance.cloudbalance_backend.service.AuthService;
import com.cloudbalance.cloudbalance_backend.service.RefreshTokenService;
import com.cloudbalance.cloudbalance_backend.utils.JwtUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.authorization.method.AuthorizeReturnObject;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.time.LocalDateTime;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthServiceImplementation implements AuthService {
    @Value("${spring.app.jwtExpirationMs}")
    private int jwtExpirationMs;
    @Value("${spring.app.refreshTokenDurationMs}")
    private int refreshTokenDurationMs;



    private final AuthenticationManager authenticationManager;
    private final  JwtUtils jwtUtils;
    private final UserRepository userRepository;

    private final RefreshTokenService refreshTokenService;
    @Override
    @Transactional
    public ResponseEntity<?> authenticate(LoginRequestDto loginRequestDto) {

            String email = loginRequestDto.getEmail();
            String password = loginRequestDto.getPassword();
            Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(email, password));
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            SecurityContextHolder.getContext().setAuthentication(authentication);
            String role = jwtUtils.extractRole(userDetails);
            String accesstoken = jwtUtils.generateTokenFromEmailAndRole(userDetails.getUsername(),role );

            User user = (User) authentication.getPrincipal();
            user.setLastLogin(Instant.now());
            userRepository.save(user);
            Long userId = user.getId();
//              refreshTokenService.deleteRefreshToken()
//            refreshTokenService.deleteByUserId(user.getId());
            RefreshToken refreshtoken = refreshTokenService.createRefreshToken(userId);
            String  refreshTokenValue = refreshtoken.getToken();
            ResponseCookie accessToken = ResponseCookie.from("accessToken", accesstoken)
                    .httpOnly(true)
                    .path("/")
                    .maxAge(jwtExpirationMs / 1000)
                    .sameSite("Lax")
                    .build();
            ResponseCookie refreshToken = ResponseCookie.from("refreshToken", refreshTokenValue)
                    .httpOnly(true)
                    .path("/")
                    .maxAge(refreshTokenDurationMs / 1000)
                    .sameSite("Lax")
                    .build();
            return ResponseEntity.ok()
                    .header(HttpHeaders.SET_COOKIE, accessToken.toString())
                    .header(HttpHeaders.SET_COOKIE, refreshToken.toString())
                    .body("Login successful");

    }

    @Override
  @Transactional
    public ResponseEntity<?> logout(String refreshToken){
        User user= (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Long userId = user.getId();
//        String refreshToken= refreshTokenService.getRefreshToken(userId);
        refreshTokenService.deleteRefreshToken(refreshToken);

        ResponseCookie accessTokenCookie = ResponseCookie
                .from("accessToken", "")
                .httpOnly(true)
                .secure(true)
                .sameSite("Lax")
                .path("/")
                .maxAge(0)
                .build();

        ResponseCookie refreshTokenCookie = ResponseCookie
                .from("refreshToken", "")
                .httpOnly(true)
                .secure(true)
                .sameSite("Lax")
                .path("/")
                .maxAge(0)
                .build();

        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, accessTokenCookie.toString())
                .header(HttpHeaders.SET_COOKIE, refreshTokenCookie.toString())
                .body("Logout successful");

    }
    @Override
    public UserResponseDto getCurrentUser(){
        UserResponseDto user = new UserResponseDto();
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User userDetails = (User) authentication.getPrincipal();
        user.setFirstName(userDetails.getFirstName());
        user.setLastName(userDetails.getLastName());
        user.setEmail(userDetails.getEmail());
        user.setRole(userDetails.getRole().toString());
        user.setLastLogin(userDetails.getLastLogin());
        return user;
    }




}
