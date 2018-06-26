package com.trs.service.mapper;

import com.trs.domain.*;
import com.trs.service.dto.BookingDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Booking and its DTO BookingDTO.
 */
@Mapper(componentModel = "spring", uses = {HotelMapper.class, HotelTableMapper.class})
public interface BookingMapper extends EntityMapper<BookingDTO, Booking> {

    @Mapping(source = "hotel.id", target = "hotelId")
    @Mapping(source = "hotel.name", target = "hotelName")
    @Mapping(source = "hotelTable.id", target = "hotelTableId")
    @Mapping(source = "hotelTable.tableNumber", target = "hotelTableTableNumber")
    BookingDTO toDto(Booking booking);

    @Mapping(source = "hotelId", target = "hotel")
    @Mapping(source = "hotelTableId", target = "hotelTable")
    Booking toEntity(BookingDTO bookingDTO);

    default Booking fromId(Long id) {
        if (id == null) {
            return null;
        }
        Booking booking = new Booking();
        booking.setId(id);
        return booking;
    }
}
