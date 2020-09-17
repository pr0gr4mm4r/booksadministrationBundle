package com.controllers;

import com.entities.User;
import com.services.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping(value = "/addUser", consumes = MediaType.APPLICATION_JSON_VALUE)
    public User saveUser(@RequestBody User user) {
        userService.addUser(user);
        return user;
    }

    @GetMapping("/userRolesByEmail/{email}")
    public List<String> userRolesByEmail(@PathVariable(value = "email") String email) {
        return this.userService.receiveUserRolesByEmail(email);
    }

    @GetMapping(value = "/checkIfEmailPersisted/{email}")
    public boolean checkIfEmailPersisted(@PathVariable(value = "email") String email) {
        return this.userService.checkIfEmailPersisted(email);
    }

    @GetMapping(value = "/checkIfNamePersisted/{name}")
    public boolean checkIfNamePersisted(@PathVariable(value = "name") String name) {
        return this.userService.checkIfNamePersisted(name);
    }
}
