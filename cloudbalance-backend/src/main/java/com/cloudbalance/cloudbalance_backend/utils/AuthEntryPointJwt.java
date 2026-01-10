package com.cloudbalance.cloudbalance_backend.utils;

import com.cloudbalance.cloudbalance_backend.exception.ApiErrorResponse;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;
import tools.jackson.databind.ObjectMapper;

import java.io.IOException;
@Component
public class AuthEntryPointJwt  implements AuthenticationEntryPoint {
    private final ObjectMapper objectMapper = new ObjectMapper();
    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException, ServletException {
        response.setContentType("application/json;charset=UTF-8");
        ApiErrorResponse apiError = new ApiErrorResponse(
                HttpServletResponse.SC_UNAUTHORIZED, // for json response
                authException.getMessage(),
                "Access Denied"
        );

        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED); // for network layer
        response.setContentType("application/json");

        response.getWriter().write(
                objectMapper.writeValueAsString(apiError)
        );

    }
}
