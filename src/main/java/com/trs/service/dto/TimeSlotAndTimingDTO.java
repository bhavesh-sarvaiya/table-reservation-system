package com.trs.service.dto;

import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;
import com.trs.domain.enumeration.DayName;

/**
 * A DTO for the TimeSlotAndTimingDTO entity.
 */
public class TimeSlotAndTimingDTO {

   private TimingDTO[] timings;
   private TimeSlotDTO timeslotDTO;

   /**
    * @param timeslotDTO the timeslotDTO to set
    */
   public void setTimeslotDTO(TimeSlotDTO timeslotDTO) {
       this.timeslotDTO = timeslotDTO;
   }
   /**
    * @return the timeslotDTO
    */
   public TimeSlotDTO getTimeslotDTO() {
       return timeslotDTO;
   }
   /**
    * @param timings the timings to set
    */
   public void setTimings(TimingDTO[] timings) {
       this.timings = timings;
   }
   /**
    * @return the timings
    */
   public TimingDTO[] getTimings() {
       return timings;
   }
    @Override
    public String toString() {
        return "TimeSlotDTO{" +
            "timeslot=" + getTimeslotDTO() +
            ", timings='" + getTimings() + "'" +
            "}";
    }
}
