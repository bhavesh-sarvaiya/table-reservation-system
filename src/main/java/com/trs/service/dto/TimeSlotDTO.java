package com.trs.service.dto;

import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;
import com.trs.domain.enumeration.DayName;

/**
 * A DTO for the TimeSlot entity.
 */
public class TimeSlotDTO implements Serializable {

    private Long id;

    @NotNull
    private DayName day;

    private Boolean status;

    private Long hotelId;

    private String hotelName;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public DayName getDay() {
        return day;
    }

    public void setDay(DayName day) {
        this.day = day;
    }

    public Boolean isStatus() {
        return status;
    }

    public void setStatus(Boolean status) {
        this.status = status;
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

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        TimeSlotDTO timeSlotDTO = (TimeSlotDTO) o;
        if (timeSlotDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), timeSlotDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "TimeSlotDTO{" +
            "id=" + getId() +
            ", day='" + getDay() + "'" +
            ", status='" + isStatus() + "'" +
            ", hotel=" + getHotelId() +
            ", hotel='" + getHotelName() + "'" +
            "}";
    }
}
