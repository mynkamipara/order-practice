import { PRODUCT_TYPE } from 'src/utils/const';
import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('products')
export class Porducts {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name:string;

    @Column({
        type:'enum',
        enum: PRODUCT_TYPE,
        default: PRODUCT_TYPE.FLAVORS
    })
    type:string;

    @CreateDateColumn({ type: 'timestamptz' })
    readonly createdAt!: Date;

    @UpdateDateColumn({ type: 'timestamptz' })
    readonly updatedAt!: Date;

}