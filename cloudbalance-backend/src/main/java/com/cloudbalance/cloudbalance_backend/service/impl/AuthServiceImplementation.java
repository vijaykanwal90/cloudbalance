package com.cloudbalance.cloudbalance_backend.service.impl;

import com.cloudbalance.cloudbalance_backend.dto.LoginRequestDto;
import com.cloudbalance.cloudbalance_backend.service.AuthService;
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
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class AuthServiceImplementation implements AuthService {
    @Value("${spring.app.jwtExpirationMs}")
    private int jwtExpirationMs;

    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private JwtUtils jwtUtils;
    @Override
    public ResponseEntity<?> authenticate(LoginRequestDto loginRequestDto) {

        try {

            String email = loginRequestDto.getEmail();
            String password = loginRequestDto.getPassword();
            Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(email, password));
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            SecurityContextHolder.getContext().setAuthentication(authentication);
            String jwtToken = jwtUtils.generateTokenFromEmail(userDetails);
            ResponseCookie cookie = ResponseCookie.from("jwtToken", jwtToken)
                    .httpOnly(true)
                    .path("/")
                    .maxAge(jwtExpirationMs / 1000)
                    .sameSite("Strict")
                    .build();
            return ResponseEntity.ok()
                    .header(HttpHeaders.SET_COOKIE, cookie.toString())
                    .body("Login successful");
        } catch (Exception e) {

            return ResponseEntity.status(401).build();
        }
    }

    @Override
    public ResponseCookie logout(){
        ResponseCookie cookie = ResponseCookie
                .from("jwtToken", "")
                .httpOnly(true)
                .secure(true)          // must match login cookie
                .sameSite("None")      // if you used it during login
                .path("/")
                .maxAge(0)
                .build();
        return cookie;
    }
    @Override
    public boolean checkIsLoggedIn(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        return authentication != null
                && authentication.isAuthenticated()
                && !(authentication instanceof AnonymousAuthenticationToken);
    }


}
