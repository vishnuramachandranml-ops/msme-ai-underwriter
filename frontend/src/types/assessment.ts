import { z } from "zod";

// Reusable: array of exactly 6 monthly numeric values
const monthlySeriesSchema = z.object({
    values: z.array(z.number()).length(6, "Must provide exactly 6 monthly values"),
});

export const assessmentSchema = z.object({

    metadata: z.object({
        request_id: z.string().min(1, "Request ID is required"),
        source_system: z.string().min(1),
        model_version: z.string().min(1),
    }),

    business_profile: z.object({
        business_id: z.string().min(1),
        business_name: z.string().min(1),
        industry: z.enum([
            "MANUFACTURING",
            "SERVICES",
            "TRADING",
            "AGRICULTURE",
            "CONSTRUCTION",
            "OTHER",
        ]),
        business_type: z.string().min(1),
        msme_registered: z.boolean(),
        udyam_registration_number: z.string().optional(),
        business_age_years: z.number().nonnegative(),
        employee_count: z.number().int().nonnegative(),
        annual_turnover: z.number().nonnegative(),
        location: z.string().min(1),
    }),

    cashflow: z.object({
        monthly_revenue: monthlySeriesSchema,
        monthly_expenses: monthlySeriesSchema,
        average_collection_days: z.number().nonnegative(),
        average_supplier_payment_days: z.number().nonnegative(),
    }),

    operations: z.object({
        monthly_sales_orders: monthlySeriesSchema,
        monthly_purchase_orders: monthlySeriesSchema,
        vendor_count: z.number().int().nonnegative(),
        customer_count: z.number().int().nonnegative(),
        repeat_customer_ratio: z.number().min(0).max(1),
        capacity_utilization: z.number().min(0).max(1),
        inventory_turnover: z.number().nonnegative(),
        order_fulfillment_rate: z.number().min(0).max(1),
        employee_productivity: z.number().nonnegative(),
    }),

    alternate_data: z.object({
        gst_registered: z.boolean(),
        gst_filing_rate: z.number().min(0).max(1),
        gst_turnover: z.number().nonnegative(),
        upi_transaction_count: z.number().int().nonnegative(),
        upi_transaction_volume: z.number().nonnegative(),
        average_bank_balance: z.number().nonnegative(),
        digital_payment_ratio: z.number().min(0).max(1),
        positive_bank_statement_months: z.number().int().min(0).max(12),
        online_rating: z.number().min(0).max(5),
        electricity_units: monthlySeriesSchema,
        fuel_expense: monthlySeriesSchema,
    }),

    compliance: z.object({
        gst_registered: z.boolean(),
        gst_return_filing_rate: z.number().min(0).max(1),
        itr_filed_last_3_years: z.boolean(),
        epfo_registered: z.boolean(),
        epfo_compliance_rate: z.number().min(0).max(1),
        tax_payment_delay_days: z.number().nonnegative(),
        statutory_dues_pending: z.boolean(),
        regulatory_notices: z.number().int().nonnegative(),
    }),

    financial_position: z.object({
        total_assets: z.number().nonnegative(),
        current_assets: z.number().nonnegative(),
        fixed_assets: z.number().nonnegative(),
        cash_and_bank: z.number().nonnegative(),
        inventory: z.number().nonnegative(),
        accounts_receivable: z.number().nonnegative(),
        total_liabilities: z.number().nonnegative(),
        current_liabilities: z.number().nonnegative(),
        long_term_debt: z.number().nonnegative(),
        net_worth: z.number(),
        book_value: z.number(),
        working_capital: z.number(),
    }),

    loan_request: z.object({
        loan_type: z.enum([
            "WORKING_CAPITAL",
            "TERM_LOAN",
            "EQUIPMENT_FINANCE",
            "TRADE_FINANCE",
        ]),
        requested_amount: z.number().positive(),
        loan_tenure_months: z.number().int().positive(),
        loan_purpose: z.string().min(1),
        existing_loan_amount: z.number().nonnegative(),
        existing_emi: z.number().nonnegative(),
        collateral: z.object({
            available: z.boolean(),
            collateral_type: z.string().optional(),
            estimated_value: z.number().nonnegative().optional(),
        }),
    }),

});

export type AssessmentFormValues = z.infer<typeof assessmentSchema>;

// Sensible starting point for a fresh manual-entry form
export const assessmentDefaultValues: AssessmentFormValues = {
    metadata: { request_id: "", source_system: "Manual Entry", model_version: "1.0" },
    business_profile: {
        business_id: "", business_name: "", industry: "MANUFACTURING",
        business_type: "", msme_registered: false, udyam_registration_number: "",
        business_age_years: 0, employee_count: 0, annual_turnover: 0, location: "",
    },
    cashflow: {
        monthly_revenue: { values: [0, 0, 0, 0, 0, 0] },
        monthly_expenses: { values: [0, 0, 0, 0, 0, 0] },
        average_collection_days: 0, average_supplier_payment_days: 0,
    },
    operations: {
        monthly_sales_orders: { values: [0, 0, 0, 0, 0, 0] },
        monthly_purchase_orders: { values: [0, 0, 0, 0, 0, 0] },
        vendor_count: 0, customer_count: 0, repeat_customer_ratio: 0,
        capacity_utilization: 0, inventory_turnover: 0,
        order_fulfillment_rate: 0, employee_productivity: 0,
    },
    alternate_data: {
        gst_registered: false, gst_filing_rate: 0, gst_turnover: 0,
        upi_transaction_count: 0, upi_transaction_volume: 0, average_bank_balance: 0,
        digital_payment_ratio: 0, positive_bank_statement_months: 0, online_rating: 0,
        electricity_units: { values: [0, 0, 0, 0, 0, 0] },
        fuel_expense: { values: [0, 0, 0, 0, 0, 0] },
    },
    compliance: {
        gst_registered: false, gst_return_filing_rate: 0, itr_filed_last_3_years: false,
        epfo_registered: false, epfo_compliance_rate: 0, tax_payment_delay_days: 0,
        statutory_dues_pending: false, regulatory_notices: 0,
    },
    financial_position: {
        total_assets: 0, current_assets: 0, fixed_assets: 0, cash_and_bank: 0,
        inventory: 0, accounts_receivable: 0, total_liabilities: 0,
        current_liabilities: 0, long_term_debt: 0, net_worth: 0,
        book_value: 0, working_capital: 0,
    },
    loan_request: {
        loan_type: "WORKING_CAPITAL", requested_amount: 0, loan_tenure_months: 12,
        loan_purpose: "", existing_loan_amount: 0, existing_emi: 0,
        collateral: { available: false, collateral_type: "", estimated_value: 0 },
    },
};