package com.trs.service.dto;

import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the Timing entity.
 */
public class TimingDTO implements Serializable {

    private Long id;

    @NotNull
    private String startTime;

    @NotNull
    private String endTime;

    private Boolean rushHour;

    private Long timeSlotId;

    private String timeSlotDay;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getStartTime() {
        return startTime;
    }

    public void setStartTime(String startTime) {
        this.startTime = startTime;
    }

    public String getEndTime() {
        return endTime;
    }

    public void setEndTime(String endTime) {
        this.endTime = endTime;
    }

    public Boolean isRushHour() {
        return rushHour;
    }

    public void setRushHour(Boolean rushHour) {
        this.rushHour = rushHour;
    }

    public Long getTimeSlotId() {
        return timeSlotId;
    }

    public void setTimeSlotId(Long timeSlotId) {
        this.timeSlotId = timeSlotId;
    }

    public String getTimeSlotDay() {
        return timeSlotDay;
    }

    public void setTimeSlotDay(String timeSlotDay) {
        this.timeSlotDay = timeSlotDay;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        TimingDTO timingDTO = (TimingDTO) o;
        if (timingDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), timingDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "TimingDTO{" +
            "id=" + getId() +
            ", startTime='" + getStartTime() + "'" +
            ", endTime='" + getEndTime() + "'" +
            ", rushHour='" + isRushHour() + "'" +
            ", timeSlot=" + getTimeSlotId() +
            ", timeSlot='" + getTimeSlotDay() + "'" +
            "}";
    }
}
