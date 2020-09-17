package com.services;

import com.repositories.BookRepository;
import com.repositories.OfficeRepository;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.springframework.boot.test.mock.mockito.MockBean;

import static com.services.BookServiceImpl.removeHyphen;
import static org.junit.Assert.assertEquals;


public class BookServiceImplUnitTest {

    @MockBean
    private BookRepository bookRepository;

    @MockBean
    private OfficeRepository officeRepository;

    @InjectMocks
    private BookServiceImpl bookService;


    @Test
    public void testRemoveHyphenMethod1() {
        //Given
        final String ISBN1 = "978-1-4932-1538-6";

        //when
        final String result1 = removeHyphen(ISBN1);

        //then
        assertEquals("9781493215386", result1);
    }

    @Test
    public void testRemoveHyphenMethod2() {
        //Given
        final String ISBN2 = "-8353453423-";

        //when
        final String result2 = removeHyphen(ISBN2);

        //then
        assertEquals("8353453423", result2);
    }

    @Test
    public void testRemoveHyphenMethod3() {
        //Given
        final String ISBN3 = "2-25340345-0";

        //when
        final String result3 = removeHyphen(ISBN3);

        //then
        assertEquals("2253403450", result3);
    }

    @Test
    public void testRemoveHyphenMethod4() {
        //Given
        final String ISBN4 = "435345---------3451";

        //when
        final String result4 = removeHyphen(ISBN4);

        //then
        assertEquals("4353453451", result4);
    }

    @Test
    public void testRemoveHyphenMethod5() {
        //Given
        final String ISBN5 = "-2---------";

        //when
        final String result5 = removeHyphen(ISBN5);

        //then
        assertEquals("2", result5);
    }

    @Test
    public void testRemoveHyphenMethod6() {
        //Given
        final String ISBN6 = "9783110194234";

        //when
        final String result6 = removeHyphen(ISBN6);

        //then
        assertEquals("9783110194234", result6);
    }

    @Test
    public void testRemoveHyphenMethod7() {
        //Given
        final String ISBN7 = "9784353453451235";

        //when
        final String result7 = removeHyphen(ISBN7);

        //then
        assertEquals("9784353453451235", result7);
    }

    @Test
    public void testRemoveHyphenMethod8() {
        //Given
        final String ISBN8 = "-4---3----5---3--4-5-3-4-51-23-5-";

        //when
        final String result8 = removeHyphen(ISBN8);

        //then
        assertEquals("4353453451235", result8);
    }

    @Test
    public void testRemoveHyphenMethod9() {
        //Given
        final String ISBN9 = "--------6";

        //when
        final String result9 = removeHyphen(ISBN9);

        //then
        assertEquals("6", result9);
    }

    @Test
    public void testRemoveHyphenMethod10Empty() {
        //Given
        final String ISBN10 = "";

        //when
        final String result10 = removeHyphen(ISBN10);

        //then
        assertEquals("", result10);
    }

    @Test
    public void testRemoveHyphenMethod11SingleHyphen() {
        //Given
        final String ISBN11 = "-";

        //when
        final String result11 = removeHyphen(ISBN11);

        //then
        assertEquals("", result11);
    }
}
