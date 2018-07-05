package com.trs.repository;

import com.trs.domain.Booking;
import com.trs.domain.Hotel;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

/**
 * Spring Data  repository for the Booking entity.
 */
@SuppressWarnings("unused")
@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {

    @Query("select booking from Booking booking where booking.user.login = ?#{principal.username}")
    List<Booking> findByUserIsCurrentUser();
    Page<Booking> findAllByHotel(Pageable pageable, Hotel hotel);
    List<Booking> findAllByHotelAndBookDate(Hotel hotel,LocalDate bookDate);
    List<Booking> findAllByHotelAndBookDateAndBookTime(Hotel hotel,LocalDate bookDate,String bookTime);
    List<Booking> findAllByHotelAndBookDateAndBookTimeAndActive(Hotel hotel,LocalDate bookDate,String bookTime,Boolean active);
    List<Booking> findAllByBookDateAndActive(LocalDate bookDate, Boolean active);
    @Query("select booking from Booking booking where booking.user.login = ?#{principal.username}")
    Page<Booking> findByUserIsCurrentUser(Pageable pageable);
    @Query("select booking from Booking booking where booking.user.login = ?#{principal.username} and booking.hotel = ?1")
    Page<Booking> findByUserIsCurrentUserAndHotel(Hotel hotel, Pageable pageable);

}
