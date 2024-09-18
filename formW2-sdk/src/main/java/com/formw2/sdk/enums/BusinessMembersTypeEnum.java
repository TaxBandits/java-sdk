package com.formw2.sdk.enums;

import com.formw2.sdk.enums.model.BusinessMembersType;

import java.util.ArrayList;

public class BusinessMembersTypeEnum {

    // Estate Business Members
    private static final String estateEnumValue = BusinessTypeEnum.ESTATE.getEnumValue();
    public static final BusinessMembersType ESTATE_ADMINISTRATOR = new BusinessMembersType(estateEnumValue, "ADMINISTRATOR", "Administrator");
    public static final BusinessMembersType EXECUTOR = new BusinessMembersType(estateEnumValue, "EXECUTOR", "Executor");
    public static final BusinessMembersType ESTATE_TRUSTEE = new BusinessMembersType(estateEnumValue, "TRUSTEE", "Trustee");
    public static final BusinessMembersType FIDUCIARY = new BusinessMembersType(estateEnumValue, "FIDUCIARY", "Fiduciary");

    // Partnership Business Members
    private static final String partnershipEnumValue = BusinessTypeEnum.PARTNERSHIP.getEnumValue();
    public static final BusinessMembersType PARTNER = new BusinessMembersType(partnershipEnumValue, "PARTNER", "Partner");
    public static final BusinessMembersType GENERAL_PARTNER = new BusinessMembersType(partnershipEnumValue, "GENERALPARTNER", "General Partner");
    public static final BusinessMembersType LIMITED_PARTNER = new BusinessMembersType(partnershipEnumValue, "LIMITEDPARTNER", "Limited Partner");
    public static final BusinessMembersType LLC_MEMBER = new BusinessMembersType(partnershipEnumValue, "LLCMEMBER", "LLC Member");
    public static final BusinessMembersType MANAGER = new BusinessMembersType(partnershipEnumValue, "MANAGINGMEMBER", "Manager");
    public static final BusinessMembersType PARTNERSHIP_MEMBER = new BusinessMembersType(partnershipEnumValue, "MEMBER", "Member");
    public static final BusinessMembersType MANAGING_MEMBER = new BusinessMembersType(partnershipEnumValue, "MANAGER", "Managing Member");
    public static final BusinessMembersType PARTNERSHIP_PRESIDENT = new BusinessMembersType(partnershipEnumValue, "PRESIDENT", "President");
    public static final BusinessMembersType PARTNERSHIP_OWNER = new BusinessMembersType(partnershipEnumValue, "OWNER", "Owner");
    public static final BusinessMembersType TAX_MATTER_PARTNER = new BusinessMembersType(partnershipEnumValue, "TAXMATTERPARTNER", "Tax Matter Partner");

    // Corporation Business Members
    private static final String corporationEnumValue = BusinessTypeEnum.CORPORATION.getEnumValue();
    public static final BusinessMembersType CORPORATION_PRESIDENT = new BusinessMembersType(corporationEnumValue, "PRESIDENT", "President");
    public static final BusinessMembersType CORPORATION_VICE_PRESIDENT = new BusinessMembersType(corporationEnumValue, "VICEPRESIDENT", "Vice President");
    public static final BusinessMembersType CORPORATION_TREASURER = new BusinessMembersType(corporationEnumValue, "TREASURER", "Treasurer");
    public static final BusinessMembersType CORPORATION_ASSISTANT_TREASURER = new BusinessMembersType(corporationEnumValue, "ASSISTANTTREASURER", "Assistant Treasurer");
    public static final BusinessMembersType CORPORATION_CHIEF_ACCOUNTING_OFFICER = new BusinessMembersType(corporationEnumValue, "CHIEFACCOUNTINGOFFICER", "Chief Accounting Officer");
    public static final BusinessMembersType CORPORATION_TAX_OFFICER = new BusinessMembersType(corporationEnumValue, "TAXOFFICER", "Tax Officer");
    public static final BusinessMembersType CORPORATION_CHIEF_OPERATING_OFFICER = new BusinessMembersType(corporationEnumValue, "CHIEFOPERATINGOFFICER", "Chief Operating Officer");
    public static final BusinessMembersType CORPORATE_SECRETARY = new BusinessMembersType(corporationEnumValue, "CORPORATESECRETARY", "Corporate Secretary");
    public static final BusinessMembersType SECRETARY_TREASURER = new BusinessMembersType(corporationEnumValue, "SECRETARYTREASURER", "Secretary Treasurer");
    public static final BusinessMembersType CORPORATION_CORPORATE_OFFICER = new BusinessMembersType(corporationEnumValue, "CORPORATEOFFICER", "Corporate Officer");
    public static final BusinessMembersType CORPORATION_MEMBER = new BusinessMembersType(corporationEnumValue, "MEMBER", "Member");

