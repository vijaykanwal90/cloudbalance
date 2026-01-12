package com.cloudbalance.cloudbalance_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Map;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MonthlyCostDto {
    private String month;
    private Map<String, Long> filters;
}

