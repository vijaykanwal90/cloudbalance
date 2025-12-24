package com.cloudbalance.cloudbalance_backend.config;

import com.cloudbalance.cloudbalance_backend.interceptor.UpdateJwtToken;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@RequiredArgsConstructor
public class WebConfigure implements WebMvcConfigurer {

    private final UpdateJwtToken updateJwtToken;
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(updateJwtToken)
                .addPathPatterns("/api/**");

    }
}
