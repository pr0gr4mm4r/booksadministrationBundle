package com.services;

import com.entities.User;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface UserService {
    User addUser(User user);
    List<String> receiveUserRolesByEmail(String email);
    boolean checkIfEmailPersisted(String email);
    boolean checkIfNamePersisted(String name);
}
