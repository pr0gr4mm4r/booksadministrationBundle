package com.repositories;

import com.entities.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@CrossOrigin
@Repository
public interface BookRepository extends JpaRepository<Book, Integer> {
    @Query(value = "SELECT * FROM book", nativeQuery = true)
    List<Book> findAll();

    @Query(value = "SELECT * FROM book WHERE ISBN = :ISBN", nativeQuery = true)
    Book findByISBN(@Param("ISBN") String ISBN);
}
