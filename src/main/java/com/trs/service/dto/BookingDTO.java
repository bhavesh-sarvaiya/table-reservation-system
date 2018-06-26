package com.trs.service.dto;

import java.time.LocalDate;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the Booking entity.
 */
public class BookingDTO implements Serializable {

    private Long id;

    @NotNull
    private LocalDate bookDate;

    @NotNull
    private String bookTime;

    @NotNull
    private Integer noOfGuest;

    private Long hotelId;

    private String hotelName;

    private Long hotelTableId;

    private String hotelTableTableNumber;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getBookDate() {
        return bookDate;
    }

    public void setBookDate(LocalDate bookDate) {
        this.bookDate = bookDate;
    }

    public String getBookTime() {
        return bookTime;
    }

    public void setBookTime(String bookTime) {
        this.bookTime = bookTime;
    }

    public Integer getNoOfGuest() {
        return noOfGuest;
    }

    public void setNoOfGuest(Integer noOfGuest) {
        this.noOfGuest = noOfGuest;
    }

    public Long getHotelId() {
        return hotelId;
    }

    public void setHotelId(Long hotelId) {
        this.hotelId = hotelId;
    }

        public String getHotelName() {
            return hotelName;
        }

        public void setHotelName(String hotelName) {
            this.hotelName = hotelName;
        }

    public Long getHotelTableId() {
        return hotelTableId;
    }

    public void setHotelTableId(Long hotelTableId) {
        this.hotelTableId = hotelTableId;
    }

    public String getHotelTableTableNumber() {
        return hotelTableTableNumber;
    }

    public void setHotelTableTableNumber(String hotelTableTableNumber) {
        this.hotelTableTableNumber = hotelTableTableNumber;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        BookingDTO bookingDTO = (BookingDTO) o;
        if (bookingDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), bookingDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "BookingDTO{" +
            "id=" + getId() +
            ", bookDate='" + getBookDate() + "'" +
            ", bookTime='" + getBookTime() + "'" +
            ", noOfGuest=" + getNoOfGuest() +
            ", hotel=" + getHotelId() +
            ", hotel='" + getHotelName() + "'" +
            ", hotelTable=" + getHotelTableId() +
            ", hotelTable='" + getHotelTableTableNumber() + "'" +
            "}";
    }
}
