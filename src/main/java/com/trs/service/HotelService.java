package com.trs.service;

import com.trs.domain.Hotel;

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
     * @param hotel the entity to save
     * @return the persisted entity
     */
    Hotel save(Hotel hotel);

    /**
     * Get all the hotels.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<Hotel> findAll(Pageable pageable);


    /**
     * Get the "id" hotel.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<Hotel> findOne(Long id);

    /**
     * Delete the "id" hotel.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
