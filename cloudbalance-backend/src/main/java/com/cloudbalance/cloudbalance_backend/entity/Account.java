package com.cloudbalance.cloudbalance_backend.entity;

import jakarta.persistence.*;
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

    private String accountNumber;
    private String accountId;
    private String accountARN;
    @ManyToMany(mappedBy = "accounts")
    private Set<User> users = new HashSet<>();
}
