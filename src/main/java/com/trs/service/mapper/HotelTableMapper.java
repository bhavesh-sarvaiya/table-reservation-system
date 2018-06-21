package com.trs.service.mapper;

import com.trs.domain.*;
import com.trs.service.dto.HotelTableDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity HotelTable and its DTO HotelTableDTO.
 */
@Mapper(componentModel = "spring", uses = {HotelMapper.class})
public interface HotelTableMapper extends EntityMapper<HotelTableDTO, HotelTable> {

    @Mapping(source = "hotel.id", target = "hotelId")
    HotelTableDTO toDto(HotelTable hotelTable);

    @Mapping(source = "hotelId", target = "hotel")
    HotelTable toEntity(HotelTableDTO hotelTableDTO);

    default HotelTable fromId(Long id) {
        if (id == null) {
            return null;
        }
        HotelTable hotelTable = new HotelTable();
        hotelTable.setId(id);
        return hotelTable;
    }
}
