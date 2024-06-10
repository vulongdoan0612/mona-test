import { store } from "@/redux/store";
import "@/styles/global.scss";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ToastContainer />
      <Component {...pageProps} />
    </Provider>
  );
}
