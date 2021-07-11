import { KeystoneContext, SessionStore } from "@keystone-next/types";
import { Session } from "../types";

import { CartItemCreateInput } from "../.keystone/schema-types";

async function addToCart(
  _root: any,
  { productId }: { productId: string },
  context: KeystoneContext
): Promise<CartItemCreateInput> {
  // Get CartItem from Keystone lists API
  const { CartItem } = context.lists;
  // 1. Query the current user to see if they are signed in
  const session = context.session as Session;
  if (!session.itemId) {
    throw new Error("You must be logged in to add items to your cart!");
  }
  // 2. Query the current users cart
  const allCartItems = await CartItem.findMany({
    where: {
      user: {
        id: session.itemId
      },
      product: {
        id: productId
      }
    },
    resolveFields: 'id,quantity',
  });
  // 3. See if the current item is in their cart
  const [existingCartItem] = allCartItems; //= extract the first item from the list if it exists
  // 4A. if it is, increment by 1
  if (existingCartItem) { 
    return await CartItem.updateOne({
      id: existingCartItem.id,
      data: {
        quantity: existingCartItem.quantity + 1
      },
      resolveFields: false,
    });
  }
  // 4B. if it isnt, create a new cart item!
  return await CartItem.createOne({
    data: {
      product: { connect: { id: productId }},
      user: { connect: { id: session.itemId }},
    },
    resolveFields: false,
  });
}

export default addToCart;
