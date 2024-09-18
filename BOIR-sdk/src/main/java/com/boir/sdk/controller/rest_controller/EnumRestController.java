package com.boir.sdk.controller.rest_controller;

import com.boir.sdk.enums.*;
import com.boir.sdk.enums.model.EnumModel;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;

@RestController
public class EnumRestController {

    /**
     * Get Suffixes from static list
     * Endpoint: /suffixes
     * Method: GET
     **/
    @GetMapping("/suffixes")
    public ArrayList<EnumModel> suffixes() {
        return SuffixEnum.getSuffixes();
    }

    /**
     * Get States from static list
     * Endpoint: /states
     * Method: GET
     **/
    @GetMapping("/states")
    public ArrayList<EnumModel> getStates() {
        return StateEnum.getStates();
    }

    /**
     * Get mexico states from static list
     * Endpoint: /mexicoStates
     * Method: GET
     **/
    @GetMapping("/mexicoStates")
    public ArrayList<EnumModel> getMexicoStates() {
        return StateEnum.getMexicoStates();
    }

    /**
     * Get canada states from static list
     * Endpoint: /canadaStates
     * Method: GET
     **/
    @GetMapping("/canadaStates")
    public ArrayList<EnumModel> getCanadaStates() {
        return StateEnum.getCanadaStates();
    }

    /**
     * Get Countries from static list
     * Endpoint: /countries
     * Method: GET
     **/
    @GetMapping("/countries")
    public ArrayList<EnumModel> getCountry() {
        return CountryEnum.getCountry();
    }

    /**
     * Get US Territories from static list
     * Endpoint: /getUSTerritories
     * Method: GET
     **/
    @GetMapping("/usTerritories")
    public ArrayList<EnumModel> getUSTerritories() {
        return USTerritoryEnum.getUSTerritories();
    }

    /**
     * Get US Tribal Jurisdiction from static list
     * Endpoint: /getUSTribalJurisdiction
     * Method: GET
     **/
    @GetMapping("/usTribalJurisdiction")
    public ArrayList<EnumModel> getUSTribalJurisdiction() {
        return USTribalJurisdictionEnum.getUSTribalJurisdiction();
    }

    /**
     * Get Foreign Countries from static list
     * Endpoint: /getForeignCountries
     * Method: GET
     **/
    @GetMapping("/foreignCountries")
    public ArrayList<EnumModel> getForeignCountries() {
        return ForeignCountriesEnum.getForeignCountries();
    }

    /**
     * Get Document Types from static list
     * Endpoint: /getDocumentTypes
     * Method: GET
     **/
    @GetMapping("/documentTypes")
    public ArrayList<EnumModel> getDocumentTypes() {
        return DocumentTypeEnum.getDocumentTypes();
    }

}
