import { fetchData } from "@/services/data";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface IState {
  posts: any;
}

export const fetchDataPosts = createAsyncThunk("/get-posts", async (arg: any) => {
  const { search, pageSize, currentPage, setSpin, setResult } = arg;
  const postData = {
    query:
      "query getProducts($search: String, $filter: ProductAttributeFilterInput, $pageSize: Int, $currentPage: Int) { products(search: $search, filter: $filter, pageSize: $pageSize, currentPage: $currentPage) { sort_fields { default options { label value } } items { __typename sku uid name url_key url_suffix canonical_url stock_status meta_description meta_keyword meta_title new_from_date new_to_date description { html } rating_summary review_count short_description { html } thumbnail { url position } image { url } price_range { __typename maximum_price { discount { amount_off percent_off } final_price { currency value } regular_price { currency value } } } color size rating_summary_start { star_1 star_2 star_3 star_4 star_5 } attributes { attribute_code label value } } total_count page_info { current_page page_size total_pages } } }",
    variables: {
      search: search,
      filter: {
        category_uid: {
          eq: "OA==",
        },
      },
      pageSize: pageSize,
      currentPage: currentPage,
    },
  };
  const res = await fetchData(postData);
  if (res.status === 200) {
    setSpin(false);
    if (setResult) {
      setResult(search);
    }
  }
  return res?.data;
});
const initialState: IState = {
  posts: [],
};

const slicer = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchDataPosts.fulfilled, (state, action: any) => {
      state.posts = action.payload;
    });
  },
});

export default slicer.reducer;
