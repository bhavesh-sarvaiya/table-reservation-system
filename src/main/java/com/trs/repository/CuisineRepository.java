package com.trs.repository;

import com.trs.domain.Cuisine;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Cuisine entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CuisineRepository extends JpaRepository<Cuisine, Long>, JpaSpecificationExecutor<Cuisine> {

}
