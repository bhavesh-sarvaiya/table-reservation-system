package com.trs.repository;

import java.util.List;

import com.trs.domain.TimeSlot;
import com.trs.domain.Timing;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Timing entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TimingRepository extends JpaRepository<Timing, Long> {
    List<Timing> findAllByTimeSlot(TimeSlot timeSlot);
}
