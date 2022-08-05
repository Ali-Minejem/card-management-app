import React from "react";
import { BsListTask } from "react-icons/bs";

function NavBar() {
  return (
    <nav className="flex p-[20px] bg-[#242426] gap-[10px] justify-center mb-5">
      <BsListTask
        size={30}
        className="sm:pt-[0px] pb-[2px] lg:pt-[8px] text-[#fff]"
      />
      <div className="nav-item nav-logo uppercase text-[#fff] sm:text-[18px] lg:text-[25px]">
        Daily Task Manager
      </div>
    </nav>
  );
}

export default NavBar;
