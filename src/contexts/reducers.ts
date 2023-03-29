import { Product } from "./GlobalState";

export const ADD_PRODUCT = "ADD_PRODUCT";
export const REMOVE_PRODUCT = "REMOVE_PRODUCT";
export const ADD_LIKED = "ADD_LIKED";
export const REMOVE_LIKED = "REMOVE_LIKED";

const addProductToCart = (product: Product, state: any) => {
  const updatedCart = [...state.cart];
  const updatedItemIndex = updatedCart.findIndex(
    item => item.id === product.id
  );

  if (updatedItemIndex < 0) {
    updatedCart.push({ ...product, quantity: 1 });
  } else {
    const updatedItem = {
      ...updatedCart[updatedItemIndex]
    };
    updatedItem.quantity++;
    updatedCart[updatedItemIndex] = updatedItem;
  }
  return { ...state, cart: updatedCart };
};

const removeProductFromCart = (productId: string, state: any) => {
  const updatedCart = [...state.cart];
  const updatedItemIndex = updatedCart.findIndex(item => item.id === productId);

  const updatedItem = {
    ...updatedCart[updatedItemIndex]
  };
  updatedItem.quantity--;
  if (updatedItem.quantity <= 0) {
    updatedCart.splice(updatedItemIndex, 1);
  } else {
    updatedCart[updatedItemIndex] = updatedItem;
  }
  return { ...state, cart: updatedCart };
};

const addProductToLiked = (product: Product, state: any) => {
  const updatedLiked = [...state.liked];
  const updatedItemIndex = updatedLiked.findIndex(
    item => item.id === product.id
  );

  if(updatedItemIndex < 0)
    updatedLiked.push({ ...product, liked: true });

  return { ...state, liked: updatedLiked };
};

const removeProductFromLiked = (productId: string, state: any) => {
  const updatedLiked = [...state.liked];
  const updatedItemIndex = updatedLiked.findIndex(item => item.id === productId);

  console.log(updatedItemIndex)
  const updatedItem = {
    ...updatedLiked[updatedItemIndex]
  };
  updatedItem.isLiked = false;
  updatedLiked.splice(updatedItemIndex, 1);

  return { ...state, liked: updatedLiked };
};

export const shopReducer = (state: any, action: any) => {
  switch (action.type) {
    case ADD_PRODUCT:
      return addProductToCart(action.product, state);
    case REMOVE_PRODUCT:
      return removeProductFromCart(action.productId, state);
    case ADD_LIKED:
      return addProductToLiked(action.product, state);
    case REMOVE_LIKED:
      return removeProductFromLiked(action.productId, state);
    default:
      return state;
  }
};
