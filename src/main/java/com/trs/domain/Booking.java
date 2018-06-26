package com.trs.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

/**
 * A Booking.
 */
@Entity
@Table(name = "booking")
public class Booking implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "book_date", nullable = false)
    private LocalDate bookDate;

    @NotNull
    @Column(name = "book_time", nullable = false)
    private String bookTime;

    @NotNull
    @Column(name = "no_of_guest", nullable = false)
    private Integer noOfGuest;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("")
    private Hotel hotel;

    @ManyToOne
    @JsonIgnoreProperties("")
    private HotelTable hotelTable;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getBookDate() {
        return bookDate;
    }

    public Booking bookDate(LocalDate bookDate) {
        this.bookDate = bookDate;
        return this;
    }

    public void setBookDate(LocalDate bookDate) {
        this.bookDate = bookDate;
    }

    public String getBookTime() {
        return bookTime;
    }

    public Booking bookTime(String bookTime) {
        this.bookTime = bookTime;
        return this;
    }

    public void setBookTime(String bookTime) {
        this.bookTime = bookTime;
    }

    public Integer getNoOfGuest() {
        return noOfGuest;
    }

    public Booking noOfGuest(Integer noOfGuest) {
        this.noOfGuest = noOfGuest;
        return this;
    }

    public void setNoOfGuest(Integer noOfGuest) {
        this.noOfGuest = noOfGuest;
    }

    public Hotel getHotel() {
        return hotel;
    }

    public Booking hotel(Hotel hotel) {
        this.hotel = hotel;
        return this;
    }

    public void setHotel(Hotel hotel) {
        this.hotel = hotel;
    }

    public HotelTable getHotelTable() {
        return hotelTable;
    }

    public Booking hotelTable(HotelTable hotelTable) {
        this.hotelTable = hotelTable;
        return this;
    }

    public void setHotelTable(HotelTable hotelTable) {
        this.hotelTable = hotelTable;
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
        Booking booking = (Booking) o;
        if (booking.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), booking.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Booking{" +
            "id=" + getId() +
            ", bookDate='" + getBookDate() + "'" +
            ", bookTime='" + getBookTime() + "'" +
            ", noOfGuest=" + getNoOfGuest() +
            "}";
    }
}
