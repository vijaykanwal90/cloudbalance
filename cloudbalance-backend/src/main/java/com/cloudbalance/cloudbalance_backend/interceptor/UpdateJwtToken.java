//package com.cloudbalance.cloudbalance_backend.interceptor;
//
//
//import com.cloudbalance.cloudbalance_backend.utils.JwtUtils;
//import io.jsonwebtoken.Claims;
//import jakarta.servlet.http.HttpServletRequest;
//import jakarta.servlet.http.HttpServletResponse;
//import lombok.extern.slf4j.Slf4j;
//import org.jspecify.annotations.Nullable;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.http.HttpHeaders;
//import org.springframework.http.ResponseCookie;
//import org.springframework.http.ResponseEntity;
//import org.springframework.stereotype.Component;
//import org.springframework.web.servlet.HandlerInterceptor;
//import org.springframework.web.servlet.ModelAndView;
//
//import java.util.Date;
//
//@Slf4j
//@Component
//public class UpdateJwtToken implements HandlerInterceptor {
//    @Value("${spring.app.jwtExpirationMs}")
//    private int jwtExpirationMs;
//
//    @Autowired
//    JwtUtils jwtUtils;
//
//
//    @Override
//    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, @Nullable ModelAndView modelAndView) throws Exception {
//        try {
//
//            log.info("this is will run after each request now");
//            String jwtToken = jwtUtils.getJwtFromCookie(request, "accessToken");
//            if (jwtToken == null || jwtToken.isBlank()) {
//                return;
//            }
//            Claims claims = jwtUtils.extractTokenClaims(jwtToken);
//            long expirationTime = claims.getExpiration().getTime();
//            long currentTime = System.currentTimeMillis();
//            long remainingTime = expirationTime - currentTime;
//            long renewalThreshold = (long) (0.25 * jwtExpirationMs);
//            log.info(remainingTime / (1000 * 60) + "remaining time");
//            log.info((double) renewalThreshold / (1000 * 60) + "renewalThreshold");
//            if (remainingTime >= 0 && remainingTime <= (double) renewalThreshold) {
//                log.info("JWT is close to expiry, renewing token");
//                String newToken = jwtUtils.generateTokenFromClaims(claims);
//                log.info(newToken);
//                ResponseCookie cookie = ResponseCookie.from("jwtToken", newToken)
//                        .httpOnly(true)
//                        .path("/")
//                        .maxAge(jwtExpirationMs / 1000)
//                        .sameSite("Strict")
//                        .build();
//
//                response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());
//            }
//        } catch (Exception exception) {
//            log.error("Error while refreshing jwtToken :{}", exception.getMessage(), exception);
//        }
//    }
//
//}
