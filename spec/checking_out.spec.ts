import { Checkout, LineItem, Product, ProductCatalogue } from '../src';

const assertReceiptLineItem = (lineItem: LineItem) => {
  return (
    expectedName: string,
    expectedQuantity: number,
    expectedTotalPrice: number,
  ) => {
    expect(lineItem).not.toBeUndefined();
    expect(lineItem.product.name).toEqual(expectedName);
    expect(lineItem.quantity).toEqual(expectedQuantity);
    expect(lineItem.totalPrice).toEqual(expectedTotalPrice);
  };
};

describe('Checking out articles at the supermarket', () => {
  const Apples = new Product('Apples'),
    Bananas = new Product('Bananas'),
    Coffee = new Product('Coffee'),
    Rice = new Product('Rice');

  const catalogue = new ProductCatalogue();

  beforeEach(() => {
    catalogue.setPriceOf(Apples, 2.0);
    catalogue.setPriceOf(Bananas, 1.5);
    catalogue.setPriceOf(Rice, 2.7);
    catalogue.setPriceOf(Coffee, 4.5);
  });

  afterEach(() => catalogue.reset());

  describe(`The receipt`, () => {
    it(`should show the total price of £0 when the shopping cart is empty`, () => {
      const checkout = new Checkout(catalogue);

      const receipt = checkout.scan([
        /* no products in the basket */
      ]);

      expect(receipt.totalPrice()).toEqual(0);
    });

    describe(`with no special offers`, () => {
      it(`should show the total price equal to the total price of individual items`, () => {
        const checkout = new Checkout(catalogue);

        const receipt = checkout.scan([Apples]);

        expect(receipt.totalPrice()).toEqual(2.0);
      });

      it(`and a single product type should show the quantity and a total price`, () => {
        const checkout = new Checkout(catalogue);

        const receipt = checkout.scan([Apples, Apples]);

        const lineItem = receipt.lineItems[0];

        assertReceiptLineItem(lineItem)(Apples.name, 2, 2 * 2.0);
      });

      it(`and mutiple product types should show the quantity and a total price for each of the product types grouped into lines`, () => {
        const checkout = new Checkout(catalogue);

        const receipt = checkout.scan([
          Apples,
          Bananas,
          Apples,
          Coffee,
          Coffee,
        ]);

        assertReceiptLineItem(receipt.lineItems[0])(Apples.name, 2, 4);
        assertReceiptLineItem(receipt.lineItems[1])(Bananas.name, 1, 1.5);
        assertReceiptLineItem(receipt.lineItems[2])(Coffee.name, 2, 9);
      });
    });

    describe(`with "fixed discount" offer`, () => {});

    describe(`with "Buy 2 get 1 free" offer`, () => {});

    describe(`with "Buy 4 get 1 free" offer`, () => {});

    describe(`with "10% discount" offer`, () => {});

    describe(`with "20% discount when you buy more than 10" offer`, () => {});
  });
});
