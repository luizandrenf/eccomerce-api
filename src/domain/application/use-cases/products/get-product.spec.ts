import { GetProductUseCase } from './get-product';
import { InMemoryProductsRepository } from '../../../../../test/repositories/in-memory-products-repository';
import { Product } from '@/domain/enterprise/entities/product';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';

describe('Get product use case', () => {
  let productsRepository: InMemoryProductsRepository;
  let sut: GetProductUseCase;

  beforeEach(() => {
    productsRepository = new InMemoryProductsRepository();
    sut = new GetProductUseCase(productsRepository);
  });

  it('should be able to get a product', async () => {
    const product = await productsRepository.create(
      Product.create({
        name: 'random',
        description: 'description',
        price: 10,
      }),
    );

    const findProduct = await sut.execute({
      id: product.id,
    });

    expect(findProduct).toBeTruthy();
    expect(findProduct.name).toBe('random');
  });

  it('should not be able to get a product', async () => {
    await expect(
      sut.execute({
        id: 'inexistent',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
