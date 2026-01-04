package com.cloudbalance.cloudbalance_backend.service;

import com.cloudbalance.cloudbalance_backend.entity.RefreshToken;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public interface RefreshTokenService {

    public ResponseEntity<?> regenerateToken(String token);
    public Boolean verifyExpiration(RefreshToken token);
//  public Optional<RefreshToken> findByToken(String refreshToken);
    public RefreshToken createRefreshToken(Long id);
    public String getRefreshToken(Long id);
    public void deleteRefreshToken(String refreshToken);
    public void deleteByUserId(Long id);
}
