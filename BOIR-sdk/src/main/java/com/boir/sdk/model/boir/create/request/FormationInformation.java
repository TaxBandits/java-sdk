package com.boir.sdk.model.boir.create.request;

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

    public void setForeignReportingCompany(ForeignReportingCompany foreignReportingCompany) {
        this.ForeignReportingCompany = foreignReportingCompany;
    }

    public ForeignReportingCompany getForeignReportingCompany() {
        return ForeignReportingCompany;
    }

    public void setIsCompanyFormedBefore2024(boolean isCompanyFormedBefore2024) {
        this.IsCompanyFormedBefore2024 = isCompanyFormedBefore2024;
    }

    public boolean isIsCompanyFormedBefore2024() {
        return IsCompanyFormedBefore2024;
    }

    public void setDomesticReportingCompany(DomesticReportingCompany domesticReportingCompany) {
        this.DomesticReportingCompany = domesticReportingCompany;
    }

    public DomesticReportingCompany getDomesticReportingCompany() {
        return DomesticReportingCompany;
    }

    public void setCountryOfFormation(String countryOfFormation) {
        this.CountryOfFormation = countryOfFormation;
    }

    public String getCountryOfFormation() {
        return CountryOfFormation;
    }
}
