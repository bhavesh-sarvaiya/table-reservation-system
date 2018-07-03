package com.trs.service.impl;

import com.trs.service.TimeSlotService;
import com.trs.domain.Hotel;
import com.trs.domain.TimeSlot;
import com.trs.domain.enumeration.DayName;
import com.trs.repository.HotelRepository;
import com.trs.repository.TimeSlotRepository;
import com.trs.service.dto.TimeSlotDTO;
import com.trs.service.mapper.TimeSlotMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
/**
 * Service Implementation for managing TimeSlot.
 */
@Service
@Transactional
public class TimeSlotServiceImpl implements TimeSlotService {

    private final Logger log = LoggerFactory.getLogger(TimeSlotServiceImpl.class);

    private final TimeSlotRepository timeSlotRepository;
    private final HotelRepository hotelRepository;

    private final TimeSlotMapper timeSlotMapper;

    public TimeSlotServiceImpl(TimeSlotRepository timeSlotRepository, TimeSlotMapper timeSlotMapper, HotelRepository hotelRepository) {
        this.timeSlotRepository = timeSlotRepository;
        this.timeSlotMapper = timeSlotMapper;
        this.hotelRepository = hotelRepository;
    }

    /**
     * Save a timeSlot.
     *
     * @param timeSlotDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public TimeSlotDTO save(TimeSlotDTO timeSlotDTO) {
        log.debug("Request to save TimeSlot : {}", timeSlotDTO);
        TimeSlot timeSlot = timeSlotMapper.toEntity(timeSlotDTO);
        timeSlot = timeSlotRepository.save(timeSlot);
        return timeSlotMapper.toDto(timeSlot);
    }

    /**
     * Get all the timeSlots.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<TimeSlotDTO> findAll() {
        log.debug("Request to get all TimeSlots");
        return timeSlotRepository.findAll().stream()
            .map(timeSlotMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one timeSlot by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<TimeSlotDTO> findOne(Long id) {
        log.debug("Request to get TimeSlot : {}", id);
        return timeSlotRepository.findById(id)
            .map(timeSlotMapper::toDto);
    }

    /**
     * Delete the timeSlot by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete TimeSlot : {}", id);
        timeSlotRepository.deleteById(id);
    }

    @Override
    public TimeSlotDTO findOneByHotelAndDay(Long hotelId, DayName day) {
        Hotel hotel = hotelRepository.getOne(hotelId);
        return timeSlotMapper.toDto(timeSlotRepository.findOneByHotelAndDay(hotel, day));
    }

    @Override
    public List<TimeSlotDTO> findAllByHotel(Long hotelID) {
        Hotel hotel = hotelRepository.getOne(hotelID);
        return timeSlotMapper.toDto(timeSlotRepository.findAllByHotel(hotel));
    }
}
