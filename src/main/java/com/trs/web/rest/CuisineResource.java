package com.trs.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.trs.service.CuisineService;
import com.trs.web.rest.errors.BadRequestAlertException;
import com.trs.web.rest.util.HeaderUtil;
import com.trs.web.rest.util.PaginationUtil;
import com.trs.service.dto.CuisineDTO;
import com.trs.service.dto.CuisineCriteria;
import com.trs.service.CuisineQueryService;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Cuisine.
 */
@RestController
@RequestMapping("/api")
public class CuisineResource {

    private final Logger log = LoggerFactory.getLogger(CuisineResource.class);

    private static final String ENTITY_NAME = "cuisine";

    private final CuisineService cuisineService;

    private final CuisineQueryService cuisineQueryService;

    public CuisineResource(CuisineService cuisineService, CuisineQueryService cuisineQueryService) {
        this.cuisineService = cuisineService;
        this.cuisineQueryService = cuisineQueryService;
    }

    /**
     * POST  /cuisines : Create a new cuisine.
     *
     * @param cuisineDTO the cuisineDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new cuisineDTO, or with status 400 (Bad Request) if the cuisine has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/cuisines")
    @Timed
    public ResponseEntity<CuisineDTO> createCuisine(@Valid @RequestBody CuisineDTO cuisineDTO) throws URISyntaxException {
        log.debug("REST request to save Cuisine : {}", cuisineDTO);
        if (cuisineDTO.getId() != null) {
            throw new BadRequestAlertException("A new cuisine cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CuisineDTO result = cuisineService.save(cuisineDTO);
        return ResponseEntity.created(new URI("/api/cuisines/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /cuisines : Updates an existing cuisine.
     *
     * @param cuisineDTO the cuisineDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated cuisineDTO,
     * or with status 400 (Bad Request) if the cuisineDTO is not valid,
     * or with status 500 (Internal Server Error) if the cuisineDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/cuisines")
    @Timed
    public ResponseEntity<CuisineDTO> updateCuisine(@Valid @RequestBody CuisineDTO cuisineDTO) throws URISyntaxException {
        log.debug("REST request to update Cuisine : {}", cuisineDTO);
        if (cuisineDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        CuisineDTO result = cuisineService.save(cuisineDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, cuisineDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /cuisines : get all the cuisines.
     *
     * @param pageable the pagination information
     * @param criteria the criterias which the requested entities should match
     * @return the ResponseEntity with status 200 (OK) and the list of cuisines in body
     */
    @GetMapping("/cuisines")
    @Timed
    public ResponseEntity<List<CuisineDTO>> getAllCuisines(CuisineCriteria criteria, Pageable pageable) {
        log.debug("REST request to get Cuisines by criteria: {}", criteria);
        Page<CuisineDTO> page = cuisineQueryService.findByCriteria(criteria, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/cuisines");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /cuisines/:id : get the "id" cuisine.
     *
     * @param id the id of the cuisineDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the cuisineDTO, or with status 404 (Not Found)
     */
    @GetMapping("/cuisines/{id}")
    @Timed
    public ResponseEntity<CuisineDTO> getCuisine(@PathVariable Long id) {
        log.debug("REST request to get Cuisine : {}", id);
        Optional<CuisineDTO> cuisineDTO = cuisineService.findOne(id);
        return ResponseUtil.wrapOrNotFound(cuisineDTO);
    }

    /**
     * DELETE  /cuisines/:id : delete the "id" cuisine.
     *
     * @param id the id of the cuisineDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/cuisines/{id}")
    @Timed
    public ResponseEntity<Void> deleteCuisine(@PathVariable Long id) {
        log.debug("REST request to delete Cuisine : {}", id);
        cuisineService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
