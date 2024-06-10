import { Badge, Dropdown, Image, Input } from "antd";
import { SearchProps } from "antd/es/input";
import { DownOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { getCartList } from "@/redux/reducers/cart";
import { fetchDataPosts } from "@/redux/reducers/post";

const { Search } = Input;

const langugage: MenuProps["items"] = [
  {
    label: <div>English</div>,
    key: "0",
  },
  {
    label: <div>Tiếng Việt</div>,
    key: "1",
  },
];

const account: MenuProps["items"] = [
  {
    label: <div style={{ fontWeight: "700" }}>Welcome</div>,
    key: "0",
  },
  {
    type: "divider",
  },
  {
    label: <div>Sign in</div>,
    key: "1",
  },
  {
    label: <div>Create an Account</div>,
    key: "2",
  },
  {
    label: <div>Your Orders</div>,
    key: "3",
  },
];

const country: MenuProps["items"] = [
  {
    label: (
      <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
        <Image width={25} height={16} src="/images/hongkong.png" preview={false} alt=""></Image>
        Hongkong
      </div>
    ),
    key: "0",
  },
  {
    label: (
      <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
        <Image width={25} height={16} src="/images/hongkong.png" preview={false} alt=""></Image>
        Indonesia
      </div>
    ),
    key: "1",
  },
  {
    label: (
      <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
        <Image width={25} height={16} src="/images/hongkong.png" preview={false} alt=""></Image>
        Japan
      </div>
    ),
    key: "2",
  },
  {
    label: (
      <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
        {" "}
        <Image width={25} height={16} src="/images/hongkong.png" preview={false} alt=""></Image>
        Malaysia
      </div>
    ),
    key: "3",
  },
  {
    label: (
      <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
        {" "}
        <Image width={25} height={16} src="/images/hongkong.png" preview={false} alt=""></Image>
        India
      </div>
    ),
    key: "4",
  },
  {
    label: (
      <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
        {" "}
        <Image width={25} height={16} src="/images/hongkong.png" preview={false} alt=""></Image>
        Mexico
      </div>
    ),
    key: "5",
  },
  {
    label: (
      <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
        {" "}
        <Image width={25} height={16} src="/images/hongkong.png" preview={false} alt=""></Image>
        Thailand
      </div>
    ),
    key: "6",
  },
];

const Header = ({ setSpin, setResult }: any) => {
  const { getCart, cart } = useSelector((state: RootState) => state.cart);
  const [cartQuantity, setCartQuantity] = useState<number>(0);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    const cartId = localStorage.getItem("cartId");
    if (cartId !== null) {
      dispatch(getCartList({ cartId, setSpin }));
    }
  }, []);

  useEffect(() => {
    if (getCart?.data?.cart?.total_quantity !== undefined) {
      setCartQuantity(getCart.data.cart.total_quantity);
    }
  }, [getCart]);

  useEffect(() => {
    if (cart?.data?.addProductsToCart?.cart?.total_quantity !== undefined) {
      setCartQuantity(cart.data.addProductsToCart.cart.total_quantity);
    }
  }, [cart]);

  const onSearch: SearchProps["onSearch"] = (value, _e) => {
    setSpin(true);
    dispatch(fetchDataPosts({ search: value, pageSize: "10", currentPage: 1, setSpin, setResult }));
  };

  return (
    <header>
      <div className="left">
        <Link href="/">
          <Image src="/images/logo.png" alt="" preview={false}></Image>
        </Link>
        <Search placeholder="Search engine for products, categories" onSearch={onSearch} style={{ width: 300 }} />
      </div>
      <div className="right">
        <Dropdown menu={{ items: country }} trigger={["click"]}>
          <div className="delivery">
            <Image src="/images/delivery.svg" alt="" preview={false}></Image>
            <span className="text">Delivery: </span>
            <span className="country text">Vietnam</span>
            <DownOutlined />
          </div>
        </Dropdown>
        <Dropdown menu={{ items: langugage }} trigger={["click"]}>
          <div onClick={(e) => e.preventDefault()} className="language">
            <Image src="/images/language.svg" alt="" preview={false}></Image>
            <span className="text">English</span>
            <DownOutlined />
          </div>
        </Dropdown>
        <Dropdown menu={{ items: account }} trigger={["click"]}>
          <div className="account">
            <Image src="/images/user.svg" alt="" preview={false}></Image>
            <span className="text">Account</span> <DownOutlined />
          </div>
        </Dropdown>
        <a href="/checkout">
          <div className="cart">
            <Badge count={cartQuantity} offset={[4, -2]}>
              <Image src="/images/cart-img.svg" alt="" preview={false}></Image>
            </Badge>
          </div>
        </a>
      </div>
    </header>
  );
};
export default Header;
