import Page from "@/layout/Page";
import { getCartList } from "@/redux/reducers/cart";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchData } from "@/services/data";
import { LeftOutlined } from "@ant-design/icons";
import { Image, InputNumber, Skeleton, Spin } from "antd";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Checkout = () => {
  const { getCart } = useSelector((state: RootState) => state.cart);
  const [spin, setSpin] = useState(true);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    const cartId = localStorage.getItem("cartId");
    if (cartId !== null) {
      dispatch(getCartList({ cartId, setSpin }));
    } else {
      setSpin(false);
    }
  }, []);

  const onChangeAmount = async (value: number, uid: string) => {
    setSpin(true);
    const cartId = localStorage.getItem("cartId");
    const postData = {
      query:
        "mutation updateCartItem($input: UpdateCartItemsInput) { updateCartItems(input: $input) { cart { email id is_virtual total_quantity } } }",
      variables: {
        input: {
          cart_id: cartId,
          cart_items: [
            {
              cart_item_uid: uid,
              quantity: value,
            },
          ],
        },
      },
    };
    const res = await fetchData(postData);
    if (res.status === 200) {
      dispatch(getCartList({ cartId, setSpin }));
    }
  };

  const handleRemove = async (uid: string) => {
    setSpin(true);
    const cartId = localStorage.getItem("cartId");
    const postData = {
      query:
        "mutation removeItemFromCart($removeItemFromCartInput: RemoveItemFromCartInput) { removeItemFromCart(input: $removeItemFromCartInput) { cart { id items { uid errors { code message } } } } }",
      variables: {
        removeItemFromCartInput: {
          cart_id: cartId,
          cart_item_uid: uid,
        },
      },
    };
    const res = await fetchData(postData);
    if (res.status === 200) {
      if (getCart?.data?.cart?.items?.length === 1) {
        localStorage.removeItem("cartId");
      }
      dispatch(getCartList({ cartId, setSpin }));
    }
  };

  return (
    <Page title="Checkout">
      <div className="checkout-wrapper">
        <div className="checkout-wrapper-main">
          <div className="breadcum">
            <div className="continue-shopping">
              <LeftOutlined></LeftOutlined>
              <Link href="/">
                <span className="text"> Continue Shopping</span>
              </Link>
            </div>
          </div>
          {getCart?.data?.cart?.items?.length > 0 ? (
            <div className="contain-cart">
              <div className="left-cart">
                <span className="title">
                  <span className="amount-head">
                    <b>Shopping Cart</b>{" "}
                  </span>
                  <p>({getCart?.data?.cart?.total_quantity} item)</p>
                </span>
                <div className="list-cart">
                  {getCart?.data?.cart?.items?.length > 0 &&
                    getCart?.data?.cart?.items?.map((item: any, index: number) => {
                      return (
                        <div className="cart" key={index}>
                          <div className="header-cart">
                            <span className="atri">Status:</span>{" "}
                            <span className="text">{item.product.stock_status === "IN_STOCK" ? "In stock" : "Not in stock"}</span>
                          </div>
                          <div className="middle-cart">
                            <div className="product-img">
                              <Image src={item.product.image.url} preview={false} alt=""></Image>
                            </div>
                            <div className="info-product">
                              <span className="product-name">{item.product.name}</span>
                              <span className="product-description">
                                {item.product.attributes.map((item: any, index: number) => {
                                  return (
                                    <span key={index}>
                                      {item.attribute_code === "activity" ? (
                                        <>
                                          {item.value !== "" && item.value !== null && item.value !== undefined ? (
                                            <>
                                              <span className="atri">Activity: </span>
                                              <span className="text">{item.value}</span>
                                            </>
                                          ) : (
                                            ""
                                          )}
                                        </>
                                      ) : item.attribute_code === "material" ? (
                                        <>
                                          {item.value !== "" && item.value !== null && item.value !== undefined ? (
                                            <>
                                              <span className="atri">Material: </span>
                                              <span className="text">{item.value}</span>
                                            </>
                                          ) : (
                                            ""
                                          )}
                                        </>
                                      ) : item.attribute_code === "color" ? (
                                        <>
                                          {item.value !== "" && item.value !== null && item.value !== undefined ? (
                                            <>
                                              <span className="atri">Color: </span>
                                              <span className="text">{item.value}</span>
                                            </>
                                          ) : (
                                            ""
                                          )}
                                        </>
                                      ) : item.attribute_code === "category_gear" ? (
                                        <>
                                          {item.value !== "" && item.value !== null && item.value !== undefined ? (
                                            <>
                                              <span className="atri">Category Gear: </span>
                                              <span className="text">{item.value}</span>
                                            </>
                                          ) : (
                                            ""
                                          )}
                                        </>
                                      ) : item.attribute_code === "eco_collection" ? (
                                        <>
                                          {item.value !== "" && item.value !== null && item.value !== undefined ? (
                                            <>
                                              <span className="atri">Eco Collection: </span>
                                              <span className="text">{item.value}</span>
                                            </>
                                          ) : (
                                            ""
                                          )}
                                        </>
                                      ) : item.attribute_code === "performance_fabric" ? (
                                        <>
                                          {item.value !== "" && item.value !== null && item.value !== undefined ? (
                                            <>
                                              <span className="atri">Performance Fabric: </span>
                                              <span className="text">{item.value}</span>
                                            </>
                                          ) : (
                                            ""
                                          )}
                                        </>
                                      ) : item.attribute_code === "erin_recommends" ? (
                                        <>
                                          {item.value !== "" && item.value !== null && item.value !== undefined ? (
                                            <>
                                              <span className="atri">Erin Recommends: </span>
                                              <span className="text">{item.value}</span>
                                            </>
                                          ) : (
                                            ""
                                          )}
                                        </>
                                      ) : item.attribute_code === "new" ? (
                                        <>
                                          {item.value !== "" && item.value !== null && item.value !== undefined ? (
                                            <>
                                              <span className="atri">New: </span>
                                              <span className="text">{item.value}</span>
                                            </>
                                          ) : (
                                            ""
                                          )}
                                        </>
                                      ) : item.attribute_code === "sale" ? (
                                        <>
                                          {item.value !== "" && item.value !== null && item.value !== undefined ? (
                                            <>
                                              <span className="atri">Sale: </span>
                                              <span className="text">{item.value}</span>
                                            </>
                                          ) : (
                                            ""
                                          )}
                                        </>
                                      ) : item.attribute_code === "cost" ? (
                                        <>
                                          {item.value !== "" && item.value !== null && item.value !== undefined ? (
                                            <>
                                              <span className="atri">Cost: </span>
                                              <span className="text">{item.value}</span>
                                            </>
                                          ) : (
                                            ""
                                          )}
                                        </>
                                      ) : item.attribute_code === "gender" ? (
                                        <>
                                          {item.value !== "" && item.value !== null && item.value !== undefined ? (
                                            <>
                                              <span className="atri">Gender: </span>
                                              <span className="text">{item.value}</span>
                                            </>
                                          ) : (
                                            ""
                                          )}
                                        </>
                                      ) : item.attribute_code === "category_gear" ? (
                                        <>
                                          {item.value !== "" && item.value !== null && item.value !== undefined ? (
                                            <>
                                              <span className="atri">Category Gear: </span>
                                              <span className="text">{item.value}</span>
                                            </>
                                          ) : (
                                            ""
                                          )}
                                        </>
                                      ) : item.attribute_code === "style_bags" ? (
                                        <>
                                          {item.value !== "" && item.value !== null && item.value !== undefined ? (
                                            <>
                                              <span className="atri">Style Bags: </span>
                                              <span className="text">{item.value}</span>
                                            </>
                                          ) : (
                                            ""
                                          )}
                                        </>
                                      ) : (
                                        ""
                                      )}
                                    </span>
                                  );
                                })}
                              </span>
                            </div>
                            <div className="amount-product">
                              <span className="price">{item.prices.row_total.value}.00 $</span>
                              <InputNumber
                                min={1}
                                max={10}
                                defaultValue={item.quantity}
                                onChange={(value) => onChangeAmount(value, item.uid)}
                              />
                              <div className="remove" onClick={() => handleRemove(item.uid)}>
                                <Image src="/images/trash.png" preview={false} alt=""></Image>
                                Remove
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
              <div className="right-cart">
                <span className="title-order">Order Summary</span>
                {getCart?.data?.cart?.items?.length > 0 ? (
                  <div className="info-checkout">
                    <span className="info">
                      Subtotal:{" "}
                      {getCart?.data?.cart?.items?.length > 0 && (
                        <span className="text">{getCart?.data?.cart?.prices?.subtotal_excluding_tax?.value}.00 $</span>
                      )}
                    </span>
                    <span className="info">
                      Shipping Fee: <span className="text">Calculating at checkout</span>
                    </span>{" "}
                    <span className="info">
                      Customs:
                      <span className="text">Calculating at checkout</span>
                    </span>
                  </div>
                ) : (
                  <Skeleton.Button style={{ height: "70px", width: "100%" }}></Skeleton.Button>
                )}

                <button>Proceed to Checkout</button>
              </div>
            </div>
          ) : spin ? (
            <></>
          ) : (
            <div className="empty">
              <Image src="/images/empty-cart.webp" preview={false} alt=""></Image>
            </div>
          )}
        </div>
      </div>
      <Spin spinning={spin} fullscreen></Spin>
    </Page>
  );
};
export default Checkout;
