import BusinessProfileSection from "./business-profile/BusinessProfileSection";
import CashflowSection from "./cashflow/CashflowSection";
import OperationsSection from "./operations/OperationsSection";
import AlternateDataSection from "./alternate-data/AlternateDataSection";
import ComplianceSection from "./compliance/ComplianceSection";
import FinancialPositionSection from "./financial-position/FinancialPositionSection";
import LoanRequestSection from "./loan-request/LoanRequestSection";

interface SectionContainerProps {
    activeStep: number;
}

const SectionContainer = ({
    activeStep,
}: SectionContainerProps) => {

    switch (activeStep) {

        case 1:
            return <BusinessProfileSection />;

        case 2:
            return <CashflowSection />;

        case 3:
            return <OperationsSection />;

        case 4:
            return <AlternateDataSection />;

        case 5:
            return <ComplianceSection />;

        case 6:
            return <FinancialPositionSection />;

        case 7:
            return <LoanRequestSection />;

        default:
            return <BusinessProfileSection />;
    }

};

export default SectionContainer;