import CopyrightIcon from "@mui/icons-material/Copyright";
export const middleList = [
  {
    _id: 2221,
    title: "Get to Know Us",
    listItem: [
      {
        _id: "001",
        listData: [
          "Careers",
          "Blog",
          "About Amazon",
          "Investor Relations",
          "Amazon Devices",
          "Amazon Science",
        ],
      },
    ],
  },
  {
    _id: 2222,
    title: "Make Money with Us",
    listItem: [
      {
        _id: "002",
        listData: [
          "Sell products on Amazon",
          "Sell on Amazon Business",
          "Sell apps on Amazon",
          "Become an Affiliate",
          "Advertise Your Products",
          "Sell Product with Us",
          "Host an Amazon Hub",
          "See More Make Money with Us",
        ],
      },
    ],
  },
  {
    _id: 2223,
    title: "Amazon Payment Products",
    listItem: [
      {
        _id: "003",
        listData: [
          "Amazon Business Card",
          "Shop with Points",
          "Reload Your Balance",
          "Amazon Currency Converter",
        ],
      },
    ],
  },
  {
    _id: 2224,
    title: "Let Us Help You",
    listItem: [
      {
        _id: "004",
        listData: [
          "Amazon and COVID-19",
          "Your Account",
          "Your Orders",
          "Shipping Rates & Policies",
          "Returns & Replacements",
          "Manage Your Content and Devices",
          "Amazon Assistant",
          "FAQ & Help",
        ],
      },
    ],
  },
];

interface ListItem {
  _id: string;
  listData: [];
}

const Footer = () => {
  return (
    <div className="w-full text-white bg-amazon_light">
      {/* top */}
      <div className="w-full border-b-[1px] border-gray-500 py-10">
        <div className="grid items-start grid-cols-1 gap-10 px-6 mx-auto text-gray-300 max-w-contentContainer md:grid-cols-2 lgl:grid-cols-4 place-items-center lgl:gap-4">
          {middleList.map((item: any) => (
            <div key={item._id}>
              <h3 className="mb-3 text-base font-semibold text-white">
                {item.title}
              </h3>
              <ul className="flex flex-col gap-2">
                {item.listItem.map((item: ListItem) =>
                  item.listData.map((data: string, i: number) => (
                    <li key={i} className="footerLink">
                      {data}
                    </li>
                  ))
                )}
              </ul>
            </div>
          ))}
        </div>
      </div>
      {/* bottom */}
      <div>
        <p className="py-2 text-xs text-center">
          <CopyrightIcon /> 2023 Ndeye Fatou Ba
        </p>
      </div>
    </div>
  );
};

export default Footer;