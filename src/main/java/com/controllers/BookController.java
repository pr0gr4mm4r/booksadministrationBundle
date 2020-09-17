package com.controllers;

import com.entities.Book;
import com.services.BookService;
import com.services.GoogleBookService;
import lombok.AllArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
public class BookController {

    private final BookService bookService;

    private final GoogleBookService googleBookService;

    @GetMapping(value = "/all")
    public List<Book> getAll() {
        return bookService.getAll();
    }

    @GetMapping(value = "/{ISBN}")
    public Book getByIsbn(@PathVariable("ISBN") String ISBN) {
        return bookService.getByIsbn(ISBN);
    }

    @GetMapping(value = "/google/{ISBN}")
    public Book getByIsbnGoogle(@PathVariable("ISBN") String ISBN) {
        return googleBookService.getFromApiByIsbn(ISBN);
    }

    @PostMapping(value = "/google/create/{ISBN}", consumes = MediaType.APPLICATION_JSON_VALUE)
    public String insertBookGoogle(@PathVariable("ISBN") String ISBN, @RequestBody String[] officeNameAndPositionDescription) {
        return googleBookService.addFromGoogleBook(ISBN, officeNameAndPositionDescription);
    }

    @PutMapping(value = "/google/update/{ISBN}", consumes = MediaType.APPLICATION_JSON_VALUE)
    public String updateBookGoogle(@PathVariable("ISBN") String ISBN, @RequestBody String[] bookAndPlaceData) {
        return googleBookService.updateFromGoogleBook(ISBN, bookAndPlaceData);
    }

    @PostMapping(value = "/create", consumes = MediaType.ALL_VALUE)
    public String insertBook(@RequestBody String[] bookInfo) {
        return this.bookService.addBook(bookInfo);
    }

    @PutMapping(value = "/update", consumes = MediaType.ALL_VALUE)
    public String updateBook(@RequestBody String[] bookInfo) {
        return bookService.updateBook(bookInfo);
    }

    @DeleteMapping(value = "/delete/{bookId}")
    public boolean delete(@PathVariable("bookId") Integer bookId) {
        return bookService.deleteById(bookId);
    }

    @DeleteMapping(value = "/deleteAll")
    public boolean delete() {
        bookService.deleteAll();
        return true;
    }
}
