package com.services;

import com.entities.Book;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface BookService {
    List<Book> getAll();
    Book getByIsbn(String ISBN);
    String addBook(String[] bookInfo);
    String updateBook(String[] bookInfo);
    boolean deleteById(Integer bookId);
    void deleteAll();
}
