import dayjs from "dayjs";

export interface OrderInput {
    product_type_id?: string,
    amount_char?: string,
    amount?: string,
    delivery_id?: string,
    project_id?: string,
    amount_icon?: string,
    date_pickup?: dayjs.Dayjs | null,
    handle?: string
    picture_original?: string
}
