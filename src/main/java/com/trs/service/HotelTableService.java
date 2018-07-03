package com.trs.service;

import com.trs.domain.enumeration.DayName;
import com.trs.service.dto.HotelTableDTO;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing HotelTable.
 */
public interface HotelTableService {

    /**
     * Save a hotelTable.
     *
     * @param hotelTableDTO the entity to save
     * @return the persisted entity
     */
    HotelTableDTO save(HotelTableDTO hotelTableDTO);

    /**
     * Get all the hotelTables.
     *
     * @return the list of entities
     */
    List<HotelTableDTO> findAll();


    /**
     * Get the "id" hotelTable.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<HotelTableDTO> findOne(Long id);

    /**
     * Delete the "id" hotelTable.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
    
    
    // Custom Method
    
    /**
     * Get all the hotelTables by hotel.
     *
     * @return the list of entities
     */
    List<HotelTableDTO> findAllByHotel(Long id);
    List<HotelTableDTO> findAllByHotelAndStatus(Long id, String status);
    List<HotelTableDTO> findAllByHotelAndStatusBasedOnStaff(Long id, String status,String bookDate, String time);
}
