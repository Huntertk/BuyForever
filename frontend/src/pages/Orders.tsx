import { useEffect } from "react";
import Loader from "../components/Loader";
import { useGetMyOrdersQuery } from "../redux/api/orderApi";
import '../styles/order.scss';
import { useAppDispatch } from "../redux/hooks";
import { clearCart } from "../redux/features/cartSlice";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";
const Orders = () => {
  const {isLoading:getOrdersLoading, data:getOrdersData, error:getOrdersError} = useGetMyOrdersQuery({});
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
   
  const dispatch = useAppDispatch();


  useEffect(() => {
    if(queryParams.get('success') == "true"){
      dispatch(clearCart())
    }
    if(getOrdersError){
      if ('data' in getOrdersError) {
        toast.error(`${getOrdersError.data}`);
      }
    }
  }, [getOrdersError]) 

  if(getOrdersLoading){
    return <Loader />
  }
  
  return (
    <div className="orders_main_container">
      <h1>My Orders</h1>
      <div className="orders_list_container">
        {
          getOrdersData ? getOrdersData.map((order, index) => (
            <div className="order_details_container" key={order._id}>
              <span>{index+1}</span>
              <p>Order ID : {order._id}</p>
              {
                order.orderItems.map((orderItem) => (
                  <div className="order_item_container" key={orderItem.productId}>
                    <img src={orderItem.image} alt={orderItem.title} />
                    <div className="order_details_content_container">
                      <h3>{orderItem.title}</h3>
                      <p>Quantity: {orderItem.quantity}</p>
                      <p>Item Price: ${orderItem.price}</p>
                    </div>
                  </div>
                ))
              }
              <div className="order_total_container">
              <table>
                <thead>
                  <tr>
                    <th>Shipping Amount</th>
                    <th>Total Amount</th>
                    <th>Payment Method</th>
                    <th>Order Status</th>
                    <th>Payment Status</th>
                  </tr>
                </thead>
              <tbody>
                <tr>
                  <td>${order.shippingAmount}</td>
                  <td>${order.totalAmount}</td>
                  <td>{order.paymentMethod}</td>
                  <td>{order.orderStatus}</td>
                  <td>{order.paymentStatus}</td>
                </tr>
              </tbody>
            </table>
              </div>
            </div>
          )) : (
            <h1>No Orders Found</h1>
          )
        }
        
      </div>
    </div>
  )
}

export default Orders