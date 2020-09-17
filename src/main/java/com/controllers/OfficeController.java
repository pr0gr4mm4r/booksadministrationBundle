package com.controllers;

import com.entities.Office;
import com.services.OfficeService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;


@RestController
@AllArgsConstructor
public class OfficeController {

    private final OfficeService officeService;

    @PostMapping(value = "/create/office/{officeName}")
    public String insertOffice(@PathVariable("officeName") String officeName) {
        return officeService.addOffice(officeName);
    }

    @GetMapping(value = "/officeNames")
    public List<String> getOfficeNames() {
        return new ArrayList<>(officeService.getOfficeNames());
    }

    @GetMapping(value = "/offices")
    public List<Office> getOffices() {
        return officeService.getOffices();
    }
}
