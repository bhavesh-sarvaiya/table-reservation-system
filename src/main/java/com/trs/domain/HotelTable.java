package com.trs.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A HotelTable.
 */
@Entity
@Table(name = "hotel_table")
public class HotelTable implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "table_number", nullable = false)
    private String tableNumber;

    @NotNull
    @Min(value = 1)
    @Column(name = "no_of_customer", nullable = false)
    private Integer noOfCustomer;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("")
    private Hotel hotel;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTableNumber() {
        return tableNumber;
    }

    public HotelTable tableNumber(String tableNumber) {
        this.tableNumber = tableNumber;
        return this;
    }

    public void setTableNumber(String tableNumber) {
        this.tableNumber = tableNumber;
    }

    public Integer getNoOfCustomer() {
        return noOfCustomer;
    }

    public HotelTable noOfCustomer(Integer noOfCustomer) {
        this.noOfCustomer = noOfCustomer;
        return this;
    }

    public void setNoOfCustomer(Integer noOfCustomer) {
        this.noOfCustomer = noOfCustomer;
    }

    public Hotel getHotel() {
        return hotel;
    }

    public HotelTable hotel(Hotel hotel) {
        this.hotel = hotel;
        return this;
    }

    public void setHotel(Hotel hotel) {
        this.hotel = hotel;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        HotelTable hotelTable = (HotelTable) o;
        if (hotelTable.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), hotelTable.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "HotelTable{" +
            "id=" + getId() +
            ", tableNumber='" + getTableNumber() + "'" +
            ", noOfCustomer=" + getNoOfCustomer() +
            "}";
    }
}
