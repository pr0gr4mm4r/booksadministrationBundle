package com.services;

import com.github.wnameless.json.flattener.JsonFlattener;
import com.repositories.BookRepository;
import com.repositories.OfficeRepository;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.util.Map;

import static com.services.GoogleBookServiceImpl.extractByKeyword;
import static org.junit.Assert.*;

public class GoogleBookServiceImplUnitTest {

    @MockBean
    private BookRepository bookRepository;

    @MockBean
    private OfficeRepository officeRepository;

    @InjectMocks
    private GoogleBookServiceImpl googleBookService;

   /* @Test
    public void testComposeBookPositive() {
        //Given
        final Date parsedDate = parseStringToDate("2000-12-12");
        final Integer parsedPageCount = 100;

        Book book = new Book();
        book.setTitle("title");
        book.setAuthor("author");
        book.setPublisher("publisher");
        book.setReleaseDate(parsedDate);
        book.setDescription("description");
        book.setPageCount(parsedPageCount);

        //when
        String[] bookAttributesImpl = {"title", "author", "publisher", "2000-12-12", "description", "100"};

        //then
        Book bookFromMethod = composeBook(bookAttributesImpl);
        assertEquals(bookFromMethod.getTitle(), book.getTitle());
        assertEquals(bookFromMethod.getAuthor(), book.getAuthor());
        assertEquals(bookFromMethod.getPublisher(), book.getPublisher());
        assertEquals(bookFromMethod.getReleaseDate(), book.getReleaseDate());
        assertEquals(bookFromMethod.getDescription(), book.getDescription());
        assertEquals(bookFromMethod.getPageCount(), book.getPageCount());
    }

    @Test
    public void testComposeBookNegativeInvalidPageCount() {
        //Given
        final Date parsedDate = parseStringToDate("2000-12-12");
        final Integer parsedPageCount = 100;

        Book book = new Book();
        book.setTitle("title");
        book.setAuthor("author");
        book.setPublisher("publisher");
        book.setReleaseDate(parsedDate);
        book.setDescription("description");
        book.setPageCount(parsedPageCount);

        //when
        String[] bookAttributesImpl = {"title", "author", "publisher", "2000-12-12", "description", "stringInsteadOfNumber"};

        //then
        try {
            composeBook(bookAttributesImpl);
        } catch (final RuntimeException e) {
            assertTrue(true);
        }
    }

    @Test
    public void testComposeBookNegativeInvalidReleaseDate() {
        //Given
        final Date parsedDate = parseStringToDate("2000-12-12");
        final Integer parsedPageCount = 100;

        Book book = new Book();
        book.setTitle("title");
        book.setAuthor("author");
        book.setPublisher("publisher");
        book.setReleaseDate(parsedDate);
        book.setDescription("description");
        book.setPageCount(parsedPageCount);

        //when
        String[] bookAttributesImpl = {"title", "author", "publisher", "stringInsteadOfDate", "description", "100"};

        //then
        try {
            composeBook(bookAttributesImpl);
        } catch (final RuntimeException e) {
            assertTrue(true);
        }
    }

    @Test
    public void testComposeBookNegativeMissingParameters() {
        //Given
        final Date parsedDate = parseStringToDate("2000-12-12");
        final Integer parsedPageCount = 100;

        Book book = new Book();
        book.setTitle("title");
        book.setAuthor("author");
        book.setPublisher("publisher");
        book.setReleaseDate(parsedDate);
        book.setDescription("description");
        book.setPageCount(parsedPageCount);

        //when
        String[] bookAttributesImpl = {"title", "author", "description", "100"};

        //then
        try {
            composeBook(bookAttributesImpl);
            fail();
        } catch (final RuntimeException e) {
            assertTrue(true);
        }
    }

    @Test
    public void parseStringToDatePositive() {
        //Given
        final String dateString = "2012-03-12";
        final DateFormat formatter = new SimpleDateFormat("yyyy-dd-MM");
        Date date1;
        Date date2 = null;
        //when
        date1 = parseStringToDate(dateString);

        //then
        try {
            date2 = formatter.parse(dateString);
            assertTrue(true);
        } catch (ParseException e) {
            fail();
        }
        assertEquals(dateString.getClass(), String.class);
        assertEquals(date1.getClass(), Date.class);
        assertEquals(date2.getClass(), Date.class);
        assertEquals(date1.toString(), date2.toString());
    }

    @Test
    public void parseStringToDateNegativeInvalidDate() {
        //Given
        final String dateString = "20120312";
        final DateFormat formatter = new SimpleDateFormat("yyyy-dd-MM");
        //when
        parseStringToDate(dateString);
        //then
        try {
            formatter.parse(dateString);
            fail();
        } catch (ParseException e) {
            assertTrue(true);
        }
    }

    @Test
    public void parseStringToDateNegativeInvalidDate2() {
        //Given
        final String dateString = "feb.30.2013";
        final DateFormat formatter = new SimpleDateFormat("yyyy-dd-MM");
        //when
        parseStringToDate(dateString);
        //then
        try {
            formatter.parse(dateString);
            fail();
        } catch (ParseException e) {
            assertTrue(true);
        }
    }*/

    @Test
    public void extractByKeywordPositiveAuthor() {
        //Given
        final String jsonString = "{\"kind\":\"volumes\",\"totalItems\":1,\"items[0].volumeInfo.title\":\"Lord of the Flies\", \"items[0].volumeInfo.authors[0]\":\"William Golding\",\"items[0].volumeInfo.publisher\":\"Faber & Faber\"}";
        //when
        Map<String, Object> jsonStringAsMap = JsonFlattener.flattenAsMap(jsonString);
        final String authors = extractByKeyword("authors", jsonStringAsMap);
        //then
        assertEquals(authors, "William Golding");
    }

    @Test
    public void extractByKeywordPositiveTitle() {
        //Given
        final String jsonString = "{\"kind\":\"volumes\",\"totalItems\":1,\"items[0].volumeInfo.title\":\"Lord of the Flies\", \"items[0].volumeInfo.authors[0]\":\"William Golding\",\"items[0].volumeInfo.publisher\":\"Faber & Faber\"}";
        //when
        Map<String, Object> jsonStringAsMap = JsonFlattener.flattenAsMap(jsonString);
        final String publisher = extractByKeyword("publisher", jsonStringAsMap);
        //then
        assertEquals(publisher, "Faber & Faber");
    }

    @Test
    public void extractByKeywordNegativeWrongKeyword() {
        //Given
        final String jsonString = "{\"kind\":\"volumes\",\"totalItems\":1,\"items[0].volumeInfo.title\":\"Lord of the Flies\", \"items[0].volumeInfo.authors[0]\":\"William Golding\",\"items[0].volumeInfo.publisher\":\"Faber & Faber\"}";
        //when
        Map<String, Object> jsonStringAsMap = JsonFlattener.flattenAsMap(jsonString);
        //then
        try {
            extractByKeyword("pageCount", jsonStringAsMap);
            fail();
        } catch (RuntimeException e) {
            assertTrue(true);
        }
    }
}
