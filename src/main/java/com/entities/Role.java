package com.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import javax.persistence.*;
import java.util.List;

@Table(name = "`Role`")
@Entity
@Data
public class Role {
    @Id
    @GeneratedValue
    @Column(name = "`roleId`")
    private Integer id;
    @Column(name = "`roleName`")
    private String roleName;
    @JsonIgnore
    @JoinTable(
            name = "Userrole",
            joinColumns = @JoinColumn(name = "`roleId`", foreignKey = @ForeignKey(name = "roleIdReference")),
            inverseJoinColumns = @JoinColumn(name = "`userId`", foreignKey = @ForeignKey(name = "userIdReference"))
    )
    @ManyToMany
    private List<User> users;
}
