package com.services;

import com.entities.Book;
import com.github.wnameless.json.flattener.JsonFlattener;
import com.repositories.BookRepository;
import com.repositories.OfficeRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.UnexpectedRollbackException;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDate;
import java.util.Map;
import java.util.NoSuchElementException;

import static com.services.BookServiceImpl.removeHyphen;
import static java.lang.Integer.valueOf;

@Transactional
@Service
@AllArgsConstructor
public class GoogleBookServiceImpl implements GoogleBookService {

    private final BookRepository bookRepository;

    private final OfficeRepository officeRepository;

    /**
     * returns the string value to a matching key in which the key is determined by the passed keyword
     *
     * @param keyword
     * @param jsonStringAsMap
     */
    public static String extractByKeyword(final String keyword, final Map<String, Object> jsonStringAsMap) {
        return jsonStringAsMap.entrySet().stream().filter(entry -> entry.getKey().contains(keyword)).map(Map.Entry::getValue).findFirst().get().toString();
    }

    public static LocalDate parseStringToDate(final String dateString) {
        LocalDate date = null;
        try {
            date = LocalDate.parse(dateString);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return date;
    }

    /**
     * composes and returns a new book object out of the passed String Array "bookAttribute"
     *
     * @param bookAttributes stores the field values of the new book
     */
    public static Book composeBook(final String[] bookAttributes) {
        final Book book = new Book();
        final LocalDate parsedDate = parseStringToDate(bookAttributes[3]);
        final Integer parsedPageCount = valueOf(bookAttributes[5]);
        book.setTitle(bookAttributes[0]);
        book.setAuthor(bookAttributes[1]);
        book.setPublisher(bookAttributes[2]);
        book.setAddingDate(LocalDate.now().plusDays(1));
        book.setReleaseDate(parsedDate.plusDays(1));
        book.setDescription(bookAttributes[4]);
        book.setPageCount(parsedPageCount);
        return book;
    }

    /**
     * returns a book by ISBN based on "Google Books API"
     *
     * @param ISBN
     */
    @Override
    public Book getFromApiByIsbn(final String ISBN) {
        final RestTemplate restTemplate = new RestTemplate();
        final String jsonString = restTemplate.getForObject("https://www.googleapis.com/books/v1/volumes?q=isbn:" + ISBN, String.class);
        final Map<String, Object> jsonStringAsMap = JsonFlattener.flattenAsMap(jsonString);
        final String[] keywords = {"title", "authors", "publisher", "publishedDate", "description", "pageCount"};
        final String[] keywordsContainer = new String[keywords.length];
        for (int i = 0; i < 6; i++) {
            keywordsContainer[i] = extractByKeyword(keywords[i], jsonStringAsMap);
        }
        final Book book = composeBook(keywordsContainer);
        book.setIsbn(removeHyphen(ISBN));
        return book;
    }

    @Override
    public String addFromGoogleBook(final String ISBN, final String[] officeNameAndPositionDescription) {
        try {
            final String officeName = officeNameAndPositionDescription[0];
            if (officeRepository.findIdByName(officeName).isPresent()) {
                final Book book = this.getFromApiByIsbn(ISBN);
                final String positionDescription = officeNameAndPositionDescription[1];
                final Integer officeId = officeRepository.findIdByName(officeName).get();
                book.setOfficeId(officeId);
                book.setPositionDescription(positionDescription);
                this.bookRepository.save(book);
                return "Successful Save";
            }
            return "Office Missing";
        } catch (NoSuchElementException e) {
            e.printStackTrace();
            return "Google Books API can not find a matching book for this ISBN.";
        } catch (UnexpectedRollbackException s) {
            s.printStackTrace();
            return "Unexpected Rollback!";
        }
    }

    @Override
    public String updateFromGoogleBook(final String ISBN, final String[] officeNameAndPositionDescription) {
        final String officeName = officeNameAndPositionDescription[0];
        if (officeRepository.findIdByName(officeName).isPresent()) {
            final String positionDescription = officeNameAndPositionDescription[1];
            final Integer officeId = officeRepository.findIdByName(officeName).get();
            final Book book = this.getFromApiByIsbn(ISBN);
            book.setIsbn(removeHyphen(book.getIsbn()));
            book.setPositionDescription(positionDescription);
            book.setOfficeId(officeId);
            final Book bookFromRepo = bookRepository.findByISBN(book.getIsbn());
            final int id = bookFromRepo.getId();
            book.setId(id);
            bookRepository.save(book);
            return "Successful Update";
        }
        return "Place and Office missing";
    }
}
