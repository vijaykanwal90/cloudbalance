package com.cloudbalance.cloudbalance_backend.service;

import com.cloudbalance.cloudbalance_backend.dto.CostExplorerResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.MultiValueMap;

import java.time.LocalDate;
import java.util.List;


@Service
public interface CostService {

    public CostExplorerResponseDto getCostByGroup(MultiValueMap<String, String> allParams);

    public List<String> getKeysByGroup(String group);

}
