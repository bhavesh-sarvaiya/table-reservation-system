package com.trs.repository;

import com.trs.domain.Hotel;
import com.trs.domain.TimeSlot;
import com.trs.domain.enumeration.DayName;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the TimeSlot entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TimeSlotRepository extends JpaRepository<TimeSlot, Long> {
    TimeSlot findOneByHotelAndDay(Hotel hotel, DayName day);
}
