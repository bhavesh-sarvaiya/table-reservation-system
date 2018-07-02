package com.trs.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.trs.service.TimingService;
import com.trs.web.rest.errors.BadRequestAlertException;
import com.trs.web.rest.util.HeaderUtil;
import com.trs.service.dto.TimingDTO;
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
 * REST controller for managing Timing.
 */
@RestController
@RequestMapping("/api")
public class TimingResource {

    private final Logger log = LoggerFactory.getLogger(TimingResource.class);

    private static final String ENTITY_NAME = "timing";

    private final TimingService timingService;

    public TimingResource(TimingService timingService) {
        this.timingService = timingService;
    }

    /**
     * POST  /timings : Create a new timing.
     *
     * @param timingDTO the timingDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new timingDTO, or with status 400 (Bad Request) if the timing has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/timings")
    @Timed
    public ResponseEntity<TimingDTO> createTiming(@Valid @RequestBody TimingDTO timingDTO) throws URISyntaxException {
        log.debug("REST request to save Timing : {}", timingDTO);
        if (timingDTO.getId() != null) {
            throw new BadRequestAlertException("A new timing cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TimingDTO result = timingService.save(timingDTO);
        return ResponseEntity.created(new URI("/api/timings/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /timings : Updates an existing timing.
     *
     * @param timingDTO the timingDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated timingDTO,
     * or with status 400 (Bad Request) if the timingDTO is not valid,
     * or with status 500 (Internal Server Error) if the timingDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/timings")
    @Timed
    public ResponseEntity<TimingDTO> updateTiming(@Valid @RequestBody TimingDTO timingDTO) throws URISyntaxException {
        log.debug("REST request to update Timing : {}", timingDTO);
        if (timingDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        TimingDTO result = timingService.save(timingDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, timingDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /timings : get all the timings.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of timings in body
     */
    @GetMapping("/timings")
    @Timed
    public List<TimingDTO> getAllTimings() {
        log.debug("REST request to get all Timings");
        return timingService.findAll();
    }

    /**
     * GET  /timings/:id : get the "id" timing.
     *
     * @param id the id of the timingDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the timingDTO, or with status 404 (Not Found)
     */
    @GetMapping("/timings/{id}")
    @Timed
    public ResponseEntity<TimingDTO> getTiming(@PathVariable Long id) {
        log.debug("REST request to get Timing : {}", id);
        Optional<TimingDTO> timingDTO = timingService.findOne(id);
        return ResponseUtil.wrapOrNotFound(timingDTO);
    }

    /**
     * DELETE  /timings/:id : delete the "id" timing.
     *
     * @param id the id of the timingDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/timings/{id}")
    @Timed
    public ResponseEntity<Void> deleteTiming(@PathVariable Long id) {
        log.debug("REST request to delete Timing : {}", id);
        timingService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
    //custom method

    @GetMapping("/timings-timeslot")
    @Timed
    public List<TimingDTO> getAllTimingsByTimeSlot(Long timeSlotId) {
        log.debug("REST request to get all Timings by TimeSlot");
        return timingService.findAllByTimeSolt(timeSlotId);
    }
}
