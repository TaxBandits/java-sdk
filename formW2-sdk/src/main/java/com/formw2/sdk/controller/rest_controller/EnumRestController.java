package com.formw2.sdk.controller.rest_controller;

import com.formw2.sdk.controller.model.BusinessTypeRequest;
import com.formw2.sdk.enums.*;
import com.formw2.sdk.enums.model.BusinessMembersType;
import com.formw2.sdk.enums.model.EnumModel;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;

@RestController
public class EnumRestController {

    /**
     * Get Business Types from static list
     * Endpoint: /businessTypes
     * Method: GET
     **/
    @GetMapping("/businessTypes")
    public ArrayList<EnumModel> businessTypes() {
        return BusinessTypeEnum.getBusinessTypes();
    }

    /**
     * Get Business Member Types from static list
     * Endpoint: /businessMemberTypes
     * Method: POST
     * Parameters: BusinessTypeRequest() // Model should be NotNull
     **/
    @PostMapping("/businessMemberTypes")
    public ArrayList<BusinessMembersType> getBusinessMemberTypesByBusinessMemberId(@RequestBody BusinessTypeRequest businessTypeRequest) {
        return BusinessMembersTypeEnum.getBusinessMemberTypesByBusinessMemberId(businessTypeRequest.getBusinessTypeEnumValue());
    }

    /**
     * Get Kind Of Employers from static list
     * Endpoint: /kindOfEmployers
     * Method: GET
     **/
    @GetMapping("/kindOfEmployers")
    public ArrayList<EnumModel> getKindOfEmployers() {
        return KindOfEmployerEnum.getKindOfEmployers();
    }

    /**
     * Get Kind Of Payers from static list
     * Endpoint: /kindOfPayers
     * Method: GET
     **/
    @GetMapping("/kindOfPayers")
    public ArrayList<EnumModel> getKindOfKindOfPayers() {
        return KindOfPayerEnum.getKindOfKindOfPayers();
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
     * Get Countries from static list
     * Endpoint: /countries
     * Method: GET
     **/
    @GetMapping("/countries")
    public ArrayList<EnumModel> getCountry() {
        return CountryEnum.getCountry();
    }

    /**
     * Get Account Types from static list
     * Endpoint: /accountTypes
     * Method: GET
     **/
    @GetMapping("/accountTypes")
    public ArrayList<EnumModel> getAccountTypes() {
        return AccountTypesEnum.getAccountTypes();
    }

    /**
     * Get Over Payment Types from static list
     * Endpoint: /overPaymentTypes
     * Method: GET
     **/
    @GetMapping("/overPaymentTypes")
    public ArrayList<EnumModel> getOverPaymentTypes() {
        return OverPaymentTypeEnum.getOverPaymentTypes();
    }

    /**
     * Get Payment Methods from static list
     * Endpoint: /paymentMethods
     * Method: GET
     **/
    @GetMapping("/paymentMethods")
    public ArrayList<EnumModel> getPaymentMethods() {
        return PaymentMethodEnum.getPaymentMethods();
    }

    /**
     * Get Months from static list
     * Endpoint: /months
     * Method: GET
     **/
    @GetMapping("/months")
    public ArrayList<EnumModel> getMonths() {
        return MonthsEnum.getMonths();
    }

    /**
     * Get Codes from static list
     * Endpoint: /codes
     * Method: GET
     **/
    @GetMapping("/codes")
    public ArrayList<EnumModel> getCodes() {
        return Box12CodesEnum.getCodes();
    }

    /**
     * Get FilingCycle from static list
     * Endpoint: /filingCycle
     * Method: GET
     **/
    @GetMapping("/filingCycle")
    public ArrayList<EnumModel> getFilingCycle() {
        return FilingCycleEnum.getFilingCycle();
    }

    /**
     * Get filingSchTypes from static list
     * Endpoint: /filingSchTypes
     * Method: GET
     **/
    @GetMapping("/filingSchTypes")
    public ArrayList<EnumModel> getFilingSchTypes() {
        return FilingSchTypeEnum.getFilingSchTypes();
    }

    /**
     * Get County Names from static list
     * Endpoint: /countyNames
     * Method: GET
     **/
    @GetMapping("/countyNames")
    public ArrayList<EnumModel> getCountyNames() {
        return CountyNameEnum.getCountyNames();
    }

    /**
     * Get PayFreq from static list
     * Endpoint: /payFreq
     * Method: GET
     **/
    @GetMapping("/payFreq")
    public ArrayList<EnumModel> getPayFreq() {
        return PayFreqEnum.getPayFreq();
    }

}
