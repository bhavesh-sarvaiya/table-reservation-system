package com.trs.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.trs.domain.Hotel;
import com.trs.domain.HotelTable;
import com.trs.domain.enumeration.DayName;
import com.trs.repository.HotelRepository;
import com.trs.repository.HotelTableRepository;
import com.trs.service.HotelTableService;
import com.trs.web.rest.errors.BadRequestAlertException;
import com.trs.web.rest.util.HeaderUtil;
import com.trs.service.dto.HotelTableDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing HotelTable.
 */
@RestController
@RequestMapping("/api")
public class HotelTableResource {

    private final Logger log = LoggerFactory.getLogger(HotelTableResource.class);

    private static final String ENTITY_NAME = "hotelTable";

    private final HotelTableService hotelTableService;
    private final HotelRepository hotelRepository;
    private final HotelTableRepository hotelTableRepository;

    public HotelTableResource(HotelTableService hotelTableService,HotelRepository hotelRepository, HotelTableRepository hotelTableRepository) {
        this.hotelTableService = hotelTableService;
        this.hotelRepository = hotelRepository;
        this.hotelTableRepository = hotelTableRepository;
    }

    /**
     * POST  /hotel-tables : Create a new hotelTable.
     *
     * @param hotelTableDTO the hotelTableDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new hotelTableDTO, or with status 400 (Bad Request) if the hotelTable has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/hotel-tables")
    @Timed
    public ResponseEntity<HotelTableDTO> createHotelTable(@Valid @RequestBody HotelTableDTO hotelTableDTO) throws URISyntaxException {
        log.debug("REST request to save HotelTable : {}", hotelTableDTO);
        if (hotelTableDTO.getId() != null) {
            throw new BadRequestAlertException("A new hotelTable cannot already have an ID", ENTITY_NAME, "idexists");
        }
        checkValidation(hotelTableDTO);
        HotelTableDTO result = hotelTableService.save(hotelTableDTO);
        return ResponseEntity.created(new URI("/api/hotel-tables/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getTableNumber().toString()))
            .body(result);
    }

    /**
     * PUT  /hotel-tables : Updates an existing hotelTable.
     *
     * @param hotelTableDTO the hotelTableDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated hotelTableDTO,
     * or with status 400 (Bad Request) if the hotelTableDTO is not valid,
     * or with status 500 (Internal Server Error) if the hotelTableDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/hotel-tables")
    @Timed
    public ResponseEntity<HotelTableDTO> updateHotelTable(@Valid @RequestBody HotelTableDTO hotelTableDTO) throws URISyntaxException {
        log.debug("REST request to update HotelTable : {}", hotelTableDTO);
        if (hotelTableDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        HotelTableDTO result = hotelTableService.save(hotelTableDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, hotelTableDTO.getTableNumber().toString()))
            .body(result);
    }

    /**
     * GET  /hotel-tables : get all the hotelTables.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of hotelTables in body
     */
    @GetMapping("/hotel-tables")
    @Timed
    public List<HotelTableDTO> getAllHotelTables() {
        log.debug("REST request to get all HotelTables");
        return hotelTableService.findAll();
    }

    /**
     * GET  /hotel-tables/:id : get the "id" hotelTable.
     *
     * @param id the id of the hotelTableDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the hotelTableDTO, or with status 404 (Not Found)
     */
    @GetMapping("/hotel-tables/{id}")
    @Timed
    public ResponseEntity<HotelTableDTO> getHotelTable(@PathVariable Long id) {
        log.debug("REST request to get HotelTable : {}", id);
        Optional<HotelTableDTO> hotelTableDTO = hotelTableService.findOne(id);
        return ResponseUtil.wrapOrNotFound(hotelTableDTO);
    }

    /**
     * DELETE  /hotel-tables/:id : delete the "id" hotelTable.
     *
     * @param id the id of the hotelTableDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/hotel-tables/{id}")
    @Timed
    public ResponseEntity<Void> deleteHotelTable(@PathVariable Long id) {
        log.debug("REST request to delete HotelTable : {}", id);
        try{
        hotelTableService.delete(id);
        }
        catch(Exception e){
            throw new BadRequestAlertException("Can't be delete, Because it has booking", ENTITY_NAME, "idnull");

        }
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
    
    //Custom method
    
    
    /**
     * GET  /hotel-tables : get all the hotelTables.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of hotelTables in body
     */
    @GetMapping("/hotel-tables-hotel")
    @Timed
    public List<HotelTableDTO> getAllHotelTablesByHotel(@RequestParam Long id) {
        log.debug("REST request to get all HotelTables by Hotel");
        return hotelTableService.findAllByHotel(id);
    }

    @GetMapping("/hotel-tables-hotel-status")
    @Timed
    public List<HotelTableDTO> getAllHotelTablesByHotelAndStatus(@RequestParam Long id, String status) {
        log.debug("REST request to get all HotelTables by Hotel");
        return hotelTableService.findAllByHotelAndStatus(id,status);
    }

    @GetMapping("/hotel-tables-hotel-status-based-on-staff")
    @Timed
    public List<HotelTableDTO> findAllByHotelAndStatusBasedOnStaff(@RequestParam Long id, String status, String bookDate, String time) {
        log.debug("REST request to get all HotelTables by Hotel");
        return hotelTableService.findAllByHotelAndStatusBasedOnStaff(id,status,bookDate,time);
    }

    public void checkValidation(HotelTableDTO hotelTableDTO) {
        Hotel hotel = hotelRepository.getOne(hotelTableDTO.getHotelId());
        HotelTable hotelTable= hotelTableRepository.findOneByHotelAndTableNumber(hotel, hotelTableDTO.getTableNumber());
        if(hotelTable != null){
            throw new BadRequestAlertException("Table already exits", ENTITY_NAME, "idexists");
        }
    }
}
