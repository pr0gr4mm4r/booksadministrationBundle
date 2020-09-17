package com.entities;

import lombok.Data;

import javax.persistence.*;
import java.time.LocalDate;

@Table(name = "`Book`")
@Entity
@Data
public class Book {
    @Id
    @GeneratedValue
    @Column(name = "`bookId`")
    private Integer id;
    @Column(name = "`ISBN`")
    private String isbn;
    @Column(name = "`addingDate`")
    private LocalDate addingDate;
    @Column(name = "`description`")
    private String description;
    @Column(name = "`title`")
    private String title;
    @Column(name = "`author`")
    private String author;
    @Column(name = "`publisher`")
    private String publisher;
    @Column(name = "`releaseDate`")
    private LocalDate releaseDate;
    @Column(name = "`pageCount`")
    private Integer pageCount;
    @Column(name = "`officeId`")
    private Integer officeId;
    @Column(name = "`positionDescription`")
    private String positionDescription;
    @Transient
    @Column(name = "`officeName`")
    private String officeName;
}
