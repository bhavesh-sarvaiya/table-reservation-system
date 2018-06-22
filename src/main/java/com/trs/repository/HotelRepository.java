package com.trs.repository;

import com.trs.domain.Hotel;

import java.util.List;


import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Hotel entity.
 */
@SuppressWarnings("unused")
@Repository
public interface HotelRepository extends JpaRepository<Hotel, Long> {
	
	
	@Query("SELECT h FROM Hotel h WHERE h.name LIKE %:name%")
    public List<Hotel> searchWithJPQLQuery(@Param("name") String name);
}
