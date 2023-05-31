import React, { createContext, useContext, useState } from "react";
import { Form, Alert } from "react-bootstrap";
import { pixelTrackRegister } from "../../fb-pixel";
import { useForm } from "@formspree/react";
import { useIntl } from "react-intl";
import moment from "moment";

const OrderContext = createContext({});

export const OrderProvider = ({
  product,
  faculties,
  paymentFrequencies,
  locale,
  children,
}) => {
  const intl = useIntl();
  const [formState, handleSubmit] = useForm("register");
  const [faculty, setFaculty] = useState("");

  const [biology, setBiology] = useState(true);
  const [chemistry, setChemistry] = useState(true);
  const [physics, setPhysics] = useState(false);
  const [tsp, setTsp] = useState(false);
  const [consent, setConsent] = useState(false);
  const [paymentFrequency, setPaymentFrequency] = useState(false);
  const [codeDiscount, setCodeDiscount] = useState(false);
  const [variation, setVariation] = useState("");

  const courses = biology + chemistry + physics + tsp;

  const priceStyle = {
    style: "currency",
    currency: locale === "sk" ? "EUR" : "CZK",
    maximumFractionDigits: 0,
  };
  const isFullCourse = product.action === "BuyCourse";
  const priceIndex = courses ? courses - 1 : 0;

  let price, discount;
  if (product.price.length > 0) {
    if (isFullCourse) {
      price = courses > 0 ? product.price[priceIndex].price : 0;
      discount = courses > 0 ? product.price[priceIndex].discount : 0;
    } else {
      price = product.price[0].price;
      discount = product.price[0].discount;
    }

    if (codeDiscount) {
      const cd = Math.round(0.1 * price);
      price = price - cd;
      discount = discount + cd;
    }
  } else {
    price = discount = 0;
  }

  const formattedPrice = intl.formatNumber(price, priceStyle);
  const formattedDiscountAmount =
    discount > 0 ? intl.formatNumber(discount, priceStyle) : "";
  const formattedDiscount =
    discount > 0
      ? intl.formatMessage({ id: "register.discount" }) +
        "<em>" +
        formattedDiscountAmount +
        "</em>"
      : "";
  const formattedOldPrice =
    discount > 0 ? intl.formatNumber(discount + price, priceStyle) : "";

  const formDisabled =
    product.registerStart &&
    product.registerEnd &&
    (moment.now() < moment(product.registerStart) ||
      moment.now() > moment(product.registerEnd));

  const displayFaculties = product.product_variation
    ? product.product_variation
        .filter((pv) => (pv.showOn || []).includes(locale))
        .map((pv) => pv.faculty)
        .sort((a, b) => a.title.localeCompare(b.title))
    : faculties.edges.map((item) => ({
        title: item.node.title,
        country: item.node.country,
      })) || [];

  const onSubmit = (event) => {
    pixelTrackRegister();
    handleSubmit(event);
    typeof window !== "undefined" &&
      window.gtag("event", "conversion", {
        send_to: "AW-946042791/tAtvCJfYv8gDEKfvjcMD",
        value: price.toString(),
        currency: locale === "sk" ? "EUR" : "CZK",
      });
  };

  return (
    <OrderContext.Provider
      value={{
        intl,
        product,
        displayFaculties,
        paymentFrequencies,
        locale,
        courses,

        formState,
        formDisabled,
        isFullCourse,

        faculty,
        setFaculty,
        biology,
        setBiology,
        chemistry,
        setChemistry,
        physics,
        setPhysics,
        tsp,
        setTsp,
        consent,
        setConsent,
        paymentFrequency,
        setPaymentFrequency,
        codeDiscount,
        setCodeDiscount,
        variation,
        setVariation,

        price,
        priceStyle,
        formattedPrice,
        formattedDiscountAmount,
        formattedDiscount,
        formattedOldPrice,
      }}
    >
      <Form onSubmit={onSubmit}>
        <input type="hidden" name="_language" value={locale} />
        <input type="text" name="_gotcha" style={{ display: "none" }} />

        <input type="hidden" name="product" value={product.title} />

        {formState.errors.map((error, index) => {
          return (
            <Alert key={index} variant="danger">
              {error.field} {error.message}
            </Alert>
          );
        })}

        {children}
      </Form>
    </OrderContext.Provider>
  );
};

export const useOrder = () => useContext(OrderContext);

export default OrderContext;
