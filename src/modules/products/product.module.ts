import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Porducts } from 'src/entity/product.entity';
import { Order } from 'src/entity/order.entity';
import { Scoop } from 'src/entity/scoop.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Porducts, Order, Scoop])],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}