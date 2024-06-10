import { fetchDataPosts } from "@/redux/reducers/post";
import Page from "../layout/Page";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";
import { Dropdown, Image, MenuProps, Modal, Pagination, Spin } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";

const langugage: MenuProps["items"] = [
  {
    label: <div>Newest Arrivals</div>,
    key: "0",
  },
  {
    label: <div>Price: Low to High</div>,
    key: "1",
  },
  {
    label: <div>Price: High to Low</div>,
    key: "2",
  },
  {
    label: <div>Price: Top Rated</div>,
    key: "3",
  },
];

const Home = () => {
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();
  const { posts } = useSelector((state: RootState) => state.post);
  const [result, setResult] = useState("");
  const [spin, setSpin] = useState(true);
  const [current, setCurrent] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    dispatch(fetchDataPosts({ search: "", pageSize: "8", currentPage: current, setSpin }));
  }, [current]);

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onChangePage = (page: number) => {
    setSpin(true);
    setCurrent(page);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const viewCart = () => {
    router.push("/checkout");
  };

  return (
    <Page setSpin={setSpin} setResult={setResult} title="Home">
      <div className="home-wrapper">
        <div className="search-sort">
          <span className="result">Results for - {result === "" ? "All" : result}</span>
          <span className="sort">
            <b>Sort by </b>
            <span className="line">|</span>
            <Dropdown menu={{ items: langugage }} trigger={["click"]}>
              <span className="featured">
                Featured <DownOutlined />
              </span>
            </Dropdown>
          </span>
        </div>
        <div className="products-wrapper">
          {posts?.data?.products?.items?.length > 0 &&
            posts?.data?.products?.items?.map(
              (
                item: {
                  sku: string;
                  uid: string;
                  description: string;
                  rating_summary_start: any;
                  stock_status: string;
                  price_range: {
                    maximum_price: {
                      final_price: {
                        value: number;
                      };
                    };
                  };
                  review_count: number;
                  name: string;
                  image: { url: string };
                },
                index: number
              ) => {
                const totalRatings =
                  item.rating_summary_start.star_1 +
                  item.rating_summary_start.star_2 +
                  item.rating_summary_start.star_3 +
                  item.rating_summary_start.star_4 +
                  item.rating_summary_start.star_5;
                const totalScore =
                  item.rating_summary_start.star_1 * 1 +
                  item.rating_summary_start.star_2 * 2 +
                  item.rating_summary_start.star_3 * 3 +
                  item.rating_summary_start.star_4 * 4 +
                  item.rating_summary_start.star_5 * 5;
                const averageRating = totalRatings === 0 ? 0 : totalScore / totalRatings;

                return (
                  <ProductCard
                    setIsModalOpen={setIsModalOpen}
                    setSpin={setSpin}
                    image={item.image.url}
                    id={item.uid}
                    sku={item.sku}
                    key={index}
                    title={item.name}
                    rate={averageRating}
                    review={item.review_count}
                    price={item.price_range.maximum_price.final_price.value}
                    status={item.stock_status}
                  ></ProductCard>
                );
              }
            )}
        </div>
        {posts?.data?.products?.items?.length > 0 && (
          <Pagination current={current} pageSize={8} onChange={onChangePage} total={posts?.data?.products?.page_info?.total_pages * 8} />
        )}
      </div>
      <Modal title="" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} style={{ top: 300 }} footer={null} className="add-modal">
        <Image src="/images/add.png" preview={false} alt=""></Image>
        <span className="description">Product has been added in your cart successfully.</span>
        <div style={{ display: "flex", gap: "5px" }}>
          <button onClick={handleCancel}>Continue Shopping</button> <button onClick={viewCart}>View Cart & Checkout</button>
        </div>
      </Modal>
      <Spin spinning={spin} fullscreen></Spin>
    </Page>
  );
};
export default Home;
