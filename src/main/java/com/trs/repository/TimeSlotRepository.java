package com.trs.repository;

import com.trs.domain.TimeSlot;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the TimeSlot entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TimeSlotRepository extends JpaRepository<TimeSlot, Long> {

}
