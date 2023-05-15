
import {
  bannerOne,
  bannerTwo,
  bannerThree,
  bannerFour,
  bannerFive,
  bannerSix,
  bannerSeven,
} from "../public/assets";
import Image from "next/image";
import { CgChevronLeft } from "react-icons/cg";
import Slider from "react-slick"
function SampleNextArrow(props: any) {
  const { onClick } = props;
  return (
    <div
      onClick={onClick}
      className="absolute z-10 flex items-center justify-center w-20 duration-300 border-2 border-transparent rounded-md cursor-pointer top-1 left-1 h-72 hover:border-black active:shadow-amazonInput"
    >
      <CgChevronLeft className="z-10 text-6xl" />
      <CgChevronLeft className="text-6xl absolute left-[12px] text-whiteText" />
    </div>
  );
}

function SamplePrevArrow(props: any) {
  const { onClick } = props;
  return (
    <div
      onClick={onClick}
      className="absolute z-10 flex items-center justify-center w-20 duration-300 border-2 border-transparent rounded-md cursor-pointer top-1 right-1 h-72 hover:border-black active:shadow-amazonInput"
    >
      <CgChevronLeft className="z-10 text-6xl rotate-180" />
      <CgChevronLeft className="text-6xl rotate-180 absolute right-[12px] text-whiteText" />
    </div>
  );
}
const Banner = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    autoplay: true,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
  return (
    <div className="relative mx-auto max-w-container">
      <Slider {...settings}>
        <div>
          <Image src={bannerOne} priority={true} alt="bannerOne" />
        </div>
        <div>
          <Image src={bannerTwo} alt="bannerTwo" />
        </div>
        <div>
          <Image src={bannerThree} alt="bannerThree" />
        </div>
        <div>
          <Image src={bannerFour} alt="bannerFour" />
        </div>
        <div>
          <Image src={bannerFive} alt="bannerFive" />
        </div>
        <div>
          <Image src={bannerSix} alt="bannerSix" />
        </div>
        <div>
          <Image src={bannerSeven} alt="bannerSeven" />
        </div>
      </Slider>
    </div>
  );
};

export default Banner;