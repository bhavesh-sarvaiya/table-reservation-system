package com.trs.service.mapper;

import com.trs.domain.*;
import com.trs.service.dto.TimingDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Timing and its DTO TimingDTO.
 */
@Mapper(componentModel = "spring", uses = {TimeSlotMapper.class})
public interface TimingMapper extends EntityMapper<TimingDTO, Timing> {

    @Mapping(source = "timeSlot.id", target = "timeSlotId")
    @Mapping(source = "timeSlot.day", target = "timeSlotDay")
    TimingDTO toDto(Timing timing);

    @Mapping(source = "timeSlotId", target = "timeSlot")
    Timing toEntity(TimingDTO timingDTO);

    default Timing fromId(Long id) {
        if (id == null) {
            return null;
        }
        Timing timing = new Timing();
        timing.setId(id);
        return timing;
    }
}
