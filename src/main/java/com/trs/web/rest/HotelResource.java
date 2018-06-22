package com.trs.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.trs.service.HotelService;
import com.trs.web.rest.errors.BadRequestAlertException;
import com.trs.web.rest.util.HeaderUtil;
import com.trs.web.rest.util.PaginationUtil;
import com.trs.service.dto.HotelDTO;
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
 * REST controller for managing Hotel.
 */
@RestController
@RequestMapping("/api")
public class HotelResource {

    private final Logger log = LoggerFactory.getLogger(HotelResource.class);

    private static final String ENTITY_NAME = "hotel";

    private final HotelService hotelService;

    public HotelResource(HotelService hotelService) {
        this.hotelService = hotelService;
    }

    /**
     * POST  /hotels : Create a new hotel.
     *
     * @param hotelDTO the hotelDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new hotelDTO, or with status 400 (Bad Request) if the hotel has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/hotels")
    @Timed
    public ResponseEntity<HotelDTO> createHotel(@Valid @RequestBody HotelDTO hotelDTO) throws URISyntaxException {
        log.debug("REST request to save Hotel : {}", hotelDTO);
        if (hotelDTO.getId() != null) {
            throw new BadRequestAlertException("A new hotel cannot already have an ID", ENTITY_NAME, "idexists");
        }
        HotelDTO result = hotelService.save(hotelDTO);
        return ResponseEntity.created(new URI("/api/hotels/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /hotels : Updates an existing hotel.
     *
     * @param hotelDTO the hotelDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated hotelDTO,
     * or with status 400 (Bad Request) if the hotelDTO is not valid,
     * or with status 500 (Internal Server Error) if the hotelDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/hotels")
    @Timed
    public ResponseEntity<HotelDTO> updateHotel(@Valid @RequestBody HotelDTO hotelDTO) throws URISyntaxException {
        log.debug("REST request to update Hotel : {}", hotelDTO);
        if (hotelDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        HotelDTO result = hotelService.save(hotelDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, hotelDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /hotels : get all the hotels.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of hotels in body
     */
    @GetMapping("/hotels")
    @Timed
    public ResponseEntity<List<HotelDTO>> getAllHotels(Pageable pageable) {
        log.debug("REST request to get a page of Hotels");
        Page<HotelDTO> page = hotelService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/hotels");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /hotels/:id : get the "id" hotel.
     *
     * @param id the id of the hotelDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the hotelDTO, or with status 404 (Not Found)
     */
    @GetMapping("/hotels/{id}")
    @Timed
    public ResponseEntity<HotelDTO> getHotel(@PathVariable Long id) {
        log.debug("REST request to get Hotel : {}", id);
        Optional<HotelDTO> hotelDTO = hotelService.findOne(id);
        return ResponseUtil.wrapOrNotFound(hotelDTO);
    }

    /**
     * DELETE  /hotels/:id : delete the "id" hotel.
     *
     * @param id the id of the hotelDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/hotels/{id}")
    @Timed
    public ResponseEntity<Void> deleteHotel(@PathVariable Long id) {
        log.debug("REST request to delete Hotel : {}", id);
        hotelService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
    
    // Custom API
    /**
     * GET  /hotels : search the hotels.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of hotels in body
     */
    @GetMapping("/hotels-search")
    @Timed
    public List<HotelDTO> searchHotel(@RequestParam String search) {
        log.debug("REST request to get a page of Hotels");
        return  hotelService.searchHotel(search);
       // HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/hotels");
       // return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }
}
