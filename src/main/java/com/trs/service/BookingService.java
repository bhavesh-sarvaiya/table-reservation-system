package com.trs.service;

import com.trs.service.dto.BookingDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing Booking.
 */
public interface BookingService {

    /**
     * Save a booking.
     *
     * @param bookingDTO the entity to save
     * @return the persisted entity
     */
    BookingDTO save(BookingDTO bookingDTO);

    /**
     * Get all the bookings.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<BookingDTO> findAll(Pageable pageable);


    /**
     * Get the "id" booking.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<BookingDTO> findOne(Long id);

    /**
     * Delete the "id" booking.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
    Page<BookingDTO> findAll(Pageable pageable, Long hotelId);
    List<BookingDTO> findAllBookDateAndActive(LocalDate bookdate,Boolean active);
    Page<BookingDTO> findByUserIsCurrentUser(Pageable pageable);
    Page<BookingDTO> findByUserIsCurrentUserAndHotel(Pageable pageable,Long hotelId);

}
