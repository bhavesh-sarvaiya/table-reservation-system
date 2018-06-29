package com.trs.service;

import com.trs.service.dto.TimeSlotDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing TimeSlot.
 */
public interface TimeSlotService {

    /**
     * Save a timeSlot.
     *
     * @param timeSlotDTO the entity to save
     * @return the persisted entity
     */
    TimeSlotDTO save(TimeSlotDTO timeSlotDTO);

    /**
     * Get all the timeSlots.
     *
     * @return the list of entities
     */
    List<TimeSlotDTO> findAll();


    /**
     * Get the "id" timeSlot.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<TimeSlotDTO> findOne(Long id);

    /**
     * Delete the "id" timeSlot.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
