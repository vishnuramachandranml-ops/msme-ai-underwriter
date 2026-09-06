import type { Control } from "react-hook-form";
import type { AssessmentFormValues } from "@/types/assessment";
import { NumberField } from "@/components/shared/form-fields/NumberField";
import { MonthlySeriesField } from "@/components/shared/form-fields/MonthlySeriesField";

interface Props {
    control: Control<AssessmentFormValues>;
}

const OperationsSection = ({ control }: Props) => {
    return (
        <div className="space-y-5">
            <MonthlySeriesField control={control} name="operations.monthly_sales_orders.values" label="Monthly Sales Orders" />
            <MonthlySeriesField control={control} name="operations.monthly_purchase_orders.values" label="Monthly Purchase Orders" />

            <div className="grid grid-cols-2 gap-4">
                <NumberField control={control} name="operations.vendor_count" label="Vendor Count" />
                <NumberField control={control} name="operations.customer_count" label="Customer Count" />
                <NumberField control={control} name="operations.repeat_customer_ratio" label="Repeat Customer Ratio (0-1)" step={0.01} />
                <NumberField control={control} name="operations.capacity_utilization" label="Capacity Utilization (0-1)" step={0.01} />
                <NumberField control={control} name="operations.inventory_turnover" label="Inventory Turnover" />
                <NumberField control={control} name="operations.order_fulfillment_rate" label="Order Fulfillment Rate (0-1)" step={0.01} />
                <NumberField control={control} name="operations.employee_productivity" label="Employee Productivity (₹)" />
            </div>
        </div>
    );
};

export default OperationsSection;