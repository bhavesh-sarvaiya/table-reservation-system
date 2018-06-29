package com.trs.service.dto;

import java.io.Serializable;
import com.trs.domain.enumeration.FoodType;
import io.github.jhipster.service.filter.BooleanFilter;
import io.github.jhipster.service.filter.DoubleFilter;
import io.github.jhipster.service.filter.Filter;
import io.github.jhipster.service.filter.FloatFilter;
import io.github.jhipster.service.filter.IntegerFilter;
import io.github.jhipster.service.filter.LongFilter;
import io.github.jhipster.service.filter.StringFilter;






/**
 * Criteria class for the Cuisine entity. This class is used in CuisineResource to
 * receive all the possible filtering options from the Http GET request parameters.
 * For example the following could be a valid requests:
 * <code> /cuisines?id.greaterThan=5&amp;attr1.contains=something&amp;attr2.specified=false</code>
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
public class CuisineCriteria implements Serializable {
    /**
     * Class for filtering FoodType
     */
    public static class FoodTypeFilter extends Filter<FoodType> {
    }

    private static final long serialVersionUID = 1L;


    private LongFilter id;

    private StringFilter name;

    private DoubleFilter price;

    private FoodTypeFilter type;

    private LongFilter hotelId;

    public CuisineCriteria() {
    }

    public LongFilter getId() {
        return id;
    }

    public void setId(LongFilter id) {
        this.id = id;
    }

    public StringFilter getName() {
        return name;
    }

    public void setName(StringFilter name) {
        this.name = name;
    }

    public DoubleFilter getPrice() {
        return price;
    }

    public void setPrice(DoubleFilter price) {
        this.price = price;
    }

    public FoodTypeFilter getType() {
        return type;
    }

    public void setType(FoodTypeFilter type) {
        this.type = type;
    }

    public LongFilter getHotelId() {
        return hotelId;
    }

    public void setHotelId(LongFilter hotelId) {
        this.hotelId = hotelId;
    }

    @Override
    public String toString() {
        return "CuisineCriteria{" +
                (id != null ? "id=" + id + ", " : "") +
                (name != null ? "name=" + name + ", " : "") +
                (price != null ? "price=" + price + ", " : "") +
                (type != null ? "type=" + type + ", " : "") +
                (hotelId != null ? "hotelId=" + hotelId + ", " : "") +
            "}";
    }

}
