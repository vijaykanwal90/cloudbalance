package com.cloudbalance.cloudbalance_backend.service.impl;

import com.cloudbalance.cloudbalance_backend.dto.CostExplorerResponseDto;
import com.cloudbalance.cloudbalance_backend.dto.MonthlyCostDto;
import com.cloudbalance.cloudbalance_backend.repository.CostRepository;
import com.cloudbalance.cloudbalance_backend.service.CostService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
@Service
@RequiredArgsConstructor
public class CostServiceImplementation  implements CostService {
    private final CostRepository costRepository;
    public CostExplorerResponseDto getCostByGroup(String groupBy, List<String> groupValues, LocalDate startDate, LocalDate endDate){
        List<Map<String, Object>> rows = costRepository.getCostByGroup(groupBy , groupValues, startDate, endDate);
        Map<String, Map<String, Long>> monthMap = new LinkedHashMap<>();

        for (Map<String, Object> row : rows) {
            String month = row.get("month").toString();
            String filter = row.get("group_value").toString();
            Long cost = ((Number) row.get("total_cost")).longValue();

            monthMap
                    .computeIfAbsent(month, m -> new HashMap<>())
                    .put(filter, cost);
        }
        List<MonthlyCostDto> monthlyData =  monthMap.entrySet().stream()
                .map(e -> new MonthlyCostDto(e.getKey(), e.getValue()))
                .toList();


        return new CostExplorerResponseDto(groupBy, monthlyData);
    }

    public List<String> getKeysByGroup(String group){
        List<String> result = costRepository.getKeysByGroup(group);
        return result;
    }


}
