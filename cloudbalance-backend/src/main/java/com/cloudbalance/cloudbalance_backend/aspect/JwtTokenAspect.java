package com.cloudbalance.cloudbalance_backend.aspect;

import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;

@Slf4j
@Aspect
public class JwtToken {

    @Pointcut("execution(* com.cloudbalance.cloudbalance_backend.controller.*.*(..))")
    public void updateTokenExpiry(){};
//    @Pointcut("execution(* com.example.librarymanagement.services.*.*(..))")

    @After("updateTokenExpiry()")
    public void resetTokenExpiry(){
        System.out.println("here");
        log.info("reseting token expiry");
    }


}
