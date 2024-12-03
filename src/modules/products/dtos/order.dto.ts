import { IsArray, IsDateString, ArrayMinSize, ArrayMaxSize } from 'class-validator';

export class CreateOrderDto {
    @IsArray()
    @ArrayMinSize(1)
    @ArrayMaxSize(4, { message: 'You can order up to 4 scoops only' })
    scoops: { flavor_id: number, topping_id: number | null }[];

    @IsDateString()
    pickupTime: Date;
}

export class OrderResponse {
    order_id: string;
    pickup_time: string;
    scoops: { flavor: string; topping: string }[];
    created_at: string;
    updated_at: string;

    constructor(order: any) {
        this.order_id = order.order_id;
        this.pickup_time = order.pickupTime;
        this.created_at = order.createdAt;
        this.updated_at = order.updatedAt;

        this.scoops = order.scoops.map((scoop: any) => ({
            flavor: scoop.flavor.name,
            topping: scoop.topping ? scoop.topping.name : null,
        }));
    }
}
