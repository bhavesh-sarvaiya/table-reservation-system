package com.trs.cucumber.stepdefs;

import com.trs.TableReservationApp;

import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.ResultActions;

import org.springframework.boot.test.context.SpringBootTest;

@WebAppConfiguration
@SpringBootTest
@ContextConfiguration(classes = TableReservationApp.class)
public abstract class StepDefs {

    protected ResultActions actions;

}
