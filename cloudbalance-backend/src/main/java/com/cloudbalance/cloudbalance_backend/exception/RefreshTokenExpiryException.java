package com.cloudbalance.cloudbalance_backend.exception;

public class RefreshTokenExpiryException extends  RuntimeException{

    public  RefreshTokenExpiryException (String msg){
        super(msg);
    }

}
