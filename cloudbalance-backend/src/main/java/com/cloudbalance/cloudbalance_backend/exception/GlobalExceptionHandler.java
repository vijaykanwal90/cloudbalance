package com.cloudbalance.cloudbalance_backend.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiErrorResponse> handleValidationException(
            MethodArgumentNotValidException ex) {

        Map<String, String> errors = new HashMap<>();

        ex.getBindingResult().getFieldErrors().forEach(error ->
                errors.put(error.getField(), error.getDefaultMessage())
        );

        ApiErrorResponse response = new ApiErrorResponse(
                HttpStatus.BAD_REQUEST.value(),
                "Validation failed",
                errors
        );

        return ResponseEntity.badRequest().body(response);
    }

    @ExceptionHandler(UsernameNotFoundException.class)
    public ResponseEntity<ApiErrorResponse> handleBadCredentials(UsernameNotFoundException ex) {


        ApiErrorResponse response = new ApiErrorResponse(
                HttpStatus.BAD_REQUEST.value(),

                "Authentication Failed",
                "Username or password is not correct"
        );

        return ResponseEntity.status(400).body(response);
    }
    @ExceptionHandler(BadRequestException.class)
    public ResponseEntity<ApiErrorResponse> handleBadRequestException(BadRequestException ex) {


        ApiErrorResponse response = new ApiErrorResponse(
                HttpStatus.BAD_REQUEST.value(),
                ex.getMessage()
        );

        return ResponseEntity.status(400).body(response);
    }

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ApiErrorResponse> handleResourceNotFoundException(ResourceNotFoundException ex) {
        ApiErrorResponse response = new ApiErrorResponse(
                HttpStatus.NOT_FOUND.value(),
                ex.getMessage(),
                "Request Data not found"
        );

        return ResponseEntity.status(404).body(response);
    }

    @ExceptionHandler(ResourceAlreadyExistException.class)
    public ResponseEntity<ApiErrorResponse> handleResourceAlreadyExist(ResourceAlreadyExistException ex) {
        ApiErrorResponse response = new ApiErrorResponse(
                HttpStatus.BAD_REQUEST.value(),
                ex.getMessage(),
                "Resource already exist"
        );

        return ResponseEntity.status(400).body(response);
    }

    @ExceptionHandler(RefreshTokenExpiryException.class)
    public ResponseEntity<ApiErrorResponse> handleRefreshTokenExpiryException(RefreshTokenExpiryException ex) {
        ApiErrorResponse response = new ApiErrorResponse(
                HttpStatus.UNAUTHORIZED.value(),
                ex.getMessage(),
                "Refresh token expired, Please login again "
        );

        return ResponseEntity.status(401).body(response);
    }
}

//
//Why we need both
//
//HTTP status code (in ResponseEntity) → Tells the browser or HTTP client what the result of the request is (200, 400, 500, etc.)
//
//Status in JSON body → Makes it easier for your frontend/app to parse and show custom messages.
//
//  In short: one is transport-level, one is application-level.