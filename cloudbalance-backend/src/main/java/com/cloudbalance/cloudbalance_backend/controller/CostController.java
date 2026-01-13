package com.cloudbalance.cloudbalance_backend.controller;

import com.cloudbalance.cloudbalance_backend.dto.CostExplorerResponseDto;
import com.cloudbalance.cloudbalance_backend.service.CostService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/costexplorer")
public class CostController {
    private final CostService costService;


    @GetMapping("/get-keys-by-group")
    public ResponseEntity<?> getKeysByGroup(@RequestParam String group


    ) {
        return ResponseEntity.status(200).body(costService.getKeysByGroup(group));

    }

    @GetMapping("/getCost")
    public ResponseEntity<CostExplorerResponseDto> getCostByGroup(@RequestParam MultiValueMap<String, String> allParams

    ) {


        CostExplorerResponseDto response = costService.getCostByGroup(allParams);
        return ResponseEntity.status(200).body(response);
    }


}
