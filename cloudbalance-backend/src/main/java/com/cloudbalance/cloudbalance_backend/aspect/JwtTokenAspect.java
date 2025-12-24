package com.cloudbalance.cloudbalance_backend.aspect;

import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.stereotype.Component;

@Slf4j
@Aspect
@Component
public class JwtTokenAspect {

//    @Pointcut("execution(* com.cloudbalance.cloudbalance_backend.controller.*.*(..))")
//    public void updateTokenExpiry(){};
////    @Pointcut("execution(* com.example.librarymanagement.services.*.*(..))")
//
//    @After("updateTokenExpiry()")
//    public void resetTokenExpiry(){
//
//    }


}
