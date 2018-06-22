package com.trs.repository;

import java.util.List;

import com.trs.domain.Hotel;
import com.trs.domain.Staff;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Staff entity.
 */
@SuppressWarnings("unused")
@Repository
public interface StaffRepository extends JpaRepository<Staff, Long> {
    List<Staff> findAllByHotel(Hotel hotel);
}
