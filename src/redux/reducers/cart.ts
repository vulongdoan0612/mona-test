import { fetchData } from "@/services/data";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface IState {
  cart: any;
  getCart: any;
}

export const addProductToCart = createAsyncThunk("/add-product-to-cart", async (arg: any) => {
  const { cartId, sku, setSpin, setIsModalOpen } = arg;
  const postData = {
    query:
      "mutation addProductToCart($cartId: String!, $cartItems: [CartItemInput!]!) { addProductsToCart(cartId: $cartId, cartItems: $cartItems) { cart { email id is_virtual total_quantity } user_errors { code message } } }",
    variables: {
      cartId: cartId,
      cartItems: [
        {
          sku: sku,
          quantity: 1,
        },
      ],
    },
  };

  const res = await fetchData(postData);
  if (res.status === 200) {
    setSpin(false);
    setIsModalOpen(true);
  }
  return res?.data;
});
export const getCartList = createAsyncThunk("/getCart", async (arg: any) => {
  const { cartId, setSpin } = arg;
  const postData = {
    query:
      "query getCart($cart_id: String!) { cart(cart_id: $cart_id) { id is_virtual total_quantity prices { discounts { amount { currency value } label } grand_total { currency value } subtotal_excluding_tax { currency value } } items { errors { code message } quantity uid product { __typename sku uid name url_key url_suffix canonical_url stock_status meta_description meta_keyword meta_title new_from_date new_to_date rating_summary review_count thumbnail { url position } image { url } color size rating_summary_start { star_1 star_2 star_3 star_4 star_5 } attributes { attribute_code label value } } prices { discounts { amount { currency value } label } price { currency value } row_total { currency value } total_item_discount { currency value } } } } }",
    variables: {
      cart_id: cartId,
    },
  };
  const res = await fetchData(postData);
  if (res.status === 200) {
    setSpin(false);
  }
  return res?.data;
});

export const createCart = createAsyncThunk("/create-cart", async (arg: any) => {
  const { sku, setSpin, setIsModalOpen } = arg;
  const postData = {
    query: "mutation createEmptyCart { createEmptyCart }",
  };
  const res = await fetchData(postData);
  if (res.status === 200) {
    const postDataAdd = {
      query:
        "mutation addProductToCart($cartId: String!, $cartItems: [CartItemInput!]!) { addProductsToCart(cartId: $cartId, cartItems: $cartItems) { cart { email id is_virtual total_quantity } user_errors { code message } } }",
      variables: {
        cartId: res?.data?.data?.createEmptyCart,
        cartItems: [
          {
            sku: sku,
            quantity: 1,
          },
        ],
      },
    };
    localStorage.setItem("cartId", res?.data?.data?.createEmptyCart);
    const resAdd = await fetchData(postDataAdd);
    if (resAdd.status === 200) {
      setSpin(false);
      setIsModalOpen(true);
    }
    return resAdd?.data;
  }
});
const initialState: IState = {
  cart: [],
  getCart: [],
};

const slicer = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createCart.fulfilled, (state, action: any) => {
      state.cart = action.payload;
    });
    builder.addCase(addProductToCart.fulfilled, (state, action: any) => {
      state.cart = action.payload;
    });
    builder.addCase(getCartList.fulfilled, (state, action: any) => {
      state.getCart = action.payload;
    });
  },
});

export default slicer.reducer;
