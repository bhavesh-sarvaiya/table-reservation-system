package com.trs.service;

import com.trs.service.dto.CuisineDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing Cuisine.
 */
public interface CuisineService {

    /**
     * Save a cuisine.
     *
     * @param cuisineDTO the entity to save
     * @return the persisted entity
     */
    CuisineDTO save(CuisineDTO cuisineDTO);

    /**
     * Get all the cuisines.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<CuisineDTO> findAll(Pageable pageable);


    /**
     * Get the "id" cuisine.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<CuisineDTO> findOne(Long id);

    /**
     * Delete the "id" cuisine.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
