package com.cloudbalance.cloudbalance_backend.exception;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ApiErrorResponse {

    private int status;
    private String message;
    private Object errors;

    public ApiErrorResponse(int status, String message) {
        this.status = status;
        this.message = message;
    }
    public ApiErrorResponse(int status, String message, Object errors) {
        this.status = status;
        this.message = message;
        this.errors = errors;
    }
}
