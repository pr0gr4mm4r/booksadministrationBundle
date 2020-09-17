package com.entities;

import lombok.Data;

import javax.persistence.*;

@Table(name = "`Office`")
@Entity
@Data
public class Office {
    @Id
    @GeneratedValue
    @Column(name = "`officeId`")
    private Integer officeId;
    @Column(name = "`name`", unique = true)
    private String name;
}
