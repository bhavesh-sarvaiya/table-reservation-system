package com.trs.service.dto;

import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;
import javax.persistence.Lob;
import com.trs.domain.enumeration.FoodType;

/**
 * A DTO for the Cuisine entity.
 */
public class CuisineDTO implements Serializable {

    private Long id;

    @NotNull
    private String name;

    @NotNull
    private Double price;

    @NotNull
    private FoodType type;

    @Lob
    private byte[] foodImage;
    private String foodImageContentType;

    private Long hotelId;

    private String hotelName;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
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
            ", name='" + getName() + "'" +
            ", price=" + getPrice() +
            ", type='" + getType() + "'" +
            ", foodImage='" + getFoodImage() + "'" +
            ", hotel=" + getHotelId() +
            ", hotel='" + getHotelName() + "'" +
            "}";
    }
}
