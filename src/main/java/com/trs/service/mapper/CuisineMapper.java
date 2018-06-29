package com.trs.service.mapper;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import com.trs.domain.*;
import com.trs.service.dto.CuisineDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Cuisine and its DTO CuisineDTO.
 */
@Mapper(componentModel = "spring", uses = {HotelMapper.class})
public interface CuisineMapper extends EntityMapper<CuisineDTO, Cuisine> {

    @Mapping(source = "hotel.id", target = "hotelId")
    @Mapping(source = "hotel.name", target = "hotelName")
    CuisineDTO toDto(Cuisine cuisine);

    @Mapping(source = "hotelId", target = "hotel")
    Cuisine toEntity(CuisineDTO cuisineDTO);

    default Cuisine fromId(Long id) {
        if (id == null) {
            return null;
        }
        Cuisine cuisine = new Cuisine();
        cuisine.setId(id);
        return cuisine;
    }
}
