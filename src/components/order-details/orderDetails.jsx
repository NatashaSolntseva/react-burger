import doneImg from "../../image/doneImg.svg";

import styles from "./orderDetails.module.css";

import { useSelector } from "react-redux";

import Loader from "../loader/loader";

function OrderDetails() {
  const { orderId, isOrderInfoLoading, isOrderInfoRequestFaild } = useSelector(
    (store) => store.order
  );

  return (
    <>
      {isOrderInfoLoading && <Loader />}
      {!isOrderInfoLoading && !isOrderInfoRequestFaild && orderId && (
        <div className={`${styles.container} pt-30 pb-25`}>
          <div className="mb-8">
            <p className={`${styles.glow} text text_type_digits-large`}>
              {orderId.order.number}
            </p>
          </div>
          <p className="text text_type_main-medium">Идентификатор заказа</p>
          <img
            className={`${styles.icon} mb-15 mt-15`}
            alt="заказ принят"
            src={doneImg}
          />
          <p className="text text_type_main-default">
            Ваш заказ начали готовить
          </p>
          <div className="mt-2">
            <p className="text text_type_main-default text_color_inactive">
              Дождитесь готовности на орбитальной станции
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default OrderDetails;
