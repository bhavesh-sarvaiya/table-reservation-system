package com.trs.service.dto;

import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;
import javax.persistence.Lob;

import com.trs.domain.Cuisine;
import com.trs.domain.enumeration.FoodType;

/**
 * A DTO for the Cuisine entity.
 */
public class CuisineDTO implements Serializable {

    private Long id;

    @NotNull
    private FoodType type;

    @Lob
    private byte[] foodImage;
    private String foodImageContentType;

    private Long hotelId;

    private String hotelName;

    public CuisineDTO(){

    }

    public CuisineDTO(Cuisine cuisine){
        this.id=cuisine.getId();
        this.type = cuisine.getType();
        this.foodImage = cuisine.getFoodImage();
        this.hotelId = cuisine.getHotel().getId();
        this.hotelName = cuisine.getHotel().getName();
        this.foodImageContentType = cuisine.getFoodImageContentType();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public FoodType getType() {
        return type;
    }

    public void setType(FoodType type) {
        this.type = type;
    }

    public byte[] getFoodImage() {
        return foodImage;
    }

    public void setFoodImage(byte[] foodImage) {
        this.foodImage = foodImage;
    }

    public String getFoodImageContentType() {
        return foodImageContentType;
    }

    public void setFoodImageContentType(String foodImageContentType) {
        this.foodImageContentType = foodImageContentType;
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

        CuisineDTO cuisineDTO = (CuisineDTO) o;
        if (cuisineDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), cuisineDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CuisineDTO{" +
            "id=" + getId() +
            ", type='" + getType() + "'" +
            ", foodImage='" + getFoodImage() + "'" +
            ", hotel=" + getHotelId() +
            ", hotel='" + getHotelName() + "'" +
            "}";
    }
}
