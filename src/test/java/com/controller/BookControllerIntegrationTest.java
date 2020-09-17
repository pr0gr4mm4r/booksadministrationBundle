package com.controller;

import com.config.SecurityConfiguration;
import com.controllers.BookController;
import com.entities.Book;
import com.google.gson.Gson;
import com.repositories.BookRepository;
import com.repositories.OfficeRepository;
import com.repositories.RoleRepository;
import com.repositories.UserRepository;
import com.services.BookServiceImpl;
import com.services.GoogleBookServiceImpl;
import com.services.UserServiceImpl;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import java.time.LocalDate;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = {
        BookController.class,
        BookServiceImpl.class,
        GoogleBookServiceImpl.class,
        SecurityConfiguration.class,
        UserServiceImpl.class})
@AutoConfigureMockMvc
public class BookControllerIntegrationTest {

    @Autowired
    private WebApplicationContext webApplicationContext;

    private MockMvc mockMvc;

    @MockBean
    private UserRepository userRepository;

    @MockBean
    private RoleRepository roleRepository;

    @MockBean
    private BookRepository bookRepository;

    @MockBean
    private OfficeRepository officeRepository;

    @Before
    public void setup() {
        mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).build();
    }

    @Test
    public void getallTest() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/all")
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }

    @Test
    public void getByIsbnTest() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/8443445344")
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }

    @Test
    public void insertBookTest() throws Exception {
        Gson gson = new Gson();
        Book book = this.createBook();
        String bookJsonString = gson.toJson(book);
        mockMvc.perform(MockMvcRequestBuilders.post("/create").content(bookJsonString)
                .accept(MediaType.ALL_VALUE))
                .andExpect(status().isOk());
    }

    @Test
    public void updateBookTest() throws Exception {
        Gson gson = new Gson();
        Book book = this.createBook();
        book.setId(4);
        String bookJsonString = gson.toJson(book);
        mockMvc.perform(MockMvcRequestBuilders.put("/update").content(bookJsonString)
                .accept(MediaType.ALL_VALUE))
                .andExpect(status().isOk());
    }

    @Test
    public void deleteAllTest() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.delete("/deleteAll"))
                .andExpect(status().isOk());
    }

    @Test
    public void deleteByIdPositiveTest() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.delete("/delete/3"))
                .andExpect(status().isOk());
    }

    @Test
    public void deleteByIdNegativeTest() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.delete("/delete/drei"))
                .andExpect(status().isBadRequest());
    }

    protected Book createBook() {
        Book book = new Book();
        book.setIsbn("9347563454");
        book.setPageCount(100);
        book.setDescription("description");
        book.setReleaseDate(LocalDate.now());
        book.setAuthor("author");
        book.setTitle("title");
        book.setPublisher("publisher");
        book.setAddingDate(LocalDate.now());
        book.setOfficeId(10);
        book.setOfficeName("officeName");
        book.setPositionDescription("setPositionDescription");
        return book;
    }
}
