package com.cloudbalance.cloudbalance_backend.controller;

import com.cloudbalance.cloudbalance_backend.dto.LoginRequestDto;
import com.cloudbalance.cloudbalance_backend.utils.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")

public class AuthController {
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    JwtUtils jwtUtils;
    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequestDto loginRequestDto){
        Authentication authentication;
        try{

            String email = loginRequestDto.getEmail();
            String password = loginRequestDto.getPassword();
            authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(email,password));


        } catch (Exception e) {
            System.out.println("got error "+e);
            return ResponseEntity.status(401).build();
//            throw new RuntimeException(e);
        }

        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        System.out.println("User details " + userDetails);
        SecurityContextHolder.getContext().setAuthentication(authentication);
        System.out.println("before generating token");
        String jwtToken = jwtUtils.generateTokenFromEmail(userDetails);
//        List<String> roles = userDetails.getAuthorities().stream()
//                .map(item -> item.getAuthority())
//                .collect(Collectors.toList());
//        String role = roles.get(0);
        System.out.println("In login");

//        LoginResponseDto response = new LoginResponseDto(userDetails.getUsername(), role, jwtToken);
        ResponseCookie cookie = ResponseCookie.from("jwtToken", jwtToken)
                .httpOnly(true)
                .secure(true)
                .path("/")
                .maxAge(3600)
                .sameSite("Strict")
                .build();

        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, cookie.toString())
                .body("Login successful");

    }



}
