package com.trs;
import java.util.TimerTask;
import java.util.concurrent.TimeUnit;

import com.trs.domain.Booking;
import com.trs.domain.enumeration.DayName;
import com.trs.service.BookingService;
import com.trs.service.TimeSlotService;
import com.trs.service.TimingService;
import com.trs.service.dto.BookingDTO;
import com.trs.service.dto.TimeSlotDTO;
import com.trs.service.dto.TimingDTO;

import org.apache.commons.logging.Log;
import org.joda.time.DateTime;
import org.joda.time.Minutes;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import javassist.bytecode.stackmap.BasicBlock.Catch;

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;
@SpringBootApplication
public class ScheduledTask extends TimerTask {
	private static final Logger log = LoggerFactory.getLogger(ScheduledTask.class);
	Date now; // to display current time
	// @Autowired
	// private TimeSlotRepository timeSlotRepository;
	@Autowired
	private  static BookingService bookingService;

	@Autowired
	private static  TimeSlotService timeSlotService;

	@Autowired
	private static  TimingService timingService;
	
	// public ScheduledTask(BookingService bookingService) {
	// 	this.bookingService = bookingService;
	// }

	public void run() {
		
		now = new Date(); // initialize date
		System.out.println("\n# Time is :" + now); // Display current time
		// System.out.println("booking: " +  bookingService);

		//  test();
		 List<BookingDTO> bookings = bookingService.findAllBookDateAndActive(LocalDate.now(), true);

		 for (BookingDTO booking : bookings) {
			log.info("booking: {}",booking);
			DayName day = null;
			switch (booking.getBookDate().getDayOfWeek().getValue()) {
			case 1:
				day = DayName.MONDAY;
				break;
			case 2:
				day = DayName.TUESDAY;
				break;
			case 3:
				day = DayName.WEDNESDAY;
				break;
			case 4:
				day = DayName.THRUSDAY;
				break;
			case 5:
				day = DayName.FRIDAY;
				break;
			case 6:
				day = DayName.SATURDAY;
				break;
			case 7:
				day = DayName.SUNDAY;
				break;
			}
			TimeSlotDTO timeSlotDTO = timeSlotService.findOneByHotelAndDay(booking.getHotelId(), day);
			if (timeSlotDTO == null)
				return;
			TimingDTO timingDTO = timingService.findOneByTimeSlotAndStartTime(timeSlotDTO.getId(),
					booking.getBookTime());
			if (timingDTO == null)
				return;
			SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm");
			Date date = null;
			try {
				date = format.parse(booking.getBookDate() + " " + timingDTO.getEndTime());
			} catch (Exception e) {
				e.printStackTrace();
			}
			long diff = new Date().getTime() - date.getTime();
			;

			if (diff >= 0) {
				booking.setActive(false);
				bookingService.save(booking);
				log.info("set booking false for: {}",booking);
			}
			System.out.println("\n\n# curre time: " + new Date());
			System.out.println("\n# book time: " + date);
			int minutes = (int) TimeUnit.MILLISECONDS.toMinutes(diff);
			System.out.println("\n# diff: " + diff);

		}
	}
	@Autowired
	public void setBookingService(BookingService bookingService){
		this.bookingService = bookingService;
	}

	// public BookingService getBookingService(){
	// 	return this.bookingService;
		
	// }

	@Autowired
	public void setTimeSlotService(TimeSlotService timeSlotService){
		this.timeSlotService = timeSlotService;
	}

	@Autowired
	public void setTimingService(TimingService timingService){
		this.timingService = timingService;
	}

	// public TimeSlotService getTimeSlotService(){
	// 	return this.timeSlotService;
		
	// }

	// @Autowired
	// public void setTimeSlotService(TimeSlotService timeSlotService){
	// 	this.timeSlotService = timeSlotService;
	// }

	// public TimeSlotService getTimeSlotService(){
	// 	return this.timeSlotService;
		
	// }
	
}