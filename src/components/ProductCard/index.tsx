import { addProductToCart, createCart } from "@/redux/reducers/cart";
import { AppDispatch, RootState } from "@/redux/store";
import { Image, Rate } from "antd";
import { Dispatch, SetStateAction } from "react";
import { useDispatch, useSelector } from "react-redux";

interface ProductCardProps {
  image: string;
  title: string;
  rate: number;
  review: number;
  price: number;
  status: string;
  id: string;
  sku: string;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  setSpin: Dispatch<SetStateAction<boolean>>;
}
const ProductCard = ({ image, title, rate, review, price, status, setIsModalOpen, sku, setSpin }: ProductCardProps) => {
  const { cart } = useSelector((state: RootState) => state.cart);
  const dispatch: AppDispatch = useDispatch();

  const handleAddCart = () => {
    setSpin(true);
    const cartId = localStorage.getItem("cartId");
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    if (cartId === null && cart.length === 0) {
      dispatch(createCart({ sku, setSpin, setIsModalOpen }));
    } else {
      dispatch(addProductToCart({ cartId: cartId, sku, setSpin, setIsModalOpen }));
    }
  };

  return (
    <div className="product-card">
      <Image className="product-img" src={image} alt="" preview={false}></Image>
      <div className="top">
        <span className="status">{status === "IN_STOCK" ? "In stock" : "Not in stock"}</span>
        <span className="title">{title}</span>
      </div>

      <div className="rating">
        <Rate allowHalf disabled defaultValue={rate} />
        <span className="comment">{review !== 0 ? `${review} comments` : ""}</span>
      </div>
      <div className="bottom">
        <span className="price">{price}$</span>
        <button onClick={handleAddCart}>Add to cart</button>
      </div>
    </div>
  );
};
export default ProductCard;
