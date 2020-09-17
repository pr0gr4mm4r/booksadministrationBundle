package com.services;

import com.entities.Office;
import com.repositories.OfficeRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Transactional
@Service
@AllArgsConstructor
public class OfficeServiceImpl implements OfficeService {

    private final OfficeRepository officeRepository;

    @Override
    public String addOffice(final String officeName) {
        if (officeRepository.findIdByName(officeName).isPresent()) {
            return "Office already present";
        }
        final Office office = new Office();
        office.setName(officeName);
        officeRepository.save(office);
        return "Successful Creation of Office " + officeName;
    }

    @Override
    public Set<String> getOfficeNames() {
        return officeRepository.findAll().stream().map(Office::getName).collect(Collectors.toSet());
    }

    @Override
    public List<Office> getOffices() {
        return officeRepository.findAll();
    }
}
