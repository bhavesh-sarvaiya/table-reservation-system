package com.trs.web.rest;

import com.trs.TableReservationApp;

import com.trs.domain.Cuisine;
import com.trs.domain.Hotel;
import com.trs.repository.CuisineRepository;
import com.trs.service.CuisineService;
import com.trs.service.dto.CuisineDTO;
import com.trs.service.mapper.CuisineMapper;
import com.trs.web.rest.errors.ExceptionTranslator;
import com.trs.service.dto.CuisineCriteria;
import com.trs.service.CuisineQueryService;

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
import org.springframework.util.Base64Utils;

import javax.persistence.EntityManager;
import java.util.List;


import static com.trs.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.trs.domain.enumeration.FoodType;
/**
 * Test class for the CuisineResource REST controller.
 *
 * @see CuisineResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TableReservationApp.class)
public class CuisineResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final Double DEFAULT_PRICE = 1D;
    private static final Double UPDATED_PRICE = 2D;

    private static final FoodType DEFAULT_TYPE = FoodType.GUJARATI;
    private static final FoodType UPDATED_TYPE = FoodType.PUNJABI;

    private static final byte[] DEFAULT_FOOD_IMAGE = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_FOOD_IMAGE = TestUtil.createByteArray(2, "1");
    private static final String DEFAULT_FOOD_IMAGE_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_FOOD_IMAGE_CONTENT_TYPE = "image/png";

    @Autowired
    private CuisineRepository cuisineRepository;


    @Autowired
    private CuisineMapper cuisineMapper;
    

    @Autowired
    private CuisineService cuisineService;

    @Autowired
    private CuisineQueryService cuisineQueryService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restCuisineMockMvc;

    private Cuisine cuisine;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CuisineResource cuisineResource = new CuisineResource(cuisineService, cuisineQueryService);
        this.restCuisineMockMvc = MockMvcBuilders.standaloneSetup(cuisineResource)
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
    public static Cuisine createEntity(EntityManager em) {
        Cuisine cuisine = new Cuisine()
            .name(DEFAULT_NAME)
            .price(DEFAULT_PRICE)
            .type(DEFAULT_TYPE)
            .foodImage(DEFAULT_FOOD_IMAGE)
            .foodImageContentType(DEFAULT_FOOD_IMAGE_CONTENT_TYPE);
        // Add required entity
        Hotel hotel = HotelResourceIntTest.createEntity(em);
        em.persist(hotel);
        em.flush();
        cuisine.setHotel(hotel);
        return cuisine;
    }

    @Before
    public void initTest() {
        cuisine = createEntity(em);
    }

    @Test
    @Transactional
    public void createCuisine() throws Exception {
        int databaseSizeBeforeCreate = cuisineRepository.findAll().size();

        // Create the Cuisine
        CuisineDTO cuisineDTO = cuisineMapper.toDto(cuisine);
        restCuisineMockMvc.perform(post("/api/cuisines")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cuisineDTO)))
            .andExpect(status().isCreated());

        // Validate the Cuisine in the database
        List<Cuisine> cuisineList = cuisineRepository.findAll();
        assertThat(cuisineList).hasSize(databaseSizeBeforeCreate + 1);
        Cuisine testCuisine = cuisineList.get(cuisineList.size() - 1);
        assertThat(testCuisine.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testCuisine.getPrice()).isEqualTo(DEFAULT_PRICE);
        assertThat(testCuisine.getType()).isEqualTo(DEFAULT_TYPE);
        assertThat(testCuisine.getFoodImage()).isEqualTo(DEFAULT_FOOD_IMAGE);
        assertThat(testCuisine.getFoodImageContentType()).isEqualTo(DEFAULT_FOOD_IMAGE_CONTENT_TYPE);
    }

    @Test
    @Transactional
    public void createCuisineWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = cuisineRepository.findAll().size();

        // Create the Cuisine with an existing ID
        cuisine.setId(1L);
        CuisineDTO cuisineDTO = cuisineMapper.toDto(cuisine);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCuisineMockMvc.perform(post("/api/cuisines")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cuisineDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Cuisine in the database
        List<Cuisine> cuisineList = cuisineRepository.findAll();
        assertThat(cuisineList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = cuisineRepository.findAll().size();
        // set the field null
        cuisine.setName(null);

        // Create the Cuisine, which fails.
        CuisineDTO cuisineDTO = cuisineMapper.toDto(cuisine);

        restCuisineMockMvc.perform(post("/api/cuisines")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cuisineDTO)))
            .andExpect(status().isBadRequest());

        List<Cuisine> cuisineList = cuisineRepository.findAll();
        assertThat(cuisineList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkPriceIsRequired() throws Exception {
        int databaseSizeBeforeTest = cuisineRepository.findAll().size();
        // set the field null
        cuisine.setPrice(null);

        // Create the Cuisine, which fails.
        CuisineDTO cuisineDTO = cuisineMapper.toDto(cuisine);

        restCuisineMockMvc.perform(post("/api/cuisines")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cuisineDTO)))
            .andExpect(status().isBadRequest());

        List<Cuisine> cuisineList = cuisineRepository.findAll();
        assertThat(cuisineList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkTypeIsRequired() throws Exception {
        int databaseSizeBeforeTest = cuisineRepository.findAll().size();
        // set the field null
        cuisine.setType(null);

        // Create the Cuisine, which fails.
        CuisineDTO cuisineDTO = cuisineMapper.toDto(cuisine);

        restCuisineMockMvc.perform(post("/api/cuisines")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cuisineDTO)))
            .andExpect(status().isBadRequest());

        List<Cuisine> cuisineList = cuisineRepository.findAll();
        assertThat(cuisineList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllCuisines() throws Exception {
        // Initialize the database
        cuisineRepository.saveAndFlush(cuisine);

        // Get all the cuisineList
        restCuisineMockMvc.perform(get("/api/cuisines?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(cuisine.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].price").value(hasItem(DEFAULT_PRICE.doubleValue())))
            .andExpect(jsonPath("$.[*].type").value(hasItem(DEFAULT_TYPE.toString())))
            .andExpect(jsonPath("$.[*].foodImageContentType").value(hasItem(DEFAULT_FOOD_IMAGE_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].foodImage").value(hasItem(Base64Utils.encodeToString(DEFAULT_FOOD_IMAGE))));
    }
    

    @Test
    @Transactional
    public void getCuisine() throws Exception {
        // Initialize the database
        cuisineRepository.saveAndFlush(cuisine);

        // Get the cuisine
        restCuisineMockMvc.perform(get("/api/cuisines/{id}", cuisine.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(cuisine.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.price").value(DEFAULT_PRICE.doubleValue()))
            .andExpect(jsonPath("$.type").value(DEFAULT_TYPE.toString()))
            .andExpect(jsonPath("$.foodImageContentType").value(DEFAULT_FOOD_IMAGE_CONTENT_TYPE))
            .andExpect(jsonPath("$.foodImage").value(Base64Utils.encodeToString(DEFAULT_FOOD_IMAGE)));
    }

    @Test
    @Transactional
    public void getAllCuisinesByNameIsEqualToSomething() throws Exception {
        // Initialize the database
        cuisineRepository.saveAndFlush(cuisine);

        // Get all the cuisineList where name equals to DEFAULT_NAME
        defaultCuisineShouldBeFound("name.equals=" + DEFAULT_NAME);

        // Get all the cuisineList where name equals to UPDATED_NAME
        defaultCuisineShouldNotBeFound("name.equals=" + UPDATED_NAME);
    }

    @Test
    @Transactional
    public void getAllCuisinesByNameIsInShouldWork() throws Exception {
        // Initialize the database
        cuisineRepository.saveAndFlush(cuisine);

        // Get all the cuisineList where name in DEFAULT_NAME or UPDATED_NAME
        defaultCuisineShouldBeFound("name.in=" + DEFAULT_NAME + "," + UPDATED_NAME);

        // Get all the cuisineList where name equals to UPDATED_NAME
        defaultCuisineShouldNotBeFound("name.in=" + UPDATED_NAME);
    }

    @Test
    @Transactional
    public void getAllCuisinesByNameIsNullOrNotNull() throws Exception {
        // Initialize the database
        cuisineRepository.saveAndFlush(cuisine);

        // Get all the cuisineList where name is not null
        defaultCuisineShouldBeFound("name.specified=true");

        // Get all the cuisineList where name is null
        defaultCuisineShouldNotBeFound("name.specified=false");
    }

    @Test
    @Transactional
    public void getAllCuisinesByPriceIsEqualToSomething() throws Exception {
        // Initialize the database
        cuisineRepository.saveAndFlush(cuisine);

        // Get all the cuisineList where price equals to DEFAULT_PRICE
        defaultCuisineShouldBeFound("price.equals=" + DEFAULT_PRICE);

        // Get all the cuisineList where price equals to UPDATED_PRICE
        defaultCuisineShouldNotBeFound("price.equals=" + UPDATED_PRICE);
    }

    @Test
    @Transactional
    public void getAllCuisinesByPriceIsInShouldWork() throws Exception {
        // Initialize the database
        cuisineRepository.saveAndFlush(cuisine);

        // Get all the cuisineList where price in DEFAULT_PRICE or UPDATED_PRICE
        defaultCuisineShouldBeFound("price.in=" + DEFAULT_PRICE + "," + UPDATED_PRICE);

        // Get all the cuisineList where price equals to UPDATED_PRICE
        defaultCuisineShouldNotBeFound("price.in=" + UPDATED_PRICE);
    }

    @Test
    @Transactional
    public void getAllCuisinesByPriceIsNullOrNotNull() throws Exception {
        // Initialize the database
        cuisineRepository.saveAndFlush(cuisine);

        // Get all the cuisineList where price is not null
        defaultCuisineShouldBeFound("price.specified=true");

        // Get all the cuisineList where price is null
        defaultCuisineShouldNotBeFound("price.specified=false");
    }

    @Test
    @Transactional
    public void getAllCuisinesByTypeIsEqualToSomething() throws Exception {
        // Initialize the database
        cuisineRepository.saveAndFlush(cuisine);

        // Get all the cuisineList where type equals to DEFAULT_TYPE
        defaultCuisineShouldBeFound("type.equals=" + DEFAULT_TYPE);

        // Get all the cuisineList where type equals to UPDATED_TYPE
        defaultCuisineShouldNotBeFound("type.equals=" + UPDATED_TYPE);
    }

    @Test
    @Transactional
    public void getAllCuisinesByTypeIsInShouldWork() throws Exception {
        // Initialize the database
        cuisineRepository.saveAndFlush(cuisine);

        // Get all the cuisineList where type in DEFAULT_TYPE or UPDATED_TYPE
        defaultCuisineShouldBeFound("type.in=" + DEFAULT_TYPE + "," + UPDATED_TYPE);

        // Get all the cuisineList where type equals to UPDATED_TYPE
        defaultCuisineShouldNotBeFound("type.in=" + UPDATED_TYPE);
    }

    @Test
    @Transactional
    public void getAllCuisinesByTypeIsNullOrNotNull() throws Exception {
        // Initialize the database
        cuisineRepository.saveAndFlush(cuisine);

        // Get all the cuisineList where type is not null
        defaultCuisineShouldBeFound("type.specified=true");

        // Get all the cuisineList where type is null
        defaultCuisineShouldNotBeFound("type.specified=false");
    }

    @Test
    @Transactional
    public void getAllCuisinesByHotelIsEqualToSomething() throws Exception {
        // Initialize the database
        Hotel hotel = HotelResourceIntTest.createEntity(em);
        em.persist(hotel);
        em.flush();
        cuisine.setHotel(hotel);
        cuisineRepository.saveAndFlush(cuisine);
        Long hotelId = hotel.getId();

        // Get all the cuisineList where hotel equals to hotelId
        defaultCuisineShouldBeFound("hotelId.equals=" + hotelId);

        // Get all the cuisineList where hotel equals to hotelId + 1
        defaultCuisineShouldNotBeFound("hotelId.equals=" + (hotelId + 1));
    }

    /**
     * Executes the search, and checks that the default entity is returned
     */
    private void defaultCuisineShouldBeFound(String filter) throws Exception {
        restCuisineMockMvc.perform(get("/api/cuisines?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(cuisine.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].price").value(hasItem(DEFAULT_PRICE.doubleValue())))
            .andExpect(jsonPath("$.[*].type").value(hasItem(DEFAULT_TYPE.toString())))
            .andExpect(jsonPath("$.[*].foodImageContentType").value(hasItem(DEFAULT_FOOD_IMAGE_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].foodImage").value(hasItem(Base64Utils.encodeToString(DEFAULT_FOOD_IMAGE))));
    }

    /**
     * Executes the search, and checks that the default entity is not returned
     */
    private void defaultCuisineShouldNotBeFound(String filter) throws Exception {
        restCuisineMockMvc.perform(get("/api/cuisines?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$").isArray())
            .andExpect(jsonPath("$").isEmpty());
    }

    @Test
    @Transactional
    public void getNonExistingCuisine() throws Exception {
        // Get the cuisine
        restCuisineMockMvc.perform(get("/api/cuisines/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCuisine() throws Exception {
        // Initialize the database
        cuisineRepository.saveAndFlush(cuisine);

        int databaseSizeBeforeUpdate = cuisineRepository.findAll().size();

        // Update the cuisine
        Cuisine updatedCuisine = cuisineRepository.findById(cuisine.getId()).get();
        // Disconnect from session so that the updates on updatedCuisine are not directly saved in db
        em.detach(updatedCuisine);
        updatedCuisine
            .name(UPDATED_NAME)
            .price(UPDATED_PRICE)
            .type(UPDATED_TYPE)
            .foodImage(UPDATED_FOOD_IMAGE)
            .foodImageContentType(UPDATED_FOOD_IMAGE_CONTENT_TYPE);
        CuisineDTO cuisineDTO = cuisineMapper.toDto(updatedCuisine);

        restCuisineMockMvc.perform(put("/api/cuisines")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cuisineDTO)))
            .andExpect(status().isOk());

        // Validate the Cuisine in the database
        List<Cuisine> cuisineList = cuisineRepository.findAll();
        assertThat(cuisineList).hasSize(databaseSizeBeforeUpdate);
        Cuisine testCuisine = cuisineList.get(cuisineList.size() - 1);
        assertThat(testCuisine.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testCuisine.getPrice()).isEqualTo(UPDATED_PRICE);
        assertThat(testCuisine.getType()).isEqualTo(UPDATED_TYPE);
        assertThat(testCuisine.getFoodImage()).isEqualTo(UPDATED_FOOD_IMAGE);
        assertThat(testCuisine.getFoodImageContentType()).isEqualTo(UPDATED_FOOD_IMAGE_CONTENT_TYPE);
    }

    @Test
    @Transactional
    public void updateNonExistingCuisine() throws Exception {
        int databaseSizeBeforeUpdate = cuisineRepository.findAll().size();

        // Create the Cuisine
        CuisineDTO cuisineDTO = cuisineMapper.toDto(cuisine);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restCuisineMockMvc.perform(put("/api/cuisines")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cuisineDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Cuisine in the database
        List<Cuisine> cuisineList = cuisineRepository.findAll();
        assertThat(cuisineList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteCuisine() throws Exception {
        // Initialize the database
        cuisineRepository.saveAndFlush(cuisine);

        int databaseSizeBeforeDelete = cuisineRepository.findAll().size();

        // Get the cuisine
        restCuisineMockMvc.perform(delete("/api/cuisines/{id}", cuisine.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Cuisine> cuisineList = cuisineRepository.findAll();
        assertThat(cuisineList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Cuisine.class);
        Cuisine cuisine1 = new Cuisine();
        cuisine1.setId(1L);
        Cuisine cuisine2 = new Cuisine();
        cuisine2.setId(cuisine1.getId());
        assertThat(cuisine1).isEqualTo(cuisine2);
        cuisine2.setId(2L);
        assertThat(cuisine1).isNotEqualTo(cuisine2);
        cuisine1.setId(null);
        assertThat(cuisine1).isNotEqualTo(cuisine2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(CuisineDTO.class);
        CuisineDTO cuisineDTO1 = new CuisineDTO();
        cuisineDTO1.setId(1L);
        CuisineDTO cuisineDTO2 = new CuisineDTO();
        assertThat(cuisineDTO1).isNotEqualTo(cuisineDTO2);
        cuisineDTO2.setId(cuisineDTO1.getId());
        assertThat(cuisineDTO1).isEqualTo(cuisineDTO2);
        cuisineDTO2.setId(2L);
        assertThat(cuisineDTO1).isNotEqualTo(cuisineDTO2);
        cuisineDTO1.setId(null);
        assertThat(cuisineDTO1).isNotEqualTo(cuisineDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(cuisineMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(cuisineMapper.fromId(null)).isNull();
    }
}
