package com.trs.repository;

import java.util.List;
import java.util.Optional;

import com.trs.domain.Cuisine;
import com.trs.domain.Hotel;
import com.trs.domain.enumeration.FoodType;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Cuisine entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CuisineRepository extends JpaRepository<Cuisine, Long>, JpaSpecificationExecutor<Cuisine> {
    List<Cuisine> findAllByHotel(Hotel hotel);
    Page<Cuisine> findAllByHotel(Pageable pageable,Hotel hotel);
    Optional<Cuisine> findOneByTypeAndHotel(FoodType foodType, Hotel hotel);
}
