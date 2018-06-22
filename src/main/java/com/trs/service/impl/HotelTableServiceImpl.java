package com.trs.service.impl;

import com.trs.service.HotelTableService;
import com.trs.domain.Hotel;
import com.trs.domain.HotelTable;
import com.trs.repository.HotelRepository;
import com.trs.repository.HotelTableRepository;
import com.trs.service.dto.HotelTableDTO;
import com.trs.service.mapper.HotelTableMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
/**
 * Service Implementation for managing HotelTable.
 */
@Service
@Transactional
public class HotelTableServiceImpl implements HotelTableService {

    private final Logger log = LoggerFactory.getLogger(HotelTableServiceImpl.class);

    private final HotelTableRepository hotelTableRepository;
    private final HotelRepository hotelRepository;
    
    private final HotelTableMapper hotelTableMapper;

    public HotelTableServiceImpl(HotelTableRepository hotelTableRepository, HotelTableMapper hotelTableMapper, HotelRepository hotelRepository) {
        this.hotelTableRepository = hotelTableRepository;
        this.hotelTableMapper = hotelTableMapper;
        this.hotelRepository = hotelRepository;
    }

    /**
     * Save a hotelTable.
     *
     * @param hotelTableDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public HotelTableDTO save(HotelTableDTO hotelTableDTO) {
        log.debug("Request to save HotelTable : {}", hotelTableDTO);
        HotelTable hotelTable = hotelTableMapper.toEntity(hotelTableDTO);
        hotelTable = hotelTableRepository.save(hotelTable);
        return hotelTableMapper.toDto(hotelTable);
    }

    /**
     * Get all the hotelTables.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<HotelTableDTO> findAll() {
        log.debug("Request to get all HotelTables");
        return hotelTableRepository.findAll().stream()
            .map(hotelTableMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one hotelTable by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<HotelTableDTO> findOne(Long id) {
        log.debug("Request to get HotelTable : {}", id);
        return hotelTableRepository.findById(id)
            .map(hotelTableMapper::toDto);
    }

    /**
     * Delete the hotelTable by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete HotelTable : {}", id);
        hotelTableRepository.deleteById(id);
    }

    //Custom Method
	@Override
	public List<HotelTableDTO> findAllByHotel(Long id) {
		 log.debug("Request to get all HotelTables by hotel");
		 Hotel hotel = hotelRepository.findById(id).get();
	        return hotelTableRepository.findAllByHotel(hotel).stream()
	            .map(hotelTableMapper::toDto)
	            .collect(Collectors.toCollection(LinkedList::new));
	}
}
