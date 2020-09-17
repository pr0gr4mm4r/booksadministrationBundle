package com.repositories;

import com.entities.User;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.Optional;

@CrossOrigin
@Repository
public interface UserRepository extends JpaRepository <User, Integer> {
    @Query(value = "SELECT * FROM user where name = :name", nativeQuery = true)
    Optional<User> findUserByName(@Param("name") String name);
    @EntityGraph(attributePaths = "userRoles")
    Optional<User> findOneWithRolesByEmailIgnoreCase(String email);

}
