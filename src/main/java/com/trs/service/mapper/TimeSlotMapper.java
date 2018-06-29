package com.trs.service.mapper;

import com.trs.domain.*;
import com.trs.service.dto.TimeSlotDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity TimeSlot and its DTO TimeSlotDTO.
 */
@Mapper(componentModel = "spring", uses = {HotelMapper.class})
public interface TimeSlotMapper extends EntityMapper<TimeSlotDTO, TimeSlot> {

    @Mapping(source = "hotel.id", target = "hotelId")
    @Mapping(source = "hotel.name", target = "hotelName")
    TimeSlotDTO toDto(TimeSlot timeSlot);

    @Mapping(source = "hotelId", target = "hotel")
    TimeSlot toEntity(TimeSlotDTO timeSlotDTO);

    default TimeSlot fromId(Long id) {
        if (id == null) {
            return null;
        }
        TimeSlot timeSlot = new TimeSlot();
        timeSlot.setId(id);
        return timeSlot;
    }
}
