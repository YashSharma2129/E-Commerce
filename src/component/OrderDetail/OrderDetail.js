import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Container, Button } from "../UI/CommonStyle.js";
import Card from "../UI/Card.js";
import Spinner from "../UI/Spinner.js";

export default function OrderDetail() {
  const [loading, setLoading] = useState(false);
  const [orderDetail, setOrderDetail] = useState("");

  const params = useParams();
  const id = params.id;

  const fetchData = async (id) => {
    try {
      const result = await fetch("/api/order/" + id).then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("not able to fetch data correctly");
        }
      });
      setOrderDetail(result);
    } catch (e) {
      alert("Something goes wrong, please check!");
      console.log(e.message);
    }
  };

  useEffect(() => {
    setLoading(true);
    let isMounted = true;
    const loadData = async () => {
      await fetchData(id);
      if (isMounted) {
        setLoading(false);
        isMounted = false;
      }
    };
    loadData();
  }, [id]);

  // useEffect(() => {
  //   console.log(orderDetail);
  // }, [orderDetail]);

  const timeFormatting = (time) => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
    const DateInfo = new Date(time);
    const formattedDate = DateInfo.toLocaleDateString("en-US", options);
    return formattedDate;
  };

  return (
    <React.Fragment>
      <Container>
        {orderDetail ? (
          <div>
            <h2 style={{ marginBottom: "30px", textAlign: "center" }}>
              You are viewing the order made by{" "}
              <span style={{ fontSize: "30px", margin: "10px" }}>
                <i>{orderDetail.createdBy.firstName}</i>
              </span>
            </h2>
            <Card>
              <div style={{ textAlign: "center", lineHeight: "30px" }}>
                <h3 style={{ color: "blue" }}>Buyer Information:</h3>
                <h4>First Name: {orderDetail.createdBy.firstName}</h4>
                <h4>Last Name: {orderDetail.createdBy.lastName}</h4>
                <h4>Email: {orderDetail.createdBy.email}</h4>
              </div>
              <div
                style={{
                  marginTop: "30px",
                  textAlign: "center",
                  lineHeight: "30px",
                }}
              >
                <h3 style={{ color: "blue" }}>Order Information:</h3>
                <h4>Order Placed:</h4>
                <p>{timeFormatting(orderDetail.createdAt)}</p>
                <h4>Total Amount Spent:</h4>
                <p>${orderDetail.total}</p>

                <div
                  style={{
                    marginTop: "30px",
                    textAlign: "center",
                    lineHeight: "30px",
                  }}
                >
                  <h3 style={{ color: "blue" }}>Order details:</h3>
                  <table
                    style={{
                      marginTop: "10px",
                      marginLeft: "20%",
                      width: "60%",
                      border: "1px solid #dddddd",
                    }}
                  >
                    <thead>
                      <tr>
                        <th style={{ border: "1px solid #dddddd" }}>Title</th>
                        <th style={{ border: "1px solid #dddddd" }}>
                          Quantity
                        </th>
                        <th style={{ border: "1px solid #dddddd" }}>
                          Unit Price
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {orderDetail.order.map((order, index) => {
                        return (
                          <tr key={index}>
                            <td style={{ border: "1px solid #dddddd" }}>
                              {order.title}
                            </td>
                            <td style={{ border: "1px solid #dddddd" }}>
                              {order.quantity}
                            </td>
                            <td style={{ border: "1px solid #dddddd" }}>
                              ${order.price}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </Card>
          </div>
        ) : (
          "something goes wrong"
        )}

        {loading && <Spinner />}
        <Button
          style={{ marginTop: "30px", width: "20%" }}
          onClick={() => (window.location = "/user")}
        >
          View All User Information
        </Button>
        <Link to="/" style={{ marginTop: "30px" }}>
          Go to Home Page
        </Link>
      </Container>
    </React.Fragment>
  );
}
