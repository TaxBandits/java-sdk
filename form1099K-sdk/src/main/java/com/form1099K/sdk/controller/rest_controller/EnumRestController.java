package com.form1099K.sdk.controller.rest_controller;

import com.form1099K.sdk.controller.model.BusinessTypeRequest;
import com.form1099K.sdk.enums.*;
import com.form1099K.sdk.enums.model.BusinessMembersType;
import com.form1099K.sdk.enums.model.EnumModel;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
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

}
