package com.trs.service;

import com.trs.service.dto.HotelDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing Hotel.
 */
public interface HotelService {

    /**
     * Save a hotel.
     *
     * @param hotelDTO the entity to save
     * @return the persisted entity
     */
    HotelDTO save(HotelDTO hotelDTO);

    /**
     * Get all the hotels.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<HotelDTO> findAll(Pageable pageable);


    /**
     * Get the "id" hotel.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<HotelDTO> findOne(Long id);

    /**
     * Delete the "id" hotel.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
