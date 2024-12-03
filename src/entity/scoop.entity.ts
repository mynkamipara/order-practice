import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column } from 'typeorm';
import { Porducts } from './product.entity';
import { Order } from './order.entity';

@Entity('scoops')
export class Scoop {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Porducts, { nullable: false })
    @JoinColumn({ name: 'flavor_id' })
    flavor: Porducts;

    @ManyToOne(() => Porducts, { nullable: true })
    @JoinColumn({ name: 'topping_id' })
    topping: Porducts;

    @ManyToOne(() => Order, (order) => order.scoops, { nullable: false })
    @JoinColumn({ name: 'order_id' })
    order: Order;
}
