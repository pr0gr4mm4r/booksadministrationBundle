package com.entities;

import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Table(name = "`User`")
@Entity
@Data
public class User {
    @Id
    @Column(name = "`userId`")
    @GeneratedValue
    private Integer id;
    @ManyToMany(mappedBy = "users")
    private List<Role> userRoles;
    @Column(name = "`name`", unique = true)
    private String name;
    @Column(name = "`email`", unique = true)
    private String email;
    @Column(name = "`password`")
    private String password;
    @Column(name = "enabled")
    private boolean enabled;
}
