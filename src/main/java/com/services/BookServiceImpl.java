package com.services;

import com.entities.Book;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonDeserializer;
import com.repositories.BookRepository;
import com.repositories.OfficeRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Transactional
@Service
@AllArgsConstructor
public class BookServiceImpl implements BookService {
    private final BookRepository bookRepository;
    private final OfficeRepository officeRepository;
    private static final Gson gson = new GsonBuilder().registerTypeAdapter(LocalDate.class, (JsonDeserializer<LocalDate>)
            (json, type, jsonDeserializationContext) -> LocalDate.parse(json.getAsJsonPrimitive().getAsString())).create();

    @Override
    public List<Book> getAll() {
        final List<Book> bookList = bookRepository.findAll();
        for (int i = 0; i < bookList.size(); i++) {
            final LocalDate addingDate = bookList.get(i).getAddingDate();
            final LocalDate relaseDate = bookList.get(i).getReleaseDate();
            bookList.get(i).setAddingDate(addingDate.plusDays(1));
            bookList.get(i).setReleaseDate(relaseDate.plusDays(1));
        }
        return bookList;
    }

    @Override
    public Book getByIsbn(final String ISBN) {
        return bookRepository.findByISBN(ISBN);
    }

    @Override
    public String addBook(final String[] bookInfo) {
        final Book book = composeBookForAddBook(bookInfo);
        final String officeName = book.getOfficeName();
        if (officeRepository.findIdByName(officeName).isPresent()) {
            final Integer officeId = officeRepository.findIdByName(officeName).get();
            book.setIsbn(removeHyphen(book.getIsbn()));
            book.setOfficeId(officeId);
            book.setPositionDescription(book.getPositionDescription());
            bookRepository.save(book);
            return "Successful Save";
        }
        return "Office Missing";
    }

    private Book composeBookForAddBook(final String[] bookInfo) {
        final Book book = gson.fromJson(bookInfo[0], Book.class);
        String addingDateString = bookInfo[1];
        addingDateString = addingDateString.substring(0, 10);
        String releaseDateString = bookInfo[2];
        releaseDateString = releaseDateString.substring(0, 10);
        LocalDate addingDate = LocalDate.parse(addingDateString);
        LocalDate releaseDate = LocalDate.parse(releaseDateString);
        releaseDate = releaseDate.plusDays(2);
        addingDate = addingDate.plusDays(2);
        book.setAddingDate(addingDate);
        book.setReleaseDate(releaseDate);
        return book;
    }

    @Override
    public String updateBook(final String[] bookInfo) {
        final Book book;
        try {
            book = composeBookForUpdateBook(bookInfo);
        } catch (NumberFormatException e) {
            e.printStackTrace();
            return "Wrong Date";
        }
        book.setIsbn(removeHyphen(book.getIsbn()));
        if (officeRepository.findIdByName(book.getOfficeName()).isPresent()) {
            final Integer officeId = officeRepository.findIdByName(book.getOfficeName()).get();
            final String positionDescription = book.getPositionDescription();
            book.setOfficeId(officeId);
            book.setPositionDescription(positionDescription);
            bookRepository.save(book);
            return "Successful Update";
        }
        return "Office Missing";
    }

    private Book composeBookForUpdateBook(final String[] bookInfo) {
        final Book book = gson.fromJson(bookInfo[0], Book.class);
        String addingDateString = bookInfo[1];
        addingDateString = addingDateString.substring(0, 10);
        String releaseDateString = bookInfo[2];
        releaseDateString = releaseDateString.substring(0, 10);
        LocalDate addingDate = LocalDate.parse(addingDateString);
        LocalDate releaseDate = LocalDate.parse(releaseDateString);
        releaseDate = releaseDate.plusDays(1);
        addingDate = addingDate.plusDays(1);
        book.setAddingDate(addingDate);
        book.setReleaseDate(releaseDate);
        return book;
    }

    @Override
    public void deleteAll() {
        bookRepository.deleteAll();
    }

    @Override
    public boolean deleteById(final Integer bookId) {
        if (this.bookRepository.existsById(bookId)) {
            this.bookRepository.deleteById(bookId);
            return true;
        }
        return false;
    }

    public static String removeHyphen(final String ISBN) {
        final String removedHyphenString = ISBN.chars().mapToObj(i -> (char) i).filter(c -> !c.equals('-')).map(c -> c.toString()).collect(Collectors.joining());
        return removedHyphenString;
    }
}


