import classes from "./OrderHistory.module.css";
import React from "react";
import useHttp from "../../hooks/use-http";
import { apiUrl } from "../../contexts/constants";
const userId = localStorage.getItem("userId");
const OrderHistory = () => {
  const [orders, setOrders] = React.useState([]);
  const { sentRequest: fetchOrder } = useHttp();

  React.useEffect(() => {
    
    fetchOrder({ url: `${apiUrl}/order/${userId}` }, ordersShowHandler);
    
  }, []);
  const ordersShowHandler = (data) => {
    setOrders(data);
  };
  console.log(orders);
  const orderList = orders.map((order) => (
    <div key={order.user.order_id} className={classes.order}>
      <h3>{order.user.name}</h3>
      {order.items.map((item) => (
        <li key={Math.random()} className={classes.meal}>
          <h3>{item.name}</h3>
          <div className={classes.price}>
            {item.amount} x ${item.price}
          </div>
        </li>
      ))}
    </div>
  ));

  return <React.Fragment>{orderList}</React.Fragment>;
};

export default OrderHistory;
