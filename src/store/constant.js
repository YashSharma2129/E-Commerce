const ProductConstant = {
  title: "",
  description: "",
  quantity: "",
  price: "",
};

const ShoppingCartConstant = {
  title: "",
  description: "",
  selectedQuantity: 0,
  stockQuantity: 0,
  eachPrice: 0,
  totalPrice: 0,
};

const UserConstant = {
  fname: "",
  lname: "",
  email: "",
  secret: "",
};

const LoginConstant = {
  email: "",
  secret: "",
};

const OrderConstant = {
  orderId: "",
  userId: "",
  items: [],
  totalAmount: 0,
  orderDate: "",
};

export { ProductConstant, ShoppingCartConstant, UserConstant, LoginConstant, OrderConstant };
