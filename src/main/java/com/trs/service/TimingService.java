package com.trs.service;

import com.trs.domain.TimeSlot;
import com.trs.service.dto.TimeSlotDTO;
import com.trs.service.dto.TimingDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing Timing.
 */
public interface TimingService {

    /**
     * Save a timing.
     *
     * @param timingDTO the entity to save
     * @return the persisted entity
     */
    TimingDTO save(TimingDTO timingDTO);

    /**
     * Get all the timings.
     *
     * @return the list of entities
     */
    List<TimingDTO> findAll();


    /**
     * Get the "id" timing.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<TimingDTO> findOne(Long id);

    /**
     * Delete the "id" timing.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
    //custom method

    TimingDTO save(TimingDTO[] timingDTO,TimeSlotDTO timeSlotDTO);

    List<TimingDTO> findAllByTimeSolt(Long timeSlotId);

    TimingDTO findOneByTimeSlotAndStartTime(Long timeslotID, String starTime);

}