    // Exempt Organization Business Members
    private static final String exemptEnumValue = BusinessTypeEnum.EXEMPT_ORGANIZATION.getEnumValue();
    public static final BusinessMembersType EXEMPT_PRESIDENT = new BusinessMembersType(exemptEnumValue, "PRESIDENT", "President");
    public static final BusinessMembersType EXEMPT_VICE_PRESIDENT = new BusinessMembersType(exemptEnumValue, "VICEPRESIDENT", "Vice President");
    public static final BusinessMembersType CORPORATE_TREASURER = new BusinessMembersType(exemptEnumValue, "CORPORATETREASURER", "Corporate Treasurer");
    public static final BusinessMembersType EXEMPT_TREASURER = new BusinessMembersType(exemptEnumValue, "TREASURER", "Treasurer");
    public static final BusinessMembersType EXEMPT_ASSISTANT_TREASURER = new BusinessMembersType(exemptEnumValue, "ASSISTANTTREASURER", "Assistant Treasurer");
    public static final BusinessMembersType EXEMPT_CHIEF_ACCOUNTING_OFFICER = new BusinessMembersType(exemptEnumValue, "CHIEFACCOUNTINGOFFICER", "Chief Accounting Officer");
    public static final BusinessMembersType CHIEF_EXECUTIVE_OFFICER = new BusinessMembersType(exemptEnumValue, "CHIEFEXECUTIVEOFFICER", "Chief Executive Officer");
    public static final BusinessMembersType CHIEF_FINANCIAL_OFFICER = new BusinessMembersType(exemptEnumValue, "CHIEFFINANCIALOFFICER", "Chief Financial Officer");
    public static final BusinessMembersType EXEMPT_TAX_OFFICER = new BusinessMembersType(exemptEnumValue, "TAXOFFICER", "Tax Officer");
    public static final BusinessMembersType CHIEF_OPERATING_OFFICER = new BusinessMembersType(exemptEnumValue, "CHIEFOPERATINGOFFICER", "Chief Operating Officer");
    public static final BusinessMembersType EXEMPT_CORPORATE_OFFICER = new BusinessMembersType(exemptEnumValue, "CORPORATEOFFICER", "Corporate Officer");
    public static final BusinessMembersType EXECUTIVE_DIRECTOR = new BusinessMembersType(exemptEnumValue, "EXECUTIVEDIRECTOR", "Executive Director");
    public static final BusinessMembersType DIRECTOR = new BusinessMembersType(exemptEnumValue, "DIRECTOR", "Director");
    public static final BusinessMembersType CHAIRMAN = new BusinessMembersType(exemptEnumValue, "CHAIRMAN", "Chairman");
    public static final BusinessMembersType EXECUTIVE_ADMINISTRATOR = new BusinessMembersType(exemptEnumValue, "EXECUTIVEADMINISTRATOR", "Executive Administrator");
    public static final BusinessMembersType EXEMPT_ADMINISTRATOR = new BusinessMembersType(exemptEnumValue, "ADMINISTRATOR", "Administrator");
    public static final BusinessMembersType RECEIVER = new BusinessMembersType(exemptEnumValue, "RECEIVER", "Receiver");
    public static final BusinessMembersType EXEMPT_TRUSTEE = new BusinessMembersType(exemptEnumValue, "TRUSTEE", "Trustee");
    public static final BusinessMembersType PASTOR = new BusinessMembersType(exemptEnumValue, "PASTOR", "Pastor");
    public static final BusinessMembersType ASSISTANT_TO_RELIGIOUS_LEADER = new BusinessMembersType(exemptEnumValue, "ASSISTANTTORELIGIOUSLEADER", "Assistant Toreligious Leader");
    public static final BusinessMembersType REVEREND = new BusinessMembersType(exemptEnumValue, "REVEREND", "Reverend");
    public static final BusinessMembersType PRIEST = new BusinessMembersType(exemptEnumValue, "PRIEST", "Priest");
    public static final BusinessMembersType MINISTER = new BusinessMembersType(exemptEnumValue, "MINISTER", "Minister");
    public static final BusinessMembersType RABBI = new BusinessMembersType(exemptEnumValue, "RABBI", "Rabbi");
    public static final BusinessMembersType LEADER_OF_RELIGIOUS_ORGANIZATION = new BusinessMembersType(exemptEnumValue, "LEADEROFRELIGIOUSORGANIZATION", "Leader Of Religious Organization");
    public static final BusinessMembersType SECRETARY = new BusinessMembersType(exemptEnumValue, "SECRETARY", "Secretary");
    public static final BusinessMembersType DIRECTOR_OF_TAXATION = new BusinessMembersType(exemptEnumValue, "DIRECTOROFTAXATION", "Director Of Taxation");
    public static final BusinessMembersType DIRECTOR_OF_PERSONNEL = new BusinessMembersType(exemptEnumValue, "DIRECTOROFPERSONNEL", "Director Of Personnel");

