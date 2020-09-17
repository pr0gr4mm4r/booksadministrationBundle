package com.services;

import com.entities.Book;
import org.springframework.stereotype.Service;

@Service
public interface GoogleBookService {
    Book getFromApiByIsbn(String ISBN);
    String addFromGoogleBook(String ISBN, String[] officeNameAndPositionDescription);
    String updateFromGoogleBook(String ISBN, String[] officeNameAndPositionDescription);
}
