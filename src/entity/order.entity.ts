import { Entity, PrimaryGeneratedColumn, OneToMany, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Scoop } from './scoop.entity';
import { IsDateString } from 'class-validator';

@Entity('orders')
export class Order {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToMany(() => Scoop, (scoop) => scoop.order, { cascade: true })
    scoops: Scoop[];

    @Column({ type: 'varchar' })
    order_id: string;


    @Column({ type: 'timestamp' })
    @IsDateString()
    pickupTime: Date;

    @CreateDateColumn({ type: 'timestamptz' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamptz' })
    updatedAt: Date;
}
