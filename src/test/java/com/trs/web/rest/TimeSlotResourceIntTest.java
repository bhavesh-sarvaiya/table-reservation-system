package com.trs.web.rest;

import com.trs.TableReservationApp;

import com.trs.domain.TimeSlot;
import com.trs.domain.Hotel;
import com.trs.repository.TimeSlotRepository;
import com.trs.service.TimeSlotService;
import com.trs.service.dto.TimeSlotDTO;
import com.trs.service.mapper.TimeSlotMapper;
import com.trs.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;


import static com.trs.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.trs.domain.enumeration.DayName;
/**
 * Test class for the TimeSlotResource REST controller.
 *
 * @see TimeSlotResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TableReservationApp.class)
public class TimeSlotResourceIntTest {

    private static final DayName DEFAULT_DAY = DayName.MONDAY;
    private static final DayName UPDATED_DAY = DayName.TUESDAY;

    private static final Boolean DEFAULT_STATUS = false;
    private static final Boolean UPDATED_STATUS = true;

    @Autowired
    private TimeSlotRepository timeSlotRepository;


    @Autowired
    private TimeSlotMapper timeSlotMapper;
    

    @Autowired
    private TimeSlotService timeSlotService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restTimeSlotMockMvc;

    private TimeSlot timeSlot;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TimeSlotResource timeSlotResource = new TimeSlotResource(timeSlotService);
        this.restTimeSlotMockMvc = MockMvcBuilders.standaloneSetup(timeSlotResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TimeSlot createEntity(EntityManager em) {
        TimeSlot timeSlot = new TimeSlot()
            .day(DEFAULT_DAY)
            .status(DEFAULT_STATUS);
        // Add required entity
        Hotel hotel = HotelResourceIntTest.createEntity(em);
        em.persist(hotel);
        em.flush();
        timeSlot.setHotel(hotel);
        return timeSlot;
    }

    @Before
    public void initTest() {
        timeSlot = createEntity(em);
    }

    @Test
    @Transactional
    public void createTimeSlot() throws Exception {
        int databaseSizeBeforeCreate = timeSlotRepository.findAll().size();

        // Create the TimeSlot
        TimeSlotDTO timeSlotDTO = timeSlotMapper.toDto(timeSlot);
        restTimeSlotMockMvc.perform(post("/api/time-slots")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(timeSlotDTO)))
            .andExpect(status().isCreated());

        // Validate the TimeSlot in the database
        List<TimeSlot> timeSlotList = timeSlotRepository.findAll();
        assertThat(timeSlotList).hasSize(databaseSizeBeforeCreate + 1);
        TimeSlot testTimeSlot = timeSlotList.get(timeSlotList.size() - 1);
        assertThat(testTimeSlot.getDay()).isEqualTo(DEFAULT_DAY);
        assertThat(testTimeSlot.isStatus()).isEqualTo(DEFAULT_STATUS);
    }

    @Test
    @Transactional
    public void createTimeSlotWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = timeSlotRepository.findAll().size();

        // Create the TimeSlot with an existing ID
        timeSlot.setId(1L);
        TimeSlotDTO timeSlotDTO = timeSlotMapper.toDto(timeSlot);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTimeSlotMockMvc.perform(post("/api/time-slots")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(timeSlotDTO)))
            .andExpect(status().isBadRequest());

        // Validate the TimeSlot in the database
        List<TimeSlot> timeSlotList = timeSlotRepository.findAll();
        assertThat(timeSlotList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkDayIsRequired() throws Exception {
        int databaseSizeBeforeTest = timeSlotRepository.findAll().size();
        // set the field null
        timeSlot.setDay(null);

        // Create the TimeSlot, which fails.
        TimeSlotDTO timeSlotDTO = timeSlotMapper.toDto(timeSlot);

        restTimeSlotMockMvc.perform(post("/api/time-slots")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(timeSlotDTO)))
            .andExpect(status().isBadRequest());

        List<TimeSlot> timeSlotList = timeSlotRepository.findAll();
        assertThat(timeSlotList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllTimeSlots() throws Exception {
        // Initialize the database
        timeSlotRepository.saveAndFlush(timeSlot);

        // Get all the timeSlotList
        restTimeSlotMockMvc.perform(get("/api/time-slots?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(timeSlot.getId().intValue())))
            .andExpect(jsonPath("$.[*].day").value(hasItem(DEFAULT_DAY.toString())))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.booleanValue())));
    }
    

    @Test
    @Transactional
    public void getTimeSlot() throws Exception {
        // Initialize the database
        timeSlotRepository.saveAndFlush(timeSlot);

        // Get the timeSlot
        restTimeSlotMockMvc.perform(get("/api/time-slots/{id}", timeSlot.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(timeSlot.getId().intValue()))
            .andExpect(jsonPath("$.day").value(DEFAULT_DAY.toString()))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS.booleanValue()));
    }
    @Test
    @Transactional
    public void getNonExistingTimeSlot() throws Exception {
        // Get the timeSlot
        restTimeSlotMockMvc.perform(get("/api/time-slots/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTimeSlot() throws Exception {
        // Initialize the database
        timeSlotRepository.saveAndFlush(timeSlot);

        int databaseSizeBeforeUpdate = timeSlotRepository.findAll().size();

        // Update the timeSlot
        TimeSlot updatedTimeSlot = timeSlotRepository.findById(timeSlot.getId()).get();
        // Disconnect from session so that the updates on updatedTimeSlot are not directly saved in db
        em.detach(updatedTimeSlot);
        updatedTimeSlot
            .day(UPDATED_DAY)
            .status(UPDATED_STATUS);
        TimeSlotDTO timeSlotDTO = timeSlotMapper.toDto(updatedTimeSlot);

        restTimeSlotMockMvc.perform(put("/api/time-slots")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(timeSlotDTO)))
            .andExpect(status().isOk());

        // Validate the TimeSlot in the database
        List<TimeSlot> timeSlotList = timeSlotRepository.findAll();
        assertThat(timeSlotList).hasSize(databaseSizeBeforeUpdate);
        TimeSlot testTimeSlot = timeSlotList.get(timeSlotList.size() - 1);
        assertThat(testTimeSlot.getDay()).isEqualTo(UPDATED_DAY);
        assertThat(testTimeSlot.isStatus()).isEqualTo(UPDATED_STATUS);
    }

    @Test
    @Transactional
    public void updateNonExistingTimeSlot() throws Exception {
        int databaseSizeBeforeUpdate = timeSlotRepository.findAll().size();

        // Create the TimeSlot
        TimeSlotDTO timeSlotDTO = timeSlotMapper.toDto(timeSlot);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restTimeSlotMockMvc.perform(put("/api/time-slots")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(timeSlotDTO)))
            .andExpect(status().isBadRequest());

        // Validate the TimeSlot in the database
        List<TimeSlot> timeSlotList = timeSlotRepository.findAll();
        assertThat(timeSlotList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteTimeSlot() throws Exception {
        // Initialize the database
        timeSlotRepository.saveAndFlush(timeSlot);

        int databaseSizeBeforeDelete = timeSlotRepository.findAll().size();

        // Get the timeSlot
        restTimeSlotMockMvc.perform(delete("/api/time-slots/{id}", timeSlot.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<TimeSlot> timeSlotList = timeSlotRepository.findAll();
        assertThat(timeSlotList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TimeSlot.class);
        TimeSlot timeSlot1 = new TimeSlot();
        timeSlot1.setId(1L);
        TimeSlot timeSlot2 = new TimeSlot();
        timeSlot2.setId(timeSlot1.getId());
        assertThat(timeSlot1).isEqualTo(timeSlot2);
        timeSlot2.setId(2L);
        assertThat(timeSlot1).isNotEqualTo(timeSlot2);
        timeSlot1.setId(null);
        assertThat(timeSlot1).isNotEqualTo(timeSlot2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(TimeSlotDTO.class);
        TimeSlotDTO timeSlotDTO1 = new TimeSlotDTO();
        timeSlotDTO1.setId(1L);
        TimeSlotDTO timeSlotDTO2 = new TimeSlotDTO();
        assertThat(timeSlotDTO1).isNotEqualTo(timeSlotDTO2);
        timeSlotDTO2.setId(timeSlotDTO1.getId());
        assertThat(timeSlotDTO1).isEqualTo(timeSlotDTO2);
        timeSlotDTO2.setId(2L);
        assertThat(timeSlotDTO1).isNotEqualTo(timeSlotDTO2);
        timeSlotDTO1.setId(null);
        assertThat(timeSlotDTO1).isNotEqualTo(timeSlotDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(timeSlotMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(timeSlotMapper.fromId(null)).isNull();
    }
}
