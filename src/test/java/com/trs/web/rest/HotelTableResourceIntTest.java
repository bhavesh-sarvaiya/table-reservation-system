package com.trs.web.rest;

import com.trs.TableReservationApp;

import com.trs.domain.HotelTable;
import com.trs.domain.Hotel;
import com.trs.repository.HotelTableRepository;
import com.trs.service.HotelTableService;
import com.trs.service.dto.HotelTableDTO;
import com.trs.service.mapper.HotelTableMapper;
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
 * Test class for the HotelTableResource REST controller.
 *
 * @see HotelTableResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TableReservationApp.class)
public class HotelTableResourceIntTest {

    private static final String DEFAULT_TABLE_NUMBER = "AAAAAAAAAA";
    private static final String UPDATED_TABLE_NUMBER = "BBBBBBBBBB";

    private static final Integer DEFAULT_NO_OF_CUSTOMER = 1;
    private static final Integer UPDATED_NO_OF_CUSTOMER = 2;

    @Autowired
    private HotelTableRepository hotelTableRepository;


    @Autowired
    private HotelTableMapper hotelTableMapper;
    

    @Autowired
    private HotelTableService hotelTableService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restHotelTableMockMvc;

    private HotelTable hotelTable;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final HotelTableResource hotelTableResource = new HotelTableResource(hotelTableService);
        this.restHotelTableMockMvc = MockMvcBuilders.standaloneSetup(hotelTableResource)
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
    public static HotelTable createEntity(EntityManager em) {
        HotelTable hotelTable = new HotelTable()
            .tableNumber(DEFAULT_TABLE_NUMBER)
            .noOfCustomer(DEFAULT_NO_OF_CUSTOMER);
        // Add required entity
        Hotel hotel = HotelResourceIntTest.createEntity(em);
        em.persist(hotel);
        em.flush();
        hotelTable.setHotel(hotel);
        return hotelTable;
    }

    @Before
    public void initTest() {
        hotelTable = createEntity(em);
    }

    @Test
    @Transactional
    public void createHotelTable() throws Exception {
        int databaseSizeBeforeCreate = hotelTableRepository.findAll().size();

        // Create the HotelTable
        HotelTableDTO hotelTableDTO = hotelTableMapper.toDto(hotelTable);
        restHotelTableMockMvc.perform(post("/api/hotel-tables")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(hotelTableDTO)))
            .andExpect(status().isCreated());

