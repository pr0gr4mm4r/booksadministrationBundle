package com.services;

import com.entities.Role;
import com.entities.User;
import com.repositories.RoleRepository;
import com.repositories.UserRepository;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Transactional
@Service
public class UserServiceImpl implements UserDetailsService, UserService {

    public UserServiceImpl(UserRepository userRepository,
                           RoleRepository roleRepository,
                           @Lazy PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
    }

    private final UserRepository userRepository;

    private final RoleRepository roleRepository;

    private final PasswordEncoder passwordEncoder;

    @Override
    public List<String> receiveUserRolesByEmail(final String email) {
        List<Role> userRoles = this.userRepository.findOneWithRolesByEmailIgnoreCase(email).get().getUserRoles();
        return userRoles.stream().map(role -> role.getRoleName()).collect(Collectors.toList());
    }

    public User addUser(final User user) {
        user.setEnabled(true);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        final Role role = roleRepository.findByName("USER");
        user.setUserRoles(Arrays.asList(role));
        this.userRepository.save(user);
        role.getUsers().add(user);
        this.roleRepository.save(role);
        return user;
    }

    @Override
    public UserDetails loadUserByUsername(final String login) throws UsernameNotFoundException {
        Optional<User> userFromDatabase = userRepository.findOneWithRolesByEmailIgnoreCase(login);
        return userFromDatabase.map(user -> {
            List<GrantedAuthority> grantedAuthorities = user.getUserRoles().stream()
                    .map(authority -> new SimpleGrantedAuthority("ROLE_" + authority.getRoleName()))
                    .collect(Collectors.toList());
            return new org.springframework.security.core.userdetails.User(login,
                    user.getPassword(),
                    grantedAuthorities);
        }).orElseThrow(() -> new UsernameNotFoundException("User " + login + " was not found in the " +
                "database"));
    }

    @Override
    public boolean checkIfEmailPersisted(final String email) {
        if (userRepository.findOneWithRolesByEmailIgnoreCase(email).isPresent()) {
            return true;
        }
        return false;
    }

    @Override
    public boolean checkIfNamePersisted(final String name) {
        if (userRepository.findUserByName(name).isPresent()) {
            return true;
        }
        return false;
    }
}
