package com.cloudbalance.cloudbalance_backend.service;

import com.cloudbalance.cloudbalance_backend.dto.CostExplorerResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;


@Service
public interface CostService {

    public CostExplorerResponseDto getCostByGroup(String groupBy, List<String> groupValues, LocalDate startDate, LocalDate endDate);

    public List<String> getKeysByGroup(String group);

}
