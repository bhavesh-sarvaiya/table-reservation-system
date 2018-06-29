package com.trs.repository;

import java.util.List;

import com.trs.domain.Cuisine;
import com.trs.domain.Hotel;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Cuisine entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CuisineRepository extends JpaRepository<Cuisine, Long>, JpaSpecificationExecutor<Cuisine> {
    List<Cuisine> findAllByHotel(Hotel hotel);
}
