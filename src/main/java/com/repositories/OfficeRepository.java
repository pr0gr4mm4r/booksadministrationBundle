package com.repositories;

import com.entities.Office;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.Optional;

@CrossOrigin
@Repository
public interface OfficeRepository extends JpaRepository<Office, Integer> {
    @Query(value = "select office_id from office where name = :officeName" , nativeQuery = true)
    Optional<Integer> findIdByName(String officeName);
    @Query(value = "select name from office where name = :officeName" , nativeQuery = true)
    Optional<String> findByName(String officeName);
}
