import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from 'src/entity/order.entity';
import { Porducts } from 'src/entity/product.entity';
import { product_data, PRODUCT_TYPE } from 'src/utils/const';
import { Repository, Like } from 'typeorm';
import { CreateOrderDto, OrderResponse } from './dtos/order.dto';
import { Scoop } from 'src/entity/scoop.entity';
import * as fs from 'fs/promises';
import * as path from 'path';


@Injectable()
export class ProductService {
    private readonly jsonFilePath = path.join(__dirname, '../../utils/', 'data.json');
    constructor(
        @InjectRepository(Porducts)
        private readonly productRepo: Repository<Porducts>,
        @InjectRepository(Order)
        private orderRepository: Repository<Order>

    ){}

    async getAllProduct(filter:Record<any,any>){
        const whereClouse = {};

        if(filter.search){
            Object.assign(whereClouse,{ name : Like(`%${filter.search}%`)})
        }
        if(filter.type){
            Object.assign(whereClouse,{ type : filter.type })
        }
        return this.productRepo.find({where:whereClouse})
    }

    async getProductById(id){
        const product = await this.productRepo.findOne({where:{id}})
        if(!product){
            throw new NotFoundException('Product not found.')
        }
        return product;
    }

    async createOrder(createOrderDto: CreateOrderDto) {
        const { scoops, pickupTime  } = createOrderDto;

        if (scoops.length > 4) {
            throw new BadRequestException('You can order up to 4 scoops only');
        }

        const scoopEntities: Scoop[] = [];
        for (const scoop of scoops) {
            const flavor_product = await this.productRepo.findOne({ where: { id: scoop.flavor_id, type: PRODUCT_TYPE.FLAVORS } });
            if (!flavor_product) {
                throw new BadRequestException(`Flavor with ID ${scoop.flavor_id} not found`);
            }
            let topping_product;
            if(scoop.topping_id){
                topping_product = await this.productRepo.findOne({ where: { id: scoop.topping_id, type: PRODUCT_TYPE.TOPPINGS } });
            }

            const scoopEntity = new Scoop();
            scoopEntity.flavor = flavor_product;
            scoopEntity.topping = topping_product || null;
            scoopEntities.push(scoopEntity);
        }

        const timestamp = Date.now().toString();
        const randomSuffix = Math.floor(Math.random() * 1000);


        const order = new Order();
        order.order_id = `${timestamp}${randomSuffix}`;
        order.scoops = scoopEntities;
        order.pickupTime = pickupTime;

        await this.orderRepository.save(order);

        return order;
    }

   async getOrderByOrderId(orderId: string): Promise<OrderResponse> {
        const order = await this.orderRepository.findOne({
            where: { order_id: orderId },
            relations: ['scoops', 'scoops.flavor', 'scoops.topping']
        });

        if (!order) {
            throw new NotFoundException(`Order with ID ${orderId} not found`);
        }

        return new OrderResponse(order);
    }

    async syncProductRecords(){
        try{
            let create_many = [];
            const data = await fs.readFile(this.jsonFilePath, 'utf-8');
            const products : {name:string, type:string}[] = JSON.parse(data);
            for(let product of products){
                const new_one = new Porducts();
                new_one.name = product.name;
                new_one.type = product.type;
                create_many.push(new_one);
            }
            return await this.productRepo.save(create_many)
        }catch(error){
            console.log('error: ', error);

        }
       
    }


}