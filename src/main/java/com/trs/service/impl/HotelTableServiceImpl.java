package com.trs.service.impl;

import com.trs.service.HotelTableService;
import com.trs.domain.Hotel;
import com.trs.domain.HotelTable;
import com.trs.domain.Staff;
import com.trs.domain.TimeSlot;
import com.trs.domain.Timing;
import com.trs.domain.enumeration.DayName;
import com.trs.repository.HotelRepository;
import com.trs.repository.HotelTableRepository;
import com.trs.repository.StaffRepository;
import com.trs.repository.TimeSlotRepository;
import com.trs.repository.TimingRepository;
import com.trs.service.dto.HotelTableDTO;
import com.trs.service.mapper.HotelTableMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
/**
 * Service Implementation for managing HotelTable.
 */
@Service
@Transactional
public class HotelTableServiceImpl implements HotelTableService {

    private final Logger log = LoggerFactory.getLogger(HotelTableServiceImpl.class);

    private final HotelTableRepository hotelTableRepository;
    private final HotelRepository hotelRepository;
    private final StaffRepository staffRepository;
    private final TimingRepository timingRepository;
    private final TimeSlotRepository timeSlotRepository;

    
    private final HotelTableMapper hotelTableMapper;

    public HotelTableServiceImpl(HotelTableRepository hotelTableRepository, HotelTableMapper hotelTableMapper, StaffRepository staffRepository,
    HotelRepository hotelRepository,TimingRepository timingRepository, TimeSlotRepository timeSlotRepository) {
        this.hotelTableMapper = hotelTableMapper;
        this.hotelRepository = hotelRepository;
        this.staffRepository = staffRepository;
        this.timingRepository = timingRepository;
        this.timeSlotRepository = timeSlotRepository;
        this.hotelTableRepository = hotelTableRepository;
    }

    /**
     * Save a hotelTable.
     *
     * @param hotelTableDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public HotelTableDTO save(HotelTableDTO hotelTableDTO) {
        log.debug("Request to save HotelTable : {}", hotelTableDTO);
        HotelTable hotelTable = hotelTableMapper.toEntity(hotelTableDTO);
        hotelTable = hotelTableRepository.save(hotelTable);
        return hotelTableMapper.toDto(hotelTable);
    }

    /**
     * Get all the hotelTables.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<HotelTableDTO> findAll() {
        log.debug("Request to get all HotelTables");
        return hotelTableRepository.findAll().stream()
            .map(hotelTableMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one hotelTable by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<HotelTableDTO> findOne(Long id) {
        log.debug("Request to get HotelTable : {}", id);
        return hotelTableRepository.findById(id)
            .map(hotelTableMapper::toDto);
    }

    /**
     * Delete the hotelTable by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete HotelTable : {}", id);
        hotelTableRepository.deleteById(id);
    }

    //Custom Method
	@Override
	public List<HotelTableDTO> findAllByHotel(Long id) {
		 log.debug("Request to get all HotelTables by hotel");
		 Hotel hotel = hotelRepository.findById(id).get();
	        return hotelTableRepository.findAllByHotel(hotel).stream()
	            .map(hotelTableMapper::toDto)
	            .collect(Collectors.toCollection(LinkedList::new));
    }
    
    @Override
	public List<HotelTableDTO> findAllByHotelAndStatus(Long id,String status) {
		 log.debug("Request to get all HotelTables by hotel");
		 Hotel hotel = hotelRepository.findById(id).get();
	        return hotelTableRepository.findAllByHotelAndStatus(hotel,status).stream()
	            .map(hotelTableMapper::toDto)
	            .collect(Collectors.toCollection(LinkedList::new));
    }
    
    @Override
	public List<HotelTableDTO> findAllByHotelAndStatusBasedOnStaff(Long id,String status) {
		 log.debug("Request to get all HotelTables by findAllByHotelAndStatusBasedOnStaff");
         Hotel hotel = hotelRepository.findById(id).get();
         List<Staff> staff = staffRepository.findAllByHotel(hotel);
         if(staff == null){
             return null;
         }
         int staffLength = staff.size();
 
         int d = LocalDate.now().getDayOfWeek().getValue();
         DayName day = null;
         switch (d) {
            
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
         TimeSlot timeSlot = timeSlotRepository.findOneByHotelAndDay(hotel, day);
         String hour = LocalTime.now().getHour() + ":00";
         Timing timing = timingRepository.findOneByTimeSlotAndStartTime(timeSlot, hour);
         if(timing == null) {
             return null;
         }
         Boolean isRushHour = timing.isRushHour();
         int bookableTables;

         if(isRushHour) {
             bookableTables = hotel.getStaffInRushHour() * staffLength;
         } else {
             bookableTables = hotel.getStaffInNormal() * staffLength;
         }
         List<HotelTable> hList = hotelTableRepository.findAllByHotelAndStatus(hotel, "Unavailable");
         int i = 1;
         for (HotelTable hotelTable : hotelTableRepository.findAllByHotelAndStatusOrderByTableNumber(hotel,status)) {
             if(i >= bookableTables) {
                 break;
             }
             hList.add(hotelTable);
             i++;
         }
	        return hList.stream()
	            .map(hotelTableMapper::toDto)
	            .collect(Collectors.toCollection(LinkedList::new));
    }
}
