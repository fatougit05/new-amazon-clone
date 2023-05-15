import { Items } from "@/type";
import Image from "next/image";
import StarRateIcon from "@mui/icons-material/StarRate";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/nextSlice";
import toast, { Toaster } from "react-hot-toast";

const ProductData = ({ products }: any) => {
  const dispatch = useDispatch();
  return (
    <div className="grid grid-flow-row-dense grid-cols-2 mx-auto md: lg:grid-cols-3 xl:grid-cols-4">
      {products.map((item: Items) => (
        <div
          key={item._id}
          className="bg-zinc-50 h-auto border-[1px] border-gray-200 py-6 z-30 shadow-none duration-200 relative flex flex-col mdl:flex-row gap-6 items-center px-6"
        >
          <div className="object-cover w-full h-full p-6 bg-gray-100 rounded-md mdl:w-1/4">
            <Image
              className="w-full h-auto object-fit"
              src={item.image}
              alt="ProductImg"
              width={500}
              height={500}
            />
          </div>
          <div className="flex flex-col w-full gap-2 mdl:w-3/4">
            <p className="flex items-center gap-1 text-xs font-semibold text-gray-400">
              {item.isNew && "Sponsored"}
              <span className="w-3.5 h-3.5 rounded-full bg-gray-400 inline-flex items-center justify-center font-bold text-center text-white text-[8px]">
                i
              </span>
            </p>
            <h1 className="font-semibold text-xl text-footerBottom hover:text-[#C7511F] duration-200">
              {item.title}
            </h1>
            <p className="text-xs">
              Brand: <span className="font-medium">{item.brand}</span>
            </p>
            <p className="text-xs">
              Category: <span className="font-medium">{item.category}</span>
            </p>
            <div className="flex items-center gap-1 text-xs">
              <div>
                <StarRateIcon className="w-4 h-4 text-yellow-500" />
                <StarRateIcon className="w-4 h-4 text-yellow-500" />
                <StarRateIcon className="w-4 h-4 text-yellow-500" />
                <StarRateIcon className="w-4 h-4 text-yellow-500" />
                <StarRateIcon className="w-4 h-4 text-yellow-500" />
              </div>
              <p className="mt-1 font-semibold">25</p>
            </div>
            <p className="text-xs font-medium text-gray-600 hover:text-[#C7511F] duration-200">
              {item.description}
            </p>
            <div className="flex items-center gap-4">
              <p className="text-xl font-semibold">${item.price}</p>
              <p className="text-base line-through decoration-[1px] decoration-gray-500 text-gray-500 font-medium">
                ${item.oldPrice}
              </p>
            </div>
            <div className="flex flex-col gap-3 mt-2">
              <button
                onClick={() =>
                  dispatch(
                    addToCart({
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
                  ) &&
                  toast.success(
                    `${item.title.substring(0, 15)} is added to cart`
                  )
                }
                className="w-60 h-9 rounded-full text-base font-semibold bg-[#FFD814] shadow-btnShadow hover:bg-[#F7CA00] duration-300"
              >
                Add to Cart
              </button>
              <button className="w-60 h-9 rounded-full text-base font-semibold bg-[#FFA41C] shadow-btnShadow hover:bg-[#FA8900] duration-300">
                Buy Now
              </button>
            </div>
          </div>
        </div>
      ))}
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

export default ProductData;
