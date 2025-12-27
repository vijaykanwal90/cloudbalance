package com.cloudbalance.cloudbalance_backend.utils;

import com.cloudbalance.cloudbalance_backend.exception.ApiErrorResponse;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.hibernate.validator.constraints.CodePointLength;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.stereotype.Component;
import tools.jackson.databind.ObjectMapper;

import java.io.IOException;
@Component
public class CustomAccessDeniedHandler implements AccessDeniedHandler {
    private final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public void handle(HttpServletRequest request, HttpServletResponse response, AccessDeniedException accessDeniedException) throws IOException, ServletException {

        ApiErrorResponse apiError = new ApiErrorResponse(
                HttpServletResponse.SC_FORBIDDEN, // for json response
                "Admin access required",
                "Unauthorized"
        );

        response.setStatus(HttpServletResponse.SC_FORBIDDEN);
        response.setContentType("application/json");


        response.getWriter().write(
                objectMapper.writeValueAsString(apiError)
        );

    }
}
