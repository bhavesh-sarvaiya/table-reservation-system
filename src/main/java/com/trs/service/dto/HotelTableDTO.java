package com.trs.service.dto;

import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the HotelTable entity.
 */
public class HotelTableDTO implements Serializable {

    private Long id;

    @NotNull
    private String tableNumber;

    @NotNull
    @Min(value = 1)
    private Integer noOfCustomer;

    private Long hotelId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTableNumber() {
        return tableNumber;
    }

    public void setTableNumber(String tableNumber) {
        this.tableNumber = tableNumber;
    }

    public Integer getNoOfCustomer() {
        return noOfCustomer;
    }

    public void setNoOfCustomer(Integer noOfCustomer) {
        this.noOfCustomer = noOfCustomer;
    }

    public Long getHotelId() {
        return hotelId;
    }

    public void setHotelId(Long hotelId) {
        this.hotelId = hotelId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        HotelTableDTO hotelTableDTO = (HotelTableDTO) o;
        if (hotelTableDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), hotelTableDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "HotelTableDTO{" +
            "id=" + getId() +
            ", tableNumber='" + getTableNumber() + "'" +
            ", noOfCustomer=" + getNoOfCustomer() +
            ", hotel=" + getHotelId() +
            "}";
    }
}
