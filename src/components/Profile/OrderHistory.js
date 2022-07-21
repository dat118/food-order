import classes from "./OrderHistory.module.css";
import React from "react";

const OrderHistory = () => {
  const data = [
    {
      user: {
        userId: "5",
        name: "Nguyễn Tiến Danh",
        street: "Cau Nga Van Duong",
        postal: "33333",
        city: "Bac Ninh",
      },

      item: [
        { name: "burger", id: "1", amount: 2, price: "12.5" },
        { name: "pizza", id: "2", amount: 1, price: "12.5" },
      ],
    },
    {
      user: {
        userId: "5",
        name: "Nguyễn trinh vu",
        street: "Cau Nga Van Duong",
        postal: "33333",
        city: "Bac Ninh",
      },

      item: [
        { name: "burger", id: "1", amount: 2, price: "12.5" },
        { name: "pizza", id: "2", amount: 1, price: "12.5" },
      ],
    },
    {
      user: {
        userId: "5",
        name: "Nguyễn Tiến Danh",
        street: "Cau Nga Van Duong",
        postal: "33333",
        city: "Bac Ninh",
      },

      item: [
        { name: "burger", id: "1", amount: 2, price: "12.5" },
        { name: "pizza", id: "2", amount: 1, price: "12.5" },
      ],
    },
  ];
  return (
    <React.Fragment>
      {data.map((order) => (
        <div key={Math.random()} className={classes.order}>
          <h3>{order.user.name}</h3>
          {order.item.map((item) => (
            <li key={item.id} className={classes.meal}>
              <h3>{item.name}</h3>
              <div className={classes.price}>
                {item.amount} x {item.price}
              </div>
            </li>
          ))}
        </div>
      ))}
    </React.Fragment>
  );
};

export default OrderHistory;
