import client from "./client";

const order_currency = "BTC";
const payment_currency = "KRW";

// READ API
export const getData = async () => {
  try {
    const response = await client
      .get(`/${order_currency}_${payment_currency}`)
      .then((res) => res.data)
      // .then((res) => res.json())
      .catch((error) => console.error("Failed loaded data", error));
    return response.data;
  } catch (e) {
    console.error(e);
  }
};
