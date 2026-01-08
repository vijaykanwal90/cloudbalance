package com.cloudbalance.cloudbalance_backend.repository;

import com.cloudbalance.cloudbalance_backend.entity.Account;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AccountRepository extends JpaRepository<Account, Long> {

    Boolean existsAccountByAccountId(String accountId);
}
