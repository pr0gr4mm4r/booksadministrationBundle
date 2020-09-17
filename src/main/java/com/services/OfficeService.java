package com.services;

import com.entities.Office;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

@Service
public interface OfficeService {
    String addOffice(String officeName);
    Set<String> getOfficeNames();
    List<Office> getOffices();
}
