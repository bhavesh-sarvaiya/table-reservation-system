package com.trs.service;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import io.github.jhipster.service.QueryService;

import com.trs.domain.Cuisine;
import com.trs.domain.*; // for static metamodels
import com.trs.repository.CuisineRepository;
import com.trs.service.dto.CuisineCriteria;

import com.trs.service.dto.CuisineDTO;
import com.trs.service.mapper.CuisineMapper;

/**
 * Service for executing complex queries for Cuisine entities in the database.
 * The main input is a {@link CuisineCriteria} which gets converted to {@link Specification},
 * in a way that all the filters must apply.
 * It returns a {@link List} of {@link CuisineDTO} or a {@link Page} of {@link CuisineDTO} which fulfills the criteria.
 */
@Service
@Transactional(readOnly = true)
public class CuisineQueryService extends QueryService<Cuisine> {

    private final Logger log = LoggerFactory.getLogger(CuisineQueryService.class);

    private final CuisineRepository cuisineRepository;

    private final CuisineMapper cuisineMapper;

    public CuisineQueryService(CuisineRepository cuisineRepository, CuisineMapper cuisineMapper) {
        this.cuisineRepository = cuisineRepository;
        this.cuisineMapper = cuisineMapper;
    }

    /**
     * Return a {@link List} of {@link CuisineDTO} which matches the criteria from the database
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public List<CuisineDTO> findByCriteria(CuisineCriteria criteria) {
        log.debug("find by criteria : {}", criteria);
        final Specification<Cuisine> specification = createSpecification(criteria);
        return cuisineMapper.toDto(cuisineRepository.findAll(specification));
    }

    /**
     * Return a {@link Page} of {@link CuisineDTO} which matches the criteria from the database
     * @param criteria The object which holds all the filters, which the entities should match.
     * @param page The page, which should be returned.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public Page<CuisineDTO> findByCriteria(CuisineCriteria criteria, Pageable page) {
        log.debug("find by criteria : {}, page: {}", criteria, page);
        final Specification<Cuisine> specification = createSpecification(criteria);
        return cuisineRepository.findAll(specification, page)
            .map(cuisineMapper::toDto);
    }

    /**
     * Function to convert CuisineCriteria to a {@link Specification}
     */
    private Specification<Cuisine> createSpecification(CuisineCriteria criteria) {
        Specification<Cuisine> specification = Specification.where(null);
        if (criteria != null) {
            if (criteria.getId() != null) {
                specification = specification.and(buildSpecification(criteria.getId(), Cuisine_.id));
            }
            if (criteria.getType() != null) {
                specification = specification.and(buildSpecification(criteria.getType(), Cuisine_.type));
            }
            if (criteria.getHotelId() != null) {
                specification = specification.and(buildReferringEntitySpecification(criteria.getHotelId(), Cuisine_.hotel, Hotel_.id));
            }
        }
        return specification;
    }

}
