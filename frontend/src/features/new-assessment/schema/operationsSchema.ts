import { z } from "zod";

export const operationsSchema = z.object({

    monthly_sales_orders: z.object({

        values: z.array(z.number()),

    }),

    monthly_purchase_orders: z.object({

        values: z.array(z.number()),

    }),

    vendor_count: z.number(),

    customer_count: z.number(),

    repeat_customer_ratio: z.number(),

    capacity_utilization: z.number(),

    inventory_turnover: z.number(),

    order_fulfillment_rate: z.number(),

    employee_productivity: z.number(),

});

export type Operations = z.infer<typeof operationsSchema>;