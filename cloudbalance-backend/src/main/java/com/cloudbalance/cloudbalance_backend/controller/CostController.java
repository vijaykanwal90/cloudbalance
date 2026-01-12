package com.cloudbalance.cloudbalance_backend.controller;

import com.cloudbalance.cloudbalance_backend.dto.CostExplorerResponseDto;
import com.cloudbalance.cloudbalance_backend.service.CostService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.List;

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
    public ResponseEntity<CostExplorerResponseDto> getCostByGroup(@RequestParam(defaultValue = "SERVICE") String group,
                                                                  @RequestParam(required = false) List<String> service,
                                                                  @RequestParam(required = false) List<String> instanceType,
                                                                  @RequestParam(required = false) List<String> accountId,
                                                                  @RequestParam(required = false) List<String> usageType,
                                                                  @RequestParam(required = false) List<String> platform,
                                                                  @RequestParam(required = false) List<String> region,
                                                                  @RequestParam(required = false) List<String> purchaseOption,
                                                                  @RequestParam(required = false) List<String> resource,
                                                                  @RequestParam(required = false) List<String> availabilityZone,
                                                                  @RequestParam(required = false) List<String> tenancy,
                                                                  @RequestParam(required = false) List<String> legalEntity,
                                                                  @RequestParam(required = false) List<String> billingEntity,
                                                                  @RequestParam(required = false)
                                            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
                                             LocalDate startDate,

                                                                  @RequestParam(required = false)
                                                @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
                                                LocalDate endDate

    ) {

        List<String> groupValues = switch (group.toLowerCase()) {
            case "service" -> service;
            case "instance_type" -> instanceType;
            case "account_id" -> accountId;
            case "usage_type" -> usageType;
            case "platform" -> platform;
            case "region" -> region;
            case "purchase_option" -> purchaseOption;
            case "resource" -> resource;
            case "availability_zone" -> availabilityZone;
            case "tenancy" -> tenancy;
            case "legal_entity" -> legalEntity;
            case "billing_entity" -> billingEntity;
            default -> throw new IllegalArgumentException("Invalid group: " + group);
        };
        CostExplorerResponseDto response =  costService.getCostByGroup(group, groupValues, startDate, endDate);
        return ResponseEntity.status(200).body(response);
    }


}
