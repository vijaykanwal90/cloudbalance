package com.cloudbalance.cloudbalance_backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Getter
@Setter
@Table(name="aws_accounts")
public class Account {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    @Size(min=3, max=20, message="AccountName must be in between 3 and 20")
    private String accountName;

    @NotBlank(message = "Account Id is required")
    @Size(min = 12, max = 12, message = "AccountId must be exactly 12 characters")
    @Column(unique=true, nullable = false)
    private String accountId;
    @Column(nullable = false)

    private String accountARN;
    @ManyToMany(mappedBy = "accounts")
    @JsonIgnore
    private Set<User> users = new HashSet<>();
}
