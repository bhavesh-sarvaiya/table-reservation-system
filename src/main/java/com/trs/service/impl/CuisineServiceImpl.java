package com.trs.service.impl;

import com.trs.service.CuisineService;
import com.trs.domain.Cuisine;
import com.trs.domain.Hotel;
import com.trs.domain.enumeration.FoodType;
import com.trs.repository.CuisineRepository;
import com.trs.repository.HotelRepository;
import com.trs.service.dto.CuisineDTO;
import com.trs.service.mapper.CuisineMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
/**
 * Service Implementation for managing Cuisine.
 */
@Service
@Transactional
public class CuisineServiceImpl implements CuisineService {

    private final Logger log = LoggerFactory.getLogger(CuisineServiceImpl.class);

    private final CuisineRepository cuisineRepository;
    private final HotelRepository hotelRepository;
    private final CuisineMapper cuisineMapper;

    public CuisineServiceImpl(CuisineRepository cuisineRepository, CuisineMapper cuisineMapper, HotelRepository hotelRepository) {
        this.cuisineRepository = cuisineRepository;
        this.cuisineMapper = cuisineMapper;
        this.hotelRepository = hotelRepository;
    }

    /**
     * Save a cuisine.
     *
     * @param cuisineDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public CuisineDTO save(CuisineDTO cuisineDTO) {
        log.debug("Request to save Cuisine : {}", cuisineDTO);
        Cuisine cuisine = cuisineMapper.toEntity(cuisineDTO);
        cuisine = cuisineRepository.save(cuisine);
        return cuisineMapper.toDto(cuisine);
    }

    /**
     * Get all the cuisines.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<CuisineDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Cuisines");
        return cuisineRepository.findAll(pageable)
            .map(cuisineMapper::toDto);
    }


    /**
     * Get one cuisine by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<CuisineDTO> findOne(Long id) {
        log.debug("Request to get Cuisine : {}", id);
        return cuisineRepository.findById(id)
            .map(cuisineMapper::toDto);
    }

    /**
     * Delete the cuisine by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Cuisine : {}", id);
        cuisineRepository.deleteById(id);
    }

    // custom method
    @Override
    @Transactional(readOnly = true)
    public List<CuisineDTO> findAllByHotel(Long hotelId) {
        log.debug("Request to get all Cuisines");
        Hotel hotel = hotelRepository.getOne(hotelId);
        List<CuisineDTO> listDto = new ArrayList<>();
        for (Cuisine item : cuisineRepository.findAllByHotel(hotel)) {
            listDto.add(new CuisineDTO(item));
        }
        return listDto;
    }

    @Override
    public Page<CuisineDTO> findAllByHotel(Pageable pageable, Long hotelId) {
        log.debug("Request to get all Cuisines by hotel pagenation");
        Hotel hotel = hotelRepository.getOne(hotelId);
        return cuisineRepository.findAllByHotel(pageable, hotel)
            .map(cuisineMapper::toDto);
    }

    @Override
    public Optional<CuisineDTO> findOneByTypeAndHotel(FoodType foodType, Long hotelId) {
        log.debug("Request to get Cuisine : {}", foodType);
        Hotel hotel = hotelRepository.getOne(hotelId);
        return cuisineRepository.findOneByTypeAndHotel(foodType, hotel)
            .map(cuisineMapper::toDto);
    }
    
}