    // Sole Proprietorship Business Members
    private static final String soleEnumValue = BusinessTypeEnum.SOLE_PROPRIETORSHIP.getEnumValue();
    public static final BusinessMembersType SOLE_OWNER = new BusinessMembersType(soleEnumValue, "OWNER", "Owner");
    public static final BusinessMembersType SOLE_PROPRIETOR = new BusinessMembersType(soleEnumValue, "SOLEPROPRIETOR", "Sole Poprietor");
    public static final BusinessMembersType MEMBER = new BusinessMembersType(soleEnumValue, "MEMBER", "Member");
    public static final BusinessMembersType SOLE_MEMBER = new BusinessMembersType(soleEnumValue, "SOLEMEMBER", "Sole Member");

    public static ArrayList<BusinessMembersType> getBusinessMemberTypes() {
        return new ArrayList<>() {{
            // Estate Business Members
            add(ESTATE_ADMINISTRATOR);
            add(EXECUTOR);
            add(ESTATE_TRUSTEE);
            add(FIDUCIARY);

            // Partnership Business Members
            add(PARTNER);
            add(GENERAL_PARTNER);
            add(LIMITED_PARTNER);
            add(LLC_MEMBER);
            add(MANAGER);
            add(PARTNERSHIP_MEMBER);
            add(MANAGING_MEMBER);
            add(PARTNERSHIP_PRESIDENT);
            add(PARTNERSHIP_OWNER);
            add(TAX_MATTER_PARTNER);

            // Corporation Business Members
            add(CORPORATION_PRESIDENT);
            add(CORPORATION_VICE_PRESIDENT);
            add(CORPORATION_TREASURER);
            add(CORPORATION_ASSISTANT_TREASURER);
            add(CORPORATION_CHIEF_ACCOUNTING_OFFICER);
            add(CORPORATION_TAX_OFFICER);
            add(CORPORATION_CHIEF_OPERATING_OFFICER);
            add(CORPORATE_SECRETARY);
            add(SECRETARY_TREASURER);
            add(CORPORATION_CORPORATE_OFFICER);
            add(CORPORATION_MEMBER);

            // Exempt Organization Business Members
            add(EXEMPT_PRESIDENT);
            add(EXEMPT_VICE_PRESIDENT);
            add(CORPORATE_TREASURER);
            add(EXEMPT_TREASURER);
            add(EXEMPT_ASSISTANT_TREASURER);
            add(EXEMPT_CHIEF_ACCOUNTING_OFFICER);
            add(CHIEF_EXECUTIVE_OFFICER);
            add(CHIEF_FINANCIAL_OFFICER);
            add(EXEMPT_TAX_OFFICER);
            add(CHIEF_OPERATING_OFFICER);
            add(EXEMPT_CORPORATE_OFFICER);
            add(EXECUTIVE_DIRECTOR);
            add(DIRECTOR);
            add(CHAIRMAN);
            add(EXECUTIVE_ADMINISTRATOR);
            add(EXEMPT_ADMINISTRATOR);
            add(RECEIVER);
            add(EXEMPT_TRUSTEE);
            add(PASTOR);
            add(ASSISTANT_TO_RELIGIOUS_LEADER);
            add(REVEREND);
            add(PRIEST);
            add(MINISTER);
            add(RABBI);
            add(LEADER_OF_RELIGIOUS_ORGANIZATION);
            add(SECRETARY);
            add(DIRECTOR_OF_TAXATION);
            add(DIRECTOR_OF_PERSONNEL);

            // Sole Proprietorship Business Members
            add(SOLE_OWNER);
            add(SOLE_PROPRIETOR);
            add(MEMBER);
            add(SOLE_MEMBER);
        }};
    }

    public static ArrayList<BusinessMembersType> getBusinessMemberTypesByBusinessMemberId(String businessTypeEnumValue) {
        ArrayList<BusinessMembersType> businessMemberTypes = getBusinessMemberTypes();
        return new ArrayList<>(businessMemberTypes.stream().filter(businessMembersType -> businessMembersType.getBusinessTypeEnumValue().equals(businessTypeEnumValue)).toList());
    }

}
