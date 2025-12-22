package com.cloudbalance.cloudbalance_backend.interceptor;


import com.cloudbalance.cloudbalance_backend.utils.JwtUtils;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.jspecify.annotations.Nullable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

@Slf4j
@Component
public class updateJwtToken implements HandlerInterceptor {

    @Autowired
     JwtUtils jwtUtils;
    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, @Nullable Exception ex) throws Exception {
       log.info("in after completion");
        String jwt = jwtUtils.getJwtFromCookie(request);
        log.info(jwt);



    }


}
