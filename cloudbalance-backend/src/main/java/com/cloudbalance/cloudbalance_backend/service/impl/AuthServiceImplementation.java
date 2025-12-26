package com.cloudbalance.cloudbalance_backend.service.impl;

import com.cloudbalance.cloudbalance_backend.dto.LoginRequestDto;
import com.cloudbalance.cloudbalance_backend.entity.RefreshToken;
import com.cloudbalance.cloudbalance_backend.entity.User;
import com.cloudbalance.cloudbalance_backend.service.AuthService;
import com.cloudbalance.cloudbalance_backend.service.RefreshTokenService;
import com.cloudbalance.cloudbalance_backend.utils.JwtUtils;
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

@Slf4j
@Service
public class AuthServiceImplementation implements AuthService {
    @Value("${spring.app.jwtExpirationMs}")
    private int jwtExpirationMs;
    @Value("${spring.app.refreshTokenDurationMs}")
    private int refreshTokenDurationMs;


    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private JwtUtils jwtUtils;
    @Autowired
    private RefreshTokenService refreshTokenService;
    @Override
    public ResponseEntity<?> authenticate(LoginRequestDto loginRequestDto) {

        try {

            String email = loginRequestDto.getEmail();
            String password = loginRequestDto.getPassword();
            Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(email, password));
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            SecurityContextHolder.getContext().setAuthentication(authentication);
            String role = jwtUtils.extractRole(userDetails);
            String accesstoken = jwtUtils.generateTokenFromEmailAndRole(userDetails.getUsername(),role );

            User user = (User) authentication.getPrincipal();
            Long userId = user.getId();
            refreshTokenService.deleteByUserId(user.getId());
            RefreshToken refreshtoken = refreshTokenService.createRefreshToken(userId);
            String  refreshTokenValue = refreshtoken.getToken();
            ResponseCookie accessToken = ResponseCookie.from("accessToken", accesstoken)
                    .httpOnly(true)
                    .path("/")
                    .maxAge(jwtExpirationMs / 1000)
                    .sameSite("Strict")
                    .build();
            ResponseCookie refreshToken = ResponseCookie.from("refreshToken", refreshTokenValue)
                    .httpOnly(true)
                    .path("/")
                    .maxAge(refreshTokenDurationMs / 1000)
                    .sameSite("Strict")
                    .build();
            return ResponseEntity.ok()
                    .header(HttpHeaders.SET_COOKIE, accessToken.toString())
                    .header(HttpHeaders.SET_COOKIE, refreshToken.toString())

                    .body("Login successful");
        } catch (Exception e) {
           log.error( " error while login " + e);
            return ResponseEntity.status(401).build();
        }
    }

    @Override
  @Transactional
    public ResponseEntity<?> logout(){
        User user= (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Long userId = user.getId();
        refreshTokenService.deleteByUserId(userId);

        ResponseCookie accessTokenCookie = ResponseCookie
                .from("accessToken", "")
                .httpOnly(true)
                .secure(true)
                .sameSite("None")
                .path("/")
                .maxAge(0)
                .build();

        ResponseCookie refreshTokenCookie = ResponseCookie
                .from("refreshToken", "")
                .httpOnly(true)
                .secure(true)
                .sameSite("None")
                .path("/")
                .maxAge(0)
                .build();

        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, accessTokenCookie.toString())
                .header(HttpHeaders.SET_COOKIE, refreshTokenCookie.toString())
                .body("Logout successful");

    }
    @Override
    public boolean checkIsLoggedIn(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        return authentication != null
                && authentication.isAuthenticated()
                && !(authentication instanceof AnonymousAuthenticationToken);
    }


}
