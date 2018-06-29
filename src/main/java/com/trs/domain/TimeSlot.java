package com.trs.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

import com.trs.domain.enumeration.DayName;

/**
 * A TimeSlot.
 */
@Entity
@Table(name = "time_slot")
public class TimeSlot implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "day", nullable = false)
    private DayName day;

    @Column(name = "status")
    private Boolean status;

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

    public DayName getDay() {
        return day;
    }

    public TimeSlot day(DayName day) {
        this.day = day;
        return this;
    }

    public void setDay(DayName day) {
        this.day = day;
    }

    public Boolean isStatus() {
        return status;
    }

    public TimeSlot status(Boolean status) {
        this.status = status;
        return this;
    }

    public void setStatus(Boolean status) {
        this.status = status;
    }

    public Hotel getHotel() {
        return hotel;
    }

    public TimeSlot hotel(Hotel hotel) {
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
        TimeSlot timeSlot = (TimeSlot) o;
        if (timeSlot.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), timeSlot.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "TimeSlot{" +
            "id=" + getId() +
            ", day='" + getDay() + "'" +
            ", status='" + isStatus() + "'" +
            "}";
    }
}
