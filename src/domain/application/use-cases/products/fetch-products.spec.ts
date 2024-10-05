import { FetchProductsUseCase } from './fetch-products';
import { InMemoryProductsRepository } from '../../../../../test/repositories/in-memory-products-repository';
import { Product } from '@/domain/enterprise/entities/product';

describe('Fetch products use case', () => {
  let productsRepository: InMemoryProductsRepository;
  let sut: FetchProductsUseCase;

  beforeEach(() => {
    productsRepository = new InMemoryProductsRepository();
    sut = new FetchProductsUseCase(productsRepository);
  });

  it('should be able to fecth products', async () => {
    Promise.all([
      await productsRepository.create(
        Product.create({
          name: 'random',
          description: 'description',
          price: 10,
        }),
      ),
      await productsRepository.create(
        Product.create({
          name: 'random2',
          description: 'description2',
          price: 20,
        }),
      ),
    ]);

    const products = await sut.execute();

    expect(products).toBeTruthy();
    expect(products).toHaveLength(2);
  });
});
