package com.cloudbalance.cloudbalance_backend.service.impl;

import com.cloudbalance.cloudbalance_backend.entity.RefreshToken;
import com.cloudbalance.cloudbalance_backend.entity.Role;
import com.cloudbalance.cloudbalance_backend.entity.User;
import com.cloudbalance.cloudbalance_backend.repository.RefreshTokenRepository;
import com.cloudbalance.cloudbalance_backend.repository.UserRepository;
import com.cloudbalance.cloudbalance_backend.service.RefreshTokenService;
import com.cloudbalance.cloudbalance_backend.utils.JwtUtils;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.lang.Long;

import java.time.Instant;
import java.util.Optional;
import java.util.UUID;

@Service
public class RefreshServiceImpl implements RefreshTokenService {
    @Value("${spring.app.refreshTokenDurationMs}")
    private Long refreshTokenDurationMs;

    @Value("${spring.app.jwtExpirationMs}")
    private Long jwtExpirationMs;

    @Autowired
    private JwtUtils jwtUtils;
    @Autowired
    private AuthenticationManager authenticationManager;
    //    @Autowired
//    private RefreshTokenService refreshTokenService;
    @Autowired
    private RefreshTokenRepository refreshTokenRepository;
    @Autowired
    private UserRepository userRepository;

    @Override
    @Transactional
    public ResponseEntity<?> regenerateToken(String refreshToken) {
        // Find refresh token or throw exception
        RefreshToken refreshtoken = refreshTokenRepository.findByToken(refreshToken)
                .orElseThrow(() -> new RuntimeException("Refresh token is not in database!"));

        // Verify expiration
        if (!verifyExpiration(refreshtoken)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Refresh token expired. Please login again");
        }

        // Get user details
        User user = refreshtoken.getUser();
        String role = user.getRole().name();

        // Generate new access token
        String newAccessToken = jwtUtils.generateTokenFromEmailAndRole(user.getEmail(), role);

        // Delete old refresh token and create new one
        deleteByUserId(user.getId());
        String newrefreshToken = createRefreshToken(user.getId()).getToken();

        // Create response cookies
        ResponseCookie responseAccessToken = ResponseCookie
                .from("accessToken", newAccessToken)
                .httpOnly(true)
                .secure(true)  // Added for production
                .path("/")
                .maxAge(jwtExpirationMs / 1000)
                .sameSite("None")  // Changed from Strict for cross-site requests
                .build();

        ResponseCookie responseRefreshToken = ResponseCookie
                .from("refreshToken", newrefreshToken)
                .httpOnly(true)
                .secure(true)  // Added for production
                .path("/")
                .maxAge(refreshTokenDurationMs / 1000)
                .sameSite("None")  // Changed from Strict for cross-site requests
                .build();

        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, responseAccessToken.toString())
                .header(HttpHeaders.SET_COOKIE, responseRefreshToken.toString())
                .body("Access token regenerated successfully");
    }

    @Transactional
    public RefreshToken createRefreshToken(Long id) {

        RefreshToken refreshToken = new RefreshToken();

        refreshToken.setToken(UUID.randomUUID().toString());
        refreshToken.setExpiryDate(Instant.now().plusMillis(refreshTokenDurationMs));

        refreshToken.setUser(userRepository.findById(id).get());
        refreshTokenRepository.save(refreshToken);
        return refreshToken;
    }

    @Override
    public Boolean verifyExpiration(RefreshToken token) {
        if (token.getExpiryDate().compareTo(Instant.now()) < 0) {
            refreshTokenRepository.delete(token);
            throw new RuntimeException("Refresh token was expired. Please make a new signin request");
        }

        return true;

    }

    @Override
    public Optional<RefreshToken> findByToken(String refreshToken) {
        return null;
    }

    public void updateTokenExpiry(RefreshToken refreshToken) {
        refreshToken.setExpiryDate(Instant.now().plusMillis(refreshTokenDurationMs));
        refreshTokenRepository.save(refreshToken);

    }

    @Override
    public String getRefreshToken(Long id) {
        return "";
    }

    @Override
    @Transactional
    public void deleteByUserId(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));

        refreshTokenRepository.deleteByUser(user);
        refreshTokenRepository.flush();
    }



}