        // Validate the HotelTable in the database
        List<HotelTable> hotelTableList = hotelTableRepository.findAll();
        assertThat(hotelTableList).hasSize(databaseSizeBeforeCreate + 1);
        HotelTable testHotelTable = hotelTableList.get(hotelTableList.size() - 1);
        assertThat(testHotelTable.getTableNumber()).isEqualTo(DEFAULT_TABLE_NUMBER);
        assertThat(testHotelTable.getNoOfCustomer()).isEqualTo(DEFAULT_NO_OF_CUSTOMER);
    }

    @Test
    @Transactional
    public void createHotelTableWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = hotelTableRepository.findAll().size();

        // Create the HotelTable with an existing ID
        hotelTable.setId(1L);
        HotelTableDTO hotelTableDTO = hotelTableMapper.toDto(hotelTable);

        // An entity with an existing ID cannot be created, so this API call must fail
        restHotelTableMockMvc.perform(post("/api/hotel-tables")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(hotelTableDTO)))
            .andExpect(status().isBadRequest());

        // Validate the HotelTable in the database
        List<HotelTable> hotelTableList = hotelTableRepository.findAll();
        assertThat(hotelTableList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkTableNumberIsRequired() throws Exception {
        int databaseSizeBeforeTest = hotelTableRepository.findAll().size();
        // set the field null
        hotelTable.setTableNumber(null);

        // Create the HotelTable, which fails.
        HotelTableDTO hotelTableDTO = hotelTableMapper.toDto(hotelTable);

        restHotelTableMockMvc.perform(post("/api/hotel-tables")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(hotelTableDTO)))
            .andExpect(status().isBadRequest());

        List<HotelTable> hotelTableList = hotelTableRepository.findAll();
        assertThat(hotelTableList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkNoOfCustomerIsRequired() throws Exception {
        int databaseSizeBeforeTest = hotelTableRepository.findAll().size();
        // set the field null
        hotelTable.setNoOfCustomer(null);

        // Create the HotelTable, which fails.
        HotelTableDTO hotelTableDTO = hotelTableMapper.toDto(hotelTable);

        restHotelTableMockMvc.perform(post("/api/hotel-tables")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(hotelTableDTO)))
            .andExpect(status().isBadRequest());

        List<HotelTable> hotelTableList = hotelTableRepository.findAll();
        assertThat(hotelTableList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllHotelTables() throws Exception {
        // Initialize the database
        hotelTableRepository.saveAndFlush(hotelTable);

        // Get all the hotelTableList
        restHotelTableMockMvc.perform(get("/api/hotel-tables?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(hotelTable.getId().intValue())))
            .andExpect(jsonPath("$.[*].tableNumber").value(hasItem(DEFAULT_TABLE_NUMBER.toString())))
            .andExpect(jsonPath("$.[*].noOfCustomer").value(hasItem(DEFAULT_NO_OF_CUSTOMER)));
    }
    

    @Test
    @Transactional
    public void getHotelTable() throws Exception {
        // Initialize the database
        hotelTableRepository.saveAndFlush(hotelTable);

        // Get the hotelTable
        restHotelTableMockMvc.perform(get("/api/hotel-tables/{id}", hotelTable.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(hotelTable.getId().intValue()))
            .andExpect(jsonPath("$.tableNumber").value(DEFAULT_TABLE_NUMBER.toString()))
            .andExpect(jsonPath("$.noOfCustomer").value(DEFAULT_NO_OF_CUSTOMER));
    }
    @Test
    @Transactional
    public void getNonExistingHotelTable() throws Exception {
        // Get the hotelTable
        restHotelTableMockMvc.perform(get("/api/hotel-tables/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateHotelTable() throws Exception {
        // Initialize the database
        hotelTableRepository.saveAndFlush(hotelTable);

        int databaseSizeBeforeUpdate = hotelTableRepository.findAll().size();

        // Update the hotelTable
        HotelTable updatedHotelTable = hotelTableRepository.findById(hotelTable.getId()).get();
        // Disconnect from session so that the updates on updatedHotelTable are not directly saved in db
        em.detach(updatedHotelTable);
        updatedHotelTable
            .tableNumber(UPDATED_TABLE_NUMBER)
            .noOfCustomer(UPDATED_NO_OF_CUSTOMER);
        HotelTableDTO hotelTableDTO = hotelTableMapper.toDto(updatedHotelTable);

        restHotelTableMockMvc.perform(put("/api/hotel-tables")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(hotelTableDTO)))
            .andExpect(status().isOk());

        // Validate the HotelTable in the database
        List<HotelTable> hotelTableList = hotelTableRepository.findAll();
        assertThat(hotelTableList).hasSize(databaseSizeBeforeUpdate);
        HotelTable testHotelTable = hotelTableList.get(hotelTableList.size() - 1);
        assertThat(testHotelTable.getTableNumber()).isEqualTo(UPDATED_TABLE_NUMBER);
        assertThat(testHotelTable.getNoOfCustomer()).isEqualTo(UPDATED_NO_OF_CUSTOMER);
    }

    @Test
    @Transactional
    public void updateNonExistingHotelTable() throws Exception {
        int databaseSizeBeforeUpdate = hotelTableRepository.findAll().size();

        // Create the HotelTable
        HotelTableDTO hotelTableDTO = hotelTableMapper.toDto(hotelTable);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restHotelTableMockMvc.perform(put("/api/hotel-tables")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(hotelTableDTO)))
            .andExpect(status().isBadRequest());

        // Validate the HotelTable in the database
        List<HotelTable> hotelTableList = hotelTableRepository.findAll();
        assertThat(hotelTableList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteHotelTable() throws Exception {
        // Initialize the database
        hotelTableRepository.saveAndFlush(hotelTable);

        int databaseSizeBeforeDelete = hotelTableRepository.findAll().size();

        // Get the hotelTable
        restHotelTableMockMvc.perform(delete("/api/hotel-tables/{id}", hotelTable.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<HotelTable> hotelTableList = hotelTableRepository.findAll();
        assertThat(hotelTableList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(HotelTable.class);
        HotelTable hotelTable1 = new HotelTable();
        hotelTable1.setId(1L);
        HotelTable hotelTable2 = new HotelTable();
        hotelTable2.setId(hotelTable1.getId());
        assertThat(hotelTable1).isEqualTo(hotelTable2);
        hotelTable2.setId(2L);
        assertThat(hotelTable1).isNotEqualTo(hotelTable2);
        hotelTable1.setId(null);
        assertThat(hotelTable1).isNotEqualTo(hotelTable2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(HotelTableDTO.class);
        HotelTableDTO hotelTableDTO1 = new HotelTableDTO();
        hotelTableDTO1.setId(1L);
        HotelTableDTO hotelTableDTO2 = new HotelTableDTO();
        assertThat(hotelTableDTO1).isNotEqualTo(hotelTableDTO2);
        hotelTableDTO2.setId(hotelTableDTO1.getId());
        assertThat(hotelTableDTO1).isEqualTo(hotelTableDTO2);
        hotelTableDTO2.setId(2L);
        assertThat(hotelTableDTO1).isNotEqualTo(hotelTableDTO2);
        hotelTableDTO1.setId(null);
        assertThat(hotelTableDTO1).isNotEqualTo(hotelTableDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(hotelTableMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(hotelTableMapper.fromId(null)).isNull();
    }
}
