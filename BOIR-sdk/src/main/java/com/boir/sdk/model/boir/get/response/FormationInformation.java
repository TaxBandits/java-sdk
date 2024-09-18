package com.boir.sdk.model.boir.get.response;

import com.fasterxml.jackson.annotation.JsonProperty;

public class FormationInformation {

    @JsonProperty("ForeignReportingCompany")
    private ForeignReportingCompany ForeignReportingCompany;

    @JsonProperty("IsCompanyFormedBefore2024")
    private Boolean IsCompanyFormedBefore2024;

    @JsonProperty("DomesticReportingCompany")
    private DomesticReportingCompany DomesticReportingCompany;

    @JsonProperty("CountryOfFormation")
    private String CountryOfFormation;

    public ForeignReportingCompany getForeignReportingCompany() {
        return ForeignReportingCompany;
    }

    public void setForeignReportingCompany(ForeignReportingCompany foreignReportingCompany) {
        ForeignReportingCompany = foreignReportingCompany;
    }

    public Boolean getCompanyFormedBefore2024() {
        return IsCompanyFormedBefore2024;
    }

    public void setCompanyFormedBefore2024(Boolean companyFormedBefore2024) {
        IsCompanyFormedBefore2024 = companyFormedBefore2024;
    }

    public DomesticReportingCompany getDomesticReportingCompany() {
        return DomesticReportingCompany;
    }

    public void setDomesticReportingCompany(DomesticReportingCompany domesticReportingCompany) {
        DomesticReportingCompany = domesticReportingCompany;
    }

    public String getCountryOfFormation() {
        return CountryOfFormation;
    }

    public void setCountryOfFormation(String countryOfFormation) {
        CountryOfFormation = countryOfFormation;
    }
}
