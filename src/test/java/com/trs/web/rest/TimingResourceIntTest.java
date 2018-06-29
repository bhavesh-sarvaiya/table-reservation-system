package com.trs.web.rest;

import com.trs.TableReservationApp;

import com.trs.domain.Timing;
import com.trs.domain.TimeSlot;
import com.trs.repository.TimingRepository;
import com.trs.service.TimingService;
import com.trs.service.dto.TimingDTO;
import com.trs.service.mapper.TimingMapper;
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

/**
 * Test class for the TimingResource REST controller.
 *
 * @see TimingResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TableReservationApp.class)
public class TimingResourceIntTest {

    private static final String DEFAULT_START_TIME = "AAAAAAAAAA";
    private static final String UPDATED_START_TIME = "BBBBBBBBBB";

    private static final String DEFAULT_END_TIME = "AAAAAAAAAA";
    private static final String UPDATED_END_TIME = "BBBBBBBBBB";

    @Autowired
    private TimingRepository timingRepository;


    @Autowired
    private TimingMapper timingMapper;
    

    @Autowired
    private TimingService timingService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restTimingMockMvc;

    private Timing timing;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TimingResource timingResource = new TimingResource(timingService);
        this.restTimingMockMvc = MockMvcBuilders.standaloneSetup(timingResource)
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
    public static Timing createEntity(EntityManager em) {
        Timing timing = new Timing()
            .startTime(DEFAULT_START_TIME)
            .endTime(DEFAULT_END_TIME);
        // Add required entity
        TimeSlot timeSlot = TimeSlotResourceIntTest.createEntity(em);
        em.persist(timeSlot);
        em.flush();
        timing.setTimeSlot(timeSlot);
        return timing;
    }

    @Before
    public void initTest() {
        timing = createEntity(em);
    }

    @Test
    @Transactional
    public void createTiming() throws Exception {
        int databaseSizeBeforeCreate = timingRepository.findAll().size();

        // Create the Timing
        TimingDTO timingDTO = timingMapper.toDto(timing);
        restTimingMockMvc.perform(post("/api/timings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(timingDTO)))
            .andExpect(status().isCreated());

        // Validate the Timing in the database
        List<Timing> timingList = timingRepository.findAll();
        assertThat(timingList).hasSize(databaseSizeBeforeCreate + 1);
        Timing testTiming = timingList.get(timingList.size() - 1);
        assertThat(testTiming.getStartTime()).isEqualTo(DEFAULT_START_TIME);
        assertThat(testTiming.getEndTime()).isEqualTo(DEFAULT_END_TIME);
    }

    @Test
    @Transactional
    public void createTimingWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = timingRepository.findAll().size();

        // Create the Timing with an existing ID
        timing.setId(1L);
        TimingDTO timingDTO = timingMapper.toDto(timing);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTimingMockMvc.perform(post("/api/timings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(timingDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Timing in the database
        List<Timing> timingList = timingRepository.findAll();
        assertThat(timingList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkStartTimeIsRequired() throws Exception {
        int databaseSizeBeforeTest = timingRepository.findAll().size();
        // set the field null
        timing.setStartTime(null);

        // Create the Timing, which fails.
        TimingDTO timingDTO = timingMapper.toDto(timing);

        restTimingMockMvc.perform(post("/api/timings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(timingDTO)))
            .andExpect(status().isBadRequest());

        List<Timing> timingList = timingRepository.findAll();
        assertThat(timingList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkEndTimeIsRequired() throws Exception {
        int databaseSizeBeforeTest = timingRepository.findAll().size();
        // set the field null
        timing.setEndTime(null);

        // Create the Timing, which fails.
        TimingDTO timingDTO = timingMapper.toDto(timing);

        restTimingMockMvc.perform(post("/api/timings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(timingDTO)))
            .andExpect(status().isBadRequest());

        List<Timing> timingList = timingRepository.findAll();
        assertThat(timingList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllTimings() throws Exception {
        // Initialize the database
        timingRepository.saveAndFlush(timing);

        // Get all the timingList
        restTimingMockMvc.perform(get("/api/timings?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(timing.getId().intValue())))
            .andExpect(jsonPath("$.[*].startTime").value(hasItem(DEFAULT_START_TIME.toString())))
            .andExpect(jsonPath("$.[*].endTime").value(hasItem(DEFAULT_END_TIME.toString())));
    }
    

    @Test
    @Transactional
    public void getTiming() throws Exception {
        // Initialize the database
        timingRepository.saveAndFlush(timing);

        // Get the timing
        restTimingMockMvc.perform(get("/api/timings/{id}", timing.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(timing.getId().intValue()))
            .andExpect(jsonPath("$.startTime").value(DEFAULT_START_TIME.toString()))
            .andExpect(jsonPath("$.endTime").value(DEFAULT_END_TIME.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingTiming() throws Exception {
        // Get the timing
        restTimingMockMvc.perform(get("/api/timings/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTiming() throws Exception {
        // Initialize the database
        timingRepository.saveAndFlush(timing);

        int databaseSizeBeforeUpdate = timingRepository.findAll().size();

        // Update the timing
        Timing updatedTiming = timingRepository.findById(timing.getId()).get();
        // Disconnect from session so that the updates on updatedTiming are not directly saved in db
        em.detach(updatedTiming);
        updatedTiming
            .startTime(UPDATED_START_TIME)
            .endTime(UPDATED_END_TIME);
        TimingDTO timingDTO = timingMapper.toDto(updatedTiming);

        restTimingMockMvc.perform(put("/api/timings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(timingDTO)))
            .andExpect(status().isOk());

        // Validate the Timing in the database
        List<Timing> timingList = timingRepository.findAll();
        assertThat(timingList).hasSize(databaseSizeBeforeUpdate);
        Timing testTiming = timingList.get(timingList.size() - 1);
        assertThat(testTiming.getStartTime()).isEqualTo(UPDATED_START_TIME);
        assertThat(testTiming.getEndTime()).isEqualTo(UPDATED_END_TIME);
    }

    @Test
    @Transactional
    public void updateNonExistingTiming() throws Exception {
        int databaseSizeBeforeUpdate = timingRepository.findAll().size();

        // Create the Timing
        TimingDTO timingDTO = timingMapper.toDto(timing);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restTimingMockMvc.perform(put("/api/timings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(timingDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Timing in the database
        List<Timing> timingList = timingRepository.findAll();
        assertThat(timingList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteTiming() throws Exception {
        // Initialize the database
        timingRepository.saveAndFlush(timing);

        int databaseSizeBeforeDelete = timingRepository.findAll().size();

        // Get the timing
        restTimingMockMvc.perform(delete("/api/timings/{id}", timing.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Timing> timingList = timingRepository.findAll();
        assertThat(timingList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Timing.class);
        Timing timing1 = new Timing();
        timing1.setId(1L);
        Timing timing2 = new Timing();
        timing2.setId(timing1.getId());
        assertThat(timing1).isEqualTo(timing2);
        timing2.setId(2L);
        assertThat(timing1).isNotEqualTo(timing2);
        timing1.setId(null);
        assertThat(timing1).isNotEqualTo(timing2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(TimingDTO.class);
        TimingDTO timingDTO1 = new TimingDTO();
        timingDTO1.setId(1L);
        TimingDTO timingDTO2 = new TimingDTO();
        assertThat(timingDTO1).isNotEqualTo(timingDTO2);
        timingDTO2.setId(timingDTO1.getId());
        assertThat(timingDTO1).isEqualTo(timingDTO2);
        timingDTO2.setId(2L);
        assertThat(timingDTO1).isNotEqualTo(timingDTO2);
        timingDTO1.setId(null);
        assertThat(timingDTO1).isNotEqualTo(timingDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(timingMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(timingMapper.fromId(null)).isNull();
    }
}
