package com.trs;
import java.util.TimerTask;

import com.trs.domain.Booking;
import com.trs.service.BookingService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.Date;
@SpringBootApplication
public class ScheduledTask extends TimerTask {

	Date now; // to display current time
	// @Autowired
	// private TimeSlotRepository timeSlotRepository;
	@Autowired
	private  static BookingService bookingService;
	// Add your task here
	// public ScheduledTask(BookingService bookingService) {
	// 	this.bookingService = bookingService;
	// }
	public void run() {
		now = new Date(); // initialize date
		System.out.println("Time is :" + now); // Display current time

	 	System.out.println("booking: " + getBookingService().findOne(1752L));
	}
	@Autowired
	public void setBookingService(BookingService bookingService){
		this.bookingService = bookingService;
		System.out.println("ok"+bookingService);
	}

	public BookingService getBookingService(){
		return this.bookingService;
		
	}
}