package com.trs.service.dto;

import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;
import javax.persistence.Lob;

/**
 * A DTO for the Hotel entity.
 */
public class HotelDTO implements Serializable {

    private Long id;

    @Lob
    private byte[] image;
    private String imageContentType;

    @NotNull
    private String name;

    @NotNull
    private String type;

    @NotNull
    private String city;

    @NotNull
    private String address;

    @NotNull
    @Size(max = 6)
    private String pincode;

    private String description;

    private Integer staffInRushHour;

    private Integer staffInNormal;

    @NotNull
    private String openTime;

    @NotNull
    private String closeTime;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public byte[] getImage() {
        return image;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }

    public String getImageContentType() {
        return imageContentType;
    }

    public void setImageContentType(String imageContentType) {
        this.imageContentType = imageContentType;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPincode() {
        return pincode;
    }

    public void setPincode(String pincode) {
        this.pincode = pincode;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getStaffInRushHour() {
        return staffInRushHour;
    }

    public void setStaffInRushHour(Integer staffInRushHour) {
        this.staffInRushHour = staffInRushHour;
    }

    public Integer getStaffInNormal() {
        return staffInNormal;
    }

    public void setStaffInNormal(Integer staffInNormal) {
        this.staffInNormal = staffInNormal;
    }

    public String getOpenTime() {
        return openTime;
    }

    public void setOpenTime(String openTime) {
        this.openTime = openTime;
    }

    public String getCloseTime() {
        return closeTime;
    }

    public void setCloseTime(String closeTime) {
        this.closeTime = closeTime;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        HotelDTO hotelDTO = (HotelDTO) o;
        if (hotelDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), hotelDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "HotelDTO{" +
            "id=" + getId() +
            ", image='" + getImage() + "'" +
            ", name='" + getName() + "'" +
            ", type='" + getType() + "'" +
            ", city='" + getCity() + "'" +
            ", address='" + getAddress() + "'" +
            ", pincode='" + getPincode() + "'" +
            ", description='" + getDescription() + "'" +
            ", staffInRushHour=" + getStaffInRushHour() +
            ", staffInNormal=" + getStaffInNormal() +
            ", openTime='" + getOpenTime() + "'" +
            ", closeTime='" + getCloseTime() + "'" +
            "}";
    }
}
