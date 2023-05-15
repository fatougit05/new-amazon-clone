import React, { useEffect } from "react";
import Image from "next/image";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchIcon from "@mui/icons-material/Search";
import { logo } from "../public/assets/index";
import { useSelector } from "react-redux";
import Link from "next/link";
import HeaderBottom from "./HeaderBottom";
import {useSession, signIn, signOut} from "next-auth/react"
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "@/redux/nextSlice";

const Header = () => {
  const productData = useSelector((state: any) => state.nextamazon.productData);
  const userInfo = useSelector((state: any) => state.nextamazon.userInfo);
  const dispatch = useDispatch()
  const {data : session} = useSession()
  
  useEffect(() => {
    if(session) {
        dispatch(
            addUser({
            name: session.user?.name,
            email: session.user?.email,
            image: session.user?.image,
        }))
        
    } else {
        dispatch(removeUser())
    }
  },[session, dispatch])
  return (
    <div className="sticky top-0 z-50 w-full text-white amazon_blue">
      <div className="flex items-center gap-2 px-4 py-3 mx-auto max-w-container md:justify-between md:gap-4 lgl:gap-2 xl:gap-4">
        {/* ============= Image Start here =========== */}
        <Link href="/">
          <div className="headerHover">
            <Image className="w- mt-2" src={logo} alt="logoImage" />
          </div>
        </Link>
        {/* ============= Image End here ============= */}
        {/* ============= Deliver Start here ========= */}
        <div className="hidden lgl:inline-flex headerHover">
          <LocationOnOutlinedIcon />
          <p className="flex flex-col text-xs font-light text-lightText">
            Deliver to
            <span className="-mt-1 text-sm font-semibold text-whiteText">
              Oman
            </span>
          </p>
        </div>
        {/* ============= Deliver End here =========== */}
        {/* ============= Searchbar Start here ======= */}
        <div className="relative flex-grow hidden h-10 rounded-md mdl:inline-flex">
          <div className="flex items-center justify-center h-full text-sm duration-300 bg-gray-200 border-2 cursor-pointer w-14 hover:bg-gray-300 text-amazon_blue font-titleFont rounded-tl-md rounded-bl-md">
            All{" "}
            <span>
              <ArrowDropDownOutlinedIcon />
            </span>
          </div>

          <input
            className="flex-grow h-full px-2 text-base border-none outline-none text-amazon_blue"
            type="text"
          />
          <div className="w-12 h-full flex items-center justify-center bg-amazon_yellow hover:bg-[#f3a847] duration-300 text-amazon_blue cursor-pointer rounded-tr-md rounded-br-md">
            <SearchIcon />
          </div>
        </div>
        {/* ============= Searchbar End here ========= */}
        {/* ============= SignIn Start here=========== */}
        {userInfo ? (
          <div onClick={() => signOut()} className="flex items-center gap-2 cursor-pointer headerHover">
            <Image
              width={500}
              height={500}
              className="object-cover w-10 rounded-full"
              src={userInfo.image}
              alt="userImage"
            />
            <div>
              <p className="text-xs">Sign Out</p>
              <h2 className="-mt-1 text-base font-semibold">{userInfo.name}</h2>
            </div>
          </div>
        ) : (
          <div onClick={() => signIn()} className="flex flex-col items-start justify-center headerHover">
            <div>
              <p className="text-xs font-normal text-white">Hello, sign in</p>
              <p className="flex -mt-1 text-sm font-semibold text-whiteText">
                Accounts & Lists
                <span>
                  <ArrowDropDownOutlinedIcon />
                </span>
              </p>
            </div>
          </div>
        )}

        {/* ============= SignIn End here ============ */}
        {/* ============= Return Start here ========== */}
        <div className="flex-col items-start justify-center hidden mdl:flex headerHover">
          <p className="text-xs font-normal text-white">Returns</p>
          <p className="-mt-1 text-sm font-semibold text-whiteText">& Orders</p>
        </div>
        {/* ============= Return End here ============ */}
        {/* ============= Cart Start here ============ */}
        <Link href="/cart">
          <div className="relative flex items-start justify-center headerHover">
            <span>
              <ShoppingCartIcon />
            </span>
            <p className="flex mt-3 text-xs font-semibold text-whiteText">
              Cart
            </p>
            <span className="absolute text-xs top-0 left-6 w-4 font-semibold p-1 h-4 bg-[#f3a847] text-amazon_blue rounded-full flex justify-center items-center">
              {productData?.length > 0 ? productData?.length : 0}
            </span>
          </div>
        </Link>
        {/* ============= Cart End here ============== */}
      </div>
      <HeaderBottom />
    </div>
  );
};

export default Header;