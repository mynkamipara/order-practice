import { Controller, Get, Post, Param, HttpStatus, Query, Body } from '@nestjs/common';
import { ProductService } from './product.service';
import { Apiresponse } from 'src/utils/response';
import { CreateOrderDto } from './dtos/order.dto';

@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) { }
    @Get()
    async findAll(
        @Query() query
    ) {
        const products = await this.productService.getAllProduct(query);
        return new Apiresponse<any>(HttpStatus.OK, products);
    }

    @Get('/:id')
    async getProductById(
        @Param('id') id: number,
    ) {
        const product = await this.productService.getProductById(id);
        return new Apiresponse<any>(HttpStatus.OK, product);
    }

    @Post('/order')
    async orderProduct(
        @Body() data: CreateOrderDto,
    ) {
        const order = await this.productService.createOrder(data);
        return new Apiresponse<any>(HttpStatus.OK, order);
    }

    @Get('/order/:id')
    async getOrderByOrderId(
        @Param('id') id: string,
    ) {
        const order = await this.productService.getOrderByOrderId(id);
        return new Apiresponse<any>(HttpStatus.OK, order);
    }

    @Post('/sync')
    syncProduct() {
        return this.productService.syncProductRecords();
    }
}