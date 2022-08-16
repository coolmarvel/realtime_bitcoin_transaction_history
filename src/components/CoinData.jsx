import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import "./CoinData.css";
import { getDataAsync } from "../redux/coinReducer";
import useInterval from "../utils/useInterval";

const CoinData = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { coinData } = useSelector((state) => state.coinReducer);

  const [delay, setDelay] = useState(5000);

  useInterval(() => {
    // Your custom logic here
    dispatch(getDataAsync());
  }, delay);

  function handleDelayChange(e) {
    setDelay(Number(e.target.value));
  }

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        dispatch(getDataAsync());
        setLoading(false);
      } catch (e) {
        console.error(e);
      }
    };
    fetchData();
  }, []);

  const order_currency = "BTC";
  const payment_currency = "KRW";
  // const API = `https://api.bithumb.com/public/transaction_history/`;

  // const { isLoading, error, data, isFetching } = useQuery(
  //   [order_currency, payment_currency],
  //   () =>
  //     fetch(API + `/${order_currency}_${payment_currency}`)
  //       .then((res) => res.json())
  //       .then((res) => res.data),
  //   { refetchInterval: 1000 } // 1초마다 갱신
  // );

  // if (isLoading) {
  //   return <h1>로딩중!</h1>;
  // }
  // if (error) {
  //   return <h1>에러 발생!</h1>;
  // }

  return (
    <div id="container">
      <h1>실시간 BTC-KRW 거래 데이터</h1>

      <input value={delay} onChange={handleDelayChange} readOnly={true} />

      <div id="datas">
        {coinData.map((v, i) => {
          return (
            <div className="data" key={i}>
              <h1>거래 일시 : {v.transaction_date}</h1>
              <h2>{v.type === "bid" ? "입찰" : "요청"}</h2>
              <h2>현재 가격 : {v.price + " " + payment_currency}</h2>
              <h2>거래 수량 : {v.units_traded + " " + order_currency}</h2>
              <h2>거래 금액 : {v.total + " " + payment_currency}</h2>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CoinData;
