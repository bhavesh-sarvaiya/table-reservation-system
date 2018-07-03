package com.trs.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

import com.trs.domain.enumeration.FoodType;

/**
 * A Cuisine.
 */
@Entity
@Table(name = "cuisine")
public class Cuisine implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "jhi_type", nullable = false)
    private FoodType type;

    @Lob
    @Column(name = "food_image")
    private byte[] foodImage;

    @Column(name = "food_image_content_type")
    private String foodImageContentType;

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

    public FoodType getType() {
        return type;
    }

    public Cuisine type(FoodType type) {
        this.type = type;
        return this;
    }

    public void setType(FoodType type) {
        this.type = type;
    }

    public byte[] getFoodImage() {
        return foodImage;
    }

    public Cuisine foodImage(byte[] foodImage) {
        this.foodImage = foodImage;
        return this;
    }

    public void setFoodImage(byte[] foodImage) {
        this.foodImage = foodImage;
    }

    public String getFoodImageContentType() {
        return foodImageContentType;
    }

    public Cuisine foodImageContentType(String foodImageContentType) {
        this.foodImageContentType = foodImageContentType;
        return this;
    }

    public void setFoodImageContentType(String foodImageContentType) {
        this.foodImageContentType = foodImageContentType;
    }

    public Hotel getHotel() {
        return hotel;
    }

    public Cuisine hotel(Hotel hotel) {
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
        Cuisine cuisine = (Cuisine) o;
        if (cuisine.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), cuisine.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Cuisine{" +
            "id=" + getId() +
            ", type='" + getType() + "'" +
            ", foodImage='" + getFoodImage() + "'" +
            ", foodImageContentType='" + getFoodImageContentType() + "'" +
            "}";
    }
}
