import { Cart } from '../Models/Cart.js';

export const addToCart = async (req, res) => {
  const { productId, title, price, qty, imgsrc } = req.body;

  const userId = req.user;
  let cart = await Cart.findOne({ userId });
  if (!cart) {
    cart = new Cart({ userId, items: [] })
  }
  const cartIndex = cart.items.findIndex((item) => item.productId.toString() == productId);
  if (cartIndex > -1) {
    cart.items[cartIndex].qty += qty;
    cart.items[cartIndex].price += price * qty;
  }
  else {
    cart.items.push({ productId, title, price, qty, imgsrc });

  }

  await cart.save();

  res.json({ message: "item added to Cart", cart });
}

export const userCart = async (req, res) => {

  const userId = req.user;
  const cart = await Cart.findOne({ userId });
  if (!cart) return res.json({ message: "Cart not found", success: "false" })

  res.json({ message: "user Cart", cart, success: "true" })

}


export const removeCart = async (req, res) => {
  const productId = req.params.productId;
  const userId = req.user;

  let cart = await Cart.findOne({ userId });
  if (!cart) return res.json({ messge: "Cart not found" });

  cart.items = cart.items.filter((item) => item.productId.toString() !== productId)

  await cart.save();

  res.json({ message: "product remove from cart" });
};


// clear cart
export const clearCart = async (req, res) => {

  const userId = req.user;

  let cart = await Cart.findOne({ userId });
  if (!cart) {
    cart = new Cart({ items: [] })
  } else {
    cart.items = [];
  }

  await cart.save();

  res.json({ message: " cart cleared" });
};



export const decreaseProudctQty = async (req, res) => {
  const { productId, qty } = req.body;

  const userId = req.user;

  let cart = await Cart.findOne({ userId });

  if (!cart) {
    cart = new Cart({ userId, items: [] });
  }

  const itemIndex = cart.items.findIndex(
    (item) => item.productId.toString() === productId
  );

  if (itemIndex > -1) {
    const item = cart.items[itemIndex]

    if (item.qty > qty) {
      const pricePerUnit = item.price / item.qty

      item.qty -= qty
      item.price -= pricePerUnit * qty
    } else {
      cart.items.splice(itemIndex, 1)
    }

  } else {
    return res.json({ messge: 'invalid product Id' })
  }

  await cart.save();
  res.json({ message: "Items qty decreased", cart });
};