package com.trs.service.impl;

import com.trs.service.TimingService;
import com.trs.domain.Timing;
import com.trs.repository.TimingRepository;
import com.trs.service.dto.TimingDTO;
import com.trs.service.mapper.TimingMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
/**
 * Service Implementation for managing Timing.
 */
@Service
@Transactional
public class TimingServiceImpl implements TimingService {

    private final Logger log = LoggerFactory.getLogger(TimingServiceImpl.class);

    private final TimingRepository timingRepository;

    private final TimingMapper timingMapper;

    public TimingServiceImpl(TimingRepository timingRepository, TimingMapper timingMapper) {
        this.timingRepository = timingRepository;
        this.timingMapper = timingMapper;
    }

    /**
     * Save a timing.
     *
     * @param timingDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public TimingDTO save(TimingDTO timingDTO) {
        log.debug("Request to save Timing : {}", timingDTO);
        Timing timing = timingMapper.toEntity(timingDTO);
        timing = timingRepository.save(timing);
        return timingMapper.toDto(timing);
    }

    /**
     * Get all the timings.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<TimingDTO> findAll() {
        log.debug("Request to get all Timings");
        return timingRepository.findAll().stream()
            .map(timingMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one timing by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<TimingDTO> findOne(Long id) {
        log.debug("Request to get Timing : {}", id);
        return timingRepository.findById(id)
            .map(timingMapper::toDto);
    }

    /**
     * Delete the timing by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Timing : {}", id);
        timingRepository.deleteById(id);
    }
}
