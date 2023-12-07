import { useState } from "react";
import { FaAngleLeft, FaHouseUser , FaAngleDown, FaUser, FaMoneyBill, FaMoneyBillWaveAlt, FaUsers, FaSignOutAlt } from "react-icons/fa";
import { Link, Outlet } from "react-router-dom";

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const [openMenuIndex, setOpenMenuIndex] = useState(null);

  const Menus = [
    { title: "Profile", icon: <FaUser  />, link: "/" },
    {
        title: "Income level",
        icon: <FaMoneyBill  />,
        submenu: true,
        submenuItems: [
          { title: "page1", icon: <FaMoneyBill  />, link: "/dashboard/income" },
          { title: "page2", icon: <FaMoneyBill  />, link: "/" },
          { title: "page3", icon: <FaMoneyBill  />, link: "/" },
        ],
      },
    { title: "Deposit", icon: <FaMoneyBillWaveAlt  />, link: "/courses" },
    {
      title: "Team",
      icon: <FaUsers   />,
      submenu: true,
      submenuItems: [
        { title: "page1", icon: <FaUsers  />, link: "/" },
        { title: "page2", icon: <FaUsers  />, link: "/" },
        { title: "page3", icon: <FaUsers  />, link: "/" },
      ],
    },
    { title: "Logout", icon: <FaSignOutAlt  />, link: "/settings" },
  ];

  const toggleSubmenu = (index) => {
    setOpenMenuIndex(openMenuIndex === index ? null : index);
  };

  return (
    <div className="flex text-white">
      <div
        className={`bg-blue-900 p-6 h-screen pt-6 ${
          open ? "w-72" : "w-20"
        } duration-500 relative`}
      >
        <FaAngleLeft
          className={`text-3xl bg-white text-blue-900 rounded-full border border-blue-900 absolute -right-3 top-3 cursor-pointer ${
            !open && "rotate-180"
          }`}
          onClick={() => setOpen(!open)}
        />

        <div className="inline-flex">
          <FaHouseUser  className="text-3xl mr-2 cursor-pointer block float-left" />
          <h1 className={`origin-left font-base text-2xl ${!open && "scale-0"} duration-300`}>
            Dashboard
          </h1>
        </div>

        <ul className="pt-6">
          {Menus.map((menu, index) => (
            <li key={index} className="mb-4 last:mb-0">
              <div
                onClick={() => menu.submenu && toggleSubmenu(index)}
                className={`flex items-center gap-x-3 text-white text-xl ${open ? "p-2" : "py-2"} rounded-md hover:bg-white hover:bg-opacity-30 cursor-pointer`}
              >
                {menu.icon}
                <span className={`${!open && "hidden"}`}>{menu.title}</span>
                {menu.submenu && open &&(
                  <FaAngleDown
                    className={`float-right ml-auto duration-500 ${openMenuIndex === index ? "rotate-180" : ""}`}
                  />
                )}
              </div>

              {openMenuIndex === index && menu.submenu && (
                <ul className="pt-4">
                  {menu.submenuItems.map((submenu, subIndex) => (
                    <li key={subIndex} className="mb-4 last:mb-0">
                      <Link
                        to={submenu.link}
                        className={`flex items-center gap-x-3  ${open ? "p-2" : "py-2"} text-white text-base font-medium rounded-md hover:bg-white hover:bg-opacity-30`}
                      >
                        {submenu.icon}
                        <span className={`${!open && "hidden"}`}>{submenu.title}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
      <Outlet/>
    </div>
  );
};

export default Sidebar;
