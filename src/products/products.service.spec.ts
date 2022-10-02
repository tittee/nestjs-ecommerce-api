import { NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { ProductTag } from './product-tag.enum';
import { ProductsRepository } from './products.repository';
import { ProductsService } from './products.service';

const mockProductsRepository = () => ({
  getProducts: jest.fn(),
  findOne: jest.fn(),
});

const mockUser = {
  username: 'wittawat',
  id: 'someId',
  email: 'admin@demo.com',
  firstname: 'wittawat',
  lastname: 'kittiwarabud',
  password: 'somePassword',
  products: [],
};

describe('ProductsService', () => {
  let productsService: ProductsService;
  let productsRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        ProductsService,
        { provide: ProductsRepository, useFactory: mockProductsRepository },
      ],
    }).compile();

    productsService = module.get(ProductsService);
    productsRepository = module.get(ProductsRepository);
  });

  describe('getProducts', () => {
    it('calls ProductsRepository.getProducts and returns the result', async () => {
      productsRepository.getProducts.mockResolvedValue('someValue');
      const result = await productsService.getProducts(null, mockUser);
      expect(result).toEqual('someValue');
    });
  });

  describe('getProductById', () => {
    it('calls ProductsRepository.findOne and returns the result', async () => {
      const mockProduct = {
        title: 'Test title',
        description: 'Test desc',
        id: 'someId',
        status: ProductTag.GOOD,
      };

      productsRepository.findOne.mockResolvedValue(mockProduct);
      const result = await productsService.getProductById('someId', mockUser);
      expect(result).toEqual(mockProduct);
    });

    it('calls ProductsRepository.findOne and handles an error', async () => {
      productsRepository.findOne.mockResolvedValue(null);
      expect(
        productsService.getProductById('someId', mockUser),
      ).rejects.toThrow(NotFoundException);
    });
  });
});
