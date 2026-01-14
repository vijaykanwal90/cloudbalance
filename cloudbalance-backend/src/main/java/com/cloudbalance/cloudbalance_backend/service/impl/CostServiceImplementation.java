package com.cloudbalance.cloudbalance_backend.service.impl;

import com.cloudbalance.cloudbalance_backend.dto.CostExplorerResponseDto;
import com.cloudbalance.cloudbalance_backend.dto.MonthlyCostDto;
import com.cloudbalance.cloudbalance_backend.exception.BadRequestException;
import com.cloudbalance.cloudbalance_backend.repository.CostRepository;
import com.cloudbalance.cloudbalance_backend.service.CostService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.MultiValueMap;

import java.time.LocalDate;
import java.util.*;

@Service
@RequiredArgsConstructor
public class CostServiceImplementation implements CostService {
    private final CostRepository costRepository;

    public CostExplorerResponseDto getCostByGroup(MultiValueMap<String, String> allParams) {

        String accountId = allParams.getFirst("accountId");
        String groupBy = allParams.getFirst("group");

        String startDate = allParams.getFirst("startDate");
        String endDate = allParams.getFirst("endDate");

        if(accountId==null || accountId.isBlank()){
            throw new BadRequestException("Account Id is reqquired to fetch cost");
        }
        Map<String, List<String>> filters = new HashMap<>();


        for (Map.Entry<String, List<String>> entry : allParams.entrySet()) {
            String paramName = entry.getKey();
            List<String> paramValues = entry.getValue();


            if ("accountId".equals(paramName) || "startDate".equals(paramName) || "endDate".equals(paramName) || "group".equals(paramName)) {
                continue;
            }


            filters.put(paramName, paramValues);
        }


        List<Map<String, Object>> rows = costRepository.getCostByGroup(accountId, groupBy, filters, startDate, endDate);
        Map<String, Map<String, Long>> monthMap = new LinkedHashMap<>();

        for (Map<String, Object> row : rows) {
            String month = row.get("month").toString();
            String filter = row.get("group_value").toString();
            Long cost = ((Number) row.get("total_cost")).longValue();

            monthMap
                    .computeIfAbsent(month, m -> new HashMap<>())
                    .put(filter, cost);
        }
        List<MonthlyCostDto> monthlyData = monthMap.entrySet().stream()
                .map(e -> new MonthlyCostDto(e.getKey(), e.getValue()))
                .toList();


        return new CostExplorerResponseDto(groupBy, monthlyData);
    }

    public List<String> getKeysByGroup(String group) {
        List<String> result = costRepository.getKeysByGroup(group);
        return result;
    }


}
