package com.trs.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.trs.service.TimeSlotService;
import com.trs.web.rest.errors.BadRequestAlertException;
import com.trs.web.rest.util.HeaderUtil;
import com.trs.service.dto.TimeSlotDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing TimeSlot.
 */
@RestController
@RequestMapping("/api")
public class TimeSlotResource {

    private final Logger log = LoggerFactory.getLogger(TimeSlotResource.class);

    private static final String ENTITY_NAME = "timeSlot";

    private final TimeSlotService timeSlotService;

    public TimeSlotResource(TimeSlotService timeSlotService) {
        this.timeSlotService = timeSlotService;
    }

    /**
     * POST  /time-slots : Create a new timeSlot.
     *
     * @param timeSlotDTO the timeSlotDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new timeSlotDTO, or with status 400 (Bad Request) if the timeSlot has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/time-slots")
    @Timed
    public ResponseEntity<TimeSlotDTO> createTimeSlot(@Valid @RequestBody TimeSlotDTO timeSlotDTO) throws URISyntaxException {
        log.debug("REST request to save TimeSlot : {}", timeSlotDTO);
        if (timeSlotDTO.getId() != null) {
            throw new BadRequestAlertException("A new timeSlot cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TimeSlotDTO result = timeSlotService.save(timeSlotDTO);
        return ResponseEntity.created(new URI("/api/time-slots/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /time-slots : Updates an existing timeSlot.
     *
     * @param timeSlotDTO the timeSlotDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated timeSlotDTO,
     * or with status 400 (Bad Request) if the timeSlotDTO is not valid,
     * or with status 500 (Internal Server Error) if the timeSlotDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/time-slots")
    @Timed
    public ResponseEntity<TimeSlotDTO> updateTimeSlot(@Valid @RequestBody TimeSlotDTO timeSlotDTO) throws URISyntaxException {
        log.debug("REST request to update TimeSlot : {}", timeSlotDTO);
        if (timeSlotDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        TimeSlotDTO result = timeSlotService.save(timeSlotDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, timeSlotDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /time-slots : get all the timeSlots.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of timeSlots in body
     */
    @GetMapping("/time-slots")
    @Timed
    public List<TimeSlotDTO> getAllTimeSlots() {
        log.debug("REST request to get all TimeSlots");
        return timeSlotService.findAll();
    }

    /**
     * GET  /time-slots/:id : get the "id" timeSlot.
     *
     * @param id the id of the timeSlotDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the timeSlotDTO, or with status 404 (Not Found)
     */
    @GetMapping("/time-slots/{id}")
    @Timed
    public ResponseEntity<TimeSlotDTO> getTimeSlot(@PathVariable Long id) {
        log.debug("REST request to get TimeSlot : {}", id);
        Optional<TimeSlotDTO> timeSlotDTO = timeSlotService.findOne(id);
        return ResponseUtil.wrapOrNotFound(timeSlotDTO);
    }

    /**
     * DELETE  /time-slots/:id : delete the "id" timeSlot.
     *
     * @param id the id of the timeSlotDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/time-slots/{id}")
    @Timed
    public ResponseEntity<Void> deleteTimeSlot(@PathVariable Long id) {
        log.debug("REST request to delete TimeSlot : {}", id);
        timeSlotService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
