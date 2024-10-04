import { CreateProductUseCase } from './create-product';
import { InMemoryProductsRepository } from '../../../../../test/repositories/in-memory-products-repository';

describe('Create product use case', () => {
  let productsRepository: InMemoryProductsRepository;
  let sut: CreateProductUseCase;

  beforeEach(() => {
    productsRepository = new InMemoryProductsRepository();
    sut = new CreateProductUseCase(productsRepository);
  });

  it('should be able to create a product', async () => {
    const product = await sut.execute({
      name: 'random',
      description: 'description',
      price: 10,
    });

    expect(product).toBeTruthy();
    expect(product.name).toBe('random');
  });
});
