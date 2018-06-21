package com.trs.service.mapper;

import com.trs.domain.*;
import com.trs.service.dto.HotelDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Hotel and its DTO HotelDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface HotelMapper extends EntityMapper<HotelDTO, Hotel> {



    default Hotel fromId(Long id) {
        if (id == null) {
            return null;
        }
        Hotel hotel = new Hotel();
        hotel.setId(id);
        return hotel;
    }
}
