package com.trs.repository;

import com.trs.domain.Hotel;
import com.trs.domain.HotelTable;

import java.util.List;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the HotelTable entity.
 */
@SuppressWarnings("unused")
@Repository
public interface HotelTableRepository extends JpaRepository<HotelTable, Long> {
	List<HotelTable> findAllByHotel(Hotel hotel);
}
