package com.cloudbalance.cloudbalance_backend.exception;

public class AuthenticationCredentialsNotFoundException extends RuntimeException {
    public AuthenticationCredentialsNotFoundException(String message) {
        super(message);
    }
}
