function OrderItem({ quantity, showProductDetails, product }) {
  return (
    <>
      <div
        style={{
          width: 300,
          backgroundColor: "#87CEFA",
          cursor: "pointer",
          margin: "8px 0",
        }}
        onClick={() => {
          showProductDetails(product);
        }}
      >
        <div>
          {quantity} {"  x"} {product.name}
          {".... Php"} {product.price * quantity}
        </div>
      </div>
    </>
  );
}

export default OrderItem;
