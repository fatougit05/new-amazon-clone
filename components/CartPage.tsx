import { useEffect, useState } from "react";
import { StoreItems } from "@/type";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import {
  decreaseQuntity,
  deleteItem,
  increaseQuantity,
  resetCart,
} from "@/redux/nextSlice";
import FormattedPrice from "./FormattedPrice";
import toast, { Toaster } from "react-hot-toast";
import { loadStripe } from "@stripe/stripe-js";
import { useSession } from "next-auth/react";
const CartPage = () => {
  const dispatch = useDispatch();
  const productData = useSelector((state: any) => state.nextamazon.productData);
  const userInfo = useSelector((state: any) => state.nextamazon.userInfo);
  const [totalAmt, setTotalAmt] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

const {data : session} = useSession()
  useEffect(() => {
    let amt = 0;
    let items = 0;
    productData.map((item: StoreItems) => {
      amt += item.price * item.quantity;
      items += item.quantity;
      return;
    });
    setTotalAmt(amt);
    setTotalItems(items);
  }, [productData]);

  //function that creates checkout
const handleCheckout = async () => {
    const stripe = await stripePromise 

    //making the backend session
const response = await fetch("/api/checkout-session", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body:JSON.stringify({
        items: productData,
        email: session?.user?.email,
    })
    
})
   const checkoutSession = await response.json() 

   //redirecting the user to the stripe checkout

   const result: any = await stripe?.redirectToCheckout({
    sessionId: checkoutSession.id,
   })

   if(result?.error) alert(result?.error.message)
}
  // Creating the chekout  session

  return (
    <div className="w-full bg-[#E3E6E6] p-4">
      <div className="flex gap-4 bg-transparent">
        <div className="w-4/5 p-6 bg-white rounded-sm">
          <div className="py-1 border-b-[1px] border-b-gray-300">
            <h1 className="text-3xl font-semibold text-black">Shopping Cart</h1>
            <button
              onClick={() => dispatch(resetCart())}
              className="text-sm text-[#007185] font-medium decoration-transparent hover:decoration-[#C7511F] hover:underline underline-offset-2 hover:text-[#C7511F] duration-300"
            >
              Delete all items
            </button>
          </div>
          {productData.map((item: StoreItems) => (
            <div
              key={item._id}
              className="w-full border-b-[1px] border-gray-300 py-4 flex items-center gap-6"
            >
              <div className="w-1/5">
                <Image
                  src={item.image}
                  alt="productImg"
                  width={500}
                  height={500}
                />
              </div>
              <div className="flex flex-col w-3/5 gap-2 text-sm">
                <h2 className="text-sm font-medium">{item.description}</h2>
                <p>
                  Brand: <span className="font-medium">{item.brand}</span>
                </p>
                <p>
                  Category: <span className="font-medium">{item.category}</span>
                </p>
                <div className="flex items-center gap-4">
                  <div className="bg-[#F0F2F2] flex justify-center items-center gap-2 w-36 py-1 text-center drop-shadow-lg rounded-md">
                    <p className="text-base font-normal">Qty:</p>
                    <button
                      onClick={() =>
                        dispatch(
                          decreaseQuntity({
                            _id: item._id,
                            title: item.title,
                            description: item.description,
                            price: item.price,
                            quantity: 1,
                            brand: item.brand,
                            category: item.category,
                            isNew: item.isNew,
                            image: item.image,
                          })
                        )
                      }
                      className="px-2 font-semibold duration-300 bg-gray-200 rounded-sm cursor-pointer hover:bg-gray-400"
                    >
                      -
                    </button>
                    <p className="text-base font-semibold font-titleFont text-amazon_blue">
                      {item.quantity}
                    </p>
                    <button
                      onClick={() =>
                        dispatch(
                          increaseQuantity({
                            _id: item._id,
                            title: item.title,
                            description: item.description,
                            price: item.price,
                            quantity: 1,
                            brand: item.brand,
                            category: item.category,
                            isNew: item.isNew,
                            image: item.image,
                          })
                        )
                      }
                      className="px-2 font-semibold duration-300 bg-gray-200 rounded-sm cursor-pointer hover:bg-gray-400"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() =>
                      dispatch(deleteItem(item._id)) &&
                      toast.error(
                        `${item.title.substring(0, 12)} is deleted from cart`
                      )
                    }
                    className="text-sm text-[#007185] font-medium decoration-transparent hover:decoration-[#C7511F] hover:underline underline-offset-2 hover:text-[#C7511F] duration-300"
                  >
                    Delete
                  </button>
                </div>
              </div>
              <div className="w-1/5">
                <p className="text-lg font-semibold text-right">
                  ${item.price}
                </p>
              </div>
            </div>
          ))}
          <p className="flex items-center justify-end gap-1 font-medium text-right">
            Subtotal ({totalItems} items):{" "}
            <span className="font-semibold">
              <FormattedPrice amount={totalAmt} />
            </span>
          </p>
        </div>
        <div className="flex flex-col justify-center w-1/5 gap-4 p-6 bg-white rounded-sm h-44">
          <h2 className="flex items-center gap-1 text-base font-medium">
            Subtotal (3 items):{" "}
            <span className="text-lg font-semibold">
              <FormattedPrice amount={totalAmt} />
            </span>
          </h2>
          <div className="flex items-center gap-1 -mt-4 text-sm">
            <input type="checkbox" />
            <p>This order contains a gift</p>
          </div>
          {userInfo ? (
            <button
            onClick={handleCheckout}
            className="w-full h-9 cursor-pointer outline-none rounded-md text-sm font-medium bg-[#FFD814] shadow-btnShadow hover:bg-[#F7CA00] duration-300">
              Proceed to checkout
            </button>
          ) : (
            <button className="w-full text-sm font-medium duration-300 rounded-md cursor-not-allowed h-9 bg-zinc-300 shadow-btnShadow">
              Proceed to checkout
            </button>
          )}
        </div>
      </div>
      <Toaster
        reverseOrder={false}
        position="top-center"
        toastOptions={{
          style: {
            borderRadius: "8px",
            background: "#333",
            color: "#fff",
          },
        }}
      />
    </div>
  );
};

export default CartPage;