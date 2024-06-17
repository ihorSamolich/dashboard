import {
  IconBrandCampaignmonitor,
  IconBrandShopee,
  IconBriefcase,
  IconCalendar,
  IconDashboard,
  IconHome,
  IconInbox,
  IconListDetails,
  IconSettings,
  IconUserScan,
} from "@tabler/icons-react";
import { NavLink, useLocation } from "react-router-dom";

import React, { useEffect, useRef, useState } from "react";

import ChevronDown from "../components/sidebar/ChevronDown.tsx";
import ExpandCollapseButton from "../components/sidebar/ExpandCollapseButton.tsx";
import SidebarLink from "../components/sidebar/SidebarLink.tsx";
import SidebarLinkGroup from "../components/sidebar/SidebarLinkGroup.tsx";

interface ISidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const Sidebar: React.FC<ISidebarProps> = (props) => {
  const location = useLocation();
  const { pathname } = location;

  const { sidebarOpen, setSidebarOpen } = props;

  const trigger = useRef<HTMLButtonElement | null>(null);
  const sidebar = useRef<HTMLDivElement | null>(null);

  const storedSidebarExpanded = localStorage.getItem("sidebar-expanded");
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true",
  );

  // Close on click outside
  useEffect(() => {
    const clickHandler = (event: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (!sidebarOpen || sidebar.current.contains(event.target as Node) || trigger.current.contains(event.target as Node))
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  }, [sidebarOpen, setSidebarOpen]);

  // Store sidebar expanded state in localStorage
  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.body.classList.add("sidebar-expanded");
    } else {
      document.body.classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  return (
    <div>
      {/* Sidebar backdrop (mobile only) */}
      <div
        className={`fixed inset-0 bg-slate-900 bg-opacity-30 z-40 lg:hidden lg:z-auto transition-opacity duration-200 ${
          sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden="true"
      ></div>

      {/* Sidebar */}
      <div
        id="sidebar"
        ref={sidebar}
        className={`flex flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 h-screen overflow-y-scroll lg:overflow-y-auto no-scrollbar w-64 lg:w-20 lg:sidebar-expanded:!w-64 2xl:!w-64 shrink-0 bg-slate-800 p-4 transition-all duration-200 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-64"
        }`}
      >
        {/* Sidebar header */}
        <div className="flex flex-col justify-between mb-10 pr-3 sm:px-2 gap-5">
          {/* Close button */}
          <button
            ref={trigger}
            className="lg:hidden text-slate-500 hover:text-slate-400"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls="sidebar"
            aria-expanded={sidebarOpen}
          >
            <span className="sr-only">Close sidebar</span>
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z" />
            </svg>
          </button>
          {/* Logo */}
          <NavLink end to="/" className="flex flex-row items-center">
            <IconDashboard className="w-8 h-8 text-white" />
            <span className="ms-2 text-xl text-white font-bold lg:hidden lg:sidebar-expanded:block ">Dashboard</span>
          </NavLink>

          {/* Links */}
          <div className="space-y-8 -mx-2">
            {/* Pages group */}
            <div>
              <h3 className="text-xs uppercase text-slate-500 font-semibold pl-3">
                <span className="hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6" aria-hidden="true">
                  •••
                </span>
                <span className="lg:hidden lg:sidebar-expanded:block 2xl:block">Pages</span>
              </h3>
              <ul className="mt-3">
                {/* Dashboard */}
                <SidebarLink to="/" icon={IconHome} label="Home" activeCondition={(pathname) => pathname === "/"} />

                {/* E-Commerce */}
                <SidebarLinkGroup activecondition={pathname.includes("ecommerce")}>
                  {(handleClick, open) => {
                    return (
                      <>
                        <a
                          href="#"
                          className={`block text-slate-200 truncate transition duration-150 ${
                            pathname.includes("ecommerce") ? "hover:text-slate-200" : "hover:text-white"
                          }`}
                          onClick={(e) => {
                            e.preventDefault();
                            sidebarExpanded ? handleClick() : setSidebarExpanded(true);
                          }}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <IconBrandShopee
                                className={`${pathname.includes("ecommerce") ? "text-indigo-500" : "text-slate-400"}`}
                              />
                              <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                E-Commerce
                              </span>
                            </div>
                            {/* Icon */}
                            <ChevronDown open={open} />
                          </div>
                        </a>
                        <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                          <ul className={`pl-9 mt-1 ${!open && "hidden"}`}>
                            <li className="mb-1 last:mb-0">
                              <NavLink
                                end
                                to="/ecommerce/customers"
                                className={({ isActive }) =>
                                  "block transition duration-150 truncate " +
                                  (isActive ? "text-indigo-500" : "text-slate-400 hover:text-slate-200")
                                }
                              >
                                <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                  Customers
                                </span>
                              </NavLink>
                            </li>
                            <li className="mb-1 last:mb-0">
                              <NavLink
                                end
                                to="/ecommerce/orders"
                                className={({ isActive }) =>
                                  "block transition duration-150 truncate " +
                                  (isActive ? "text-indigo-500" : "text-slate-400 hover:text-slate-200")
                                }
                              >
                                <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                  Orders
                                </span>
                              </NavLink>
                            </li>
                            <li className="mb-1 last:mb-0">
                              <NavLink
                                end
                                to="/ecommerce/invoices"
                                className={({ isActive }) =>
                                  "block transition duration-150 truncate " +
                                  (isActive ? "text-indigo-500" : "text-slate-400 hover:text-slate-200")
                                }
                              >
                                <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                  Invoices
                                </span>
                              </NavLink>
                            </li>
                          </ul>
                        </div>
                      </>
                    );
                  }}
                </SidebarLinkGroup>

                {/* Job Board */}
                <SidebarLinkGroup activecondition={pathname.includes("job")}>
                  {(handleClick, open) => {
                    return (
                      <React.Fragment>
                        <a
                          href="#"
                          className={`block text-slate-200 truncate transition duration-150 ${
                            pathname.includes("job") ? "hover:text-slate-200" : "hover:text-white"
                          }`}
                          onClick={(e) => {
                            e.preventDefault();
                            sidebarExpanded ? handleClick() : setSidebarExpanded(true);
                          }}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <IconBriefcase className={`${pathname.includes("job") ? "text-indigo-500" : "text-slate-400"}`} />
                              <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Job Board
                              </span>
                            </div>
                            {/* Icon */}
                            <ChevronDown open={open} />
                          </div>
                        </a>
                        <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                          <ul className={`pl-9 mt-1 ${!open && "hidden"}`}>
                            <li className="mb-1 last:mb-0">
                              <NavLink
                                end
                                to="/job/company-profile"
                                className={({ isActive }) =>
                                  "block transition duration-150 truncate " +
                                  (isActive ? "text-indigo-500" : "text-slate-400 hover:text-slate-200")
                                }
                              >
                                <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                  Company Profile
                                </span>
                              </NavLink>
                            </li>
                          </ul>
                        </div>
                      </React.Fragment>
                    );
                  }}
                </SidebarLinkGroup>

                {/* Tasks */}
                <SidebarLinkGroup activecondition={pathname.includes("tasks")}>
                  {(handleClick, open) => {
                    return (
                      <React.Fragment>
                        <a
                          href="#"
                          className={`block text-slate-200 truncate transition duration-150 ${
                            pathname.includes("tasks") ? "hover:text-slate-200" : "hover:text-white"
                          }`}
                          onClick={(e) => {
                            e.preventDefault();
                            sidebarExpanded ? handleClick() : setSidebarExpanded(true);
                          }}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <IconListDetails
                                className={`${pathname.includes("tasks") ? "text-indigo-500" : "text-slate-400"}`}
                              />
                              <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Tasks
                              </span>
                            </div>
                            {/* Icon */}
                            <ChevronDown open={open} />
                          </div>
                        </a>
                        <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                          <ul className={`pl-9 mt-1 ${!open && "hidden"}`}>
                            <li className="mb-1 last:mb-0">
                              <NavLink
                                end
                                to="/tasks/kanban"
                                className={({ isActive }) =>
                                  "block transition duration-150 truncate " +
                                  (isActive ? "text-indigo-500" : "text-slate-400 hover:text-slate-200")
                                }
                              >
                                <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                  Kanban
                                </span>
                              </NavLink>
                            </li>
                          </ul>
                        </div>
                      </React.Fragment>
                    );
                  }}
                </SidebarLinkGroup>

                {/* Inbox */}
                <SidebarLink
                  to="/inbox"
                  icon={IconInbox}
                  label="Inbox"
                  // activeCondition={(pathname) => pathname.includes("inbox")}
                />

                {/* Calendar */}
                <SidebarLink
                  to="/calendar"
                  icon={IconCalendar}
                  label="Calendar"
                  // activeCondition={(pathname) => pathname.includes("calendar")}
                />

                {/* Campaigns */}
                <SidebarLink
                  to="/campaigns"
                  icon={IconBrandCampaignmonitor}
                  label="Campaigns"
                  // activeCondition={(pathname) => pathname.includes("campaigns")}
                />

                {/* Settings */}
                <SidebarLinkGroup activecondition={pathname.includes("settings")}>
                  {(handleClick, open) => {
                    return (
                      <React.Fragment>
                        <a
                          href="#"
                          className={`block text-slate-200 truncate transition duration-150 ${
                            pathname.includes("settings") ? "hover:text-slate-200" : "hover:text-white"
                          }`}
                          onClick={(e) => {
                            e.preventDefault();
                            sidebarExpanded ? handleClick() : setSidebarExpanded(true);
                          }}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <IconSettings
                                className={`${pathname.includes("settings") ? "text-indigo-500" : "text-slate-400"}`}
                              />

                              <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Settings
                              </span>
                            </div>
                            {/* Icon */}
                            <div className="flex shrink-0 ml-2">
                              <svg
                                className={`w-3 h-3 shrink-0 ml-1 fill-current text-slate-400 ${open && "rotate-180"}`}
                                viewBox="0 0 12 12"
                              >
                                <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                              </svg>
                            </div>
                          </div>
                        </a>
                        <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                          <ul className={`pl-9 mt-1 ${!open && "hidden"}`}>
                            <li className="mb-1 last:mb-0">
                              <NavLink
                                end
                                to="/settings/account"
                                className={({ isActive }) =>
                                  "block transition duration-150 truncate " +
                                  (isActive ? "text-indigo-500" : "text-slate-400 hover:text-slate-200")
                                }
                              >
                                <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                  My Account
                                </span>
                              </NavLink>
                            </li>
                          </ul>
                        </div>
                      </React.Fragment>
                    );
                  }}
                </SidebarLinkGroup>
              </ul>
            </div>
            {/* More group */}
            <div>
              <h3 className="text-xs uppercase text-slate-500 font-semibold pl-3">
                <span className="hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6" aria-hidden="true">
                  •••
                </span>
                <span className="lg:hidden lg:sidebar-expanded:block 2xl:block">More</span>
              </h3>
              <ul className="mt-3">
                {/* Authentication */}
                <SidebarLinkGroup>
                  {(handleClick, open) => {
                    return (
                      <React.Fragment>
                        <a
                          href="#"
                          className={`block text-slate-200 truncate transition duration-150 ${open ? "hover:text-slate-200" : "hover:text-white"}`}
                          onClick={(e) => {
                            e.preventDefault();
                            sidebarExpanded ? handleClick() : setSidebarExpanded(true);
                          }}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <IconUserScan className="text-slate-400" viewBox="0 0 24 24" />

                              <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Authentication
                              </span>
                            </div>
                            {/* Icon */}
                            <ChevronDown open={open} />
                          </div>
                        </a>
                        <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                          <ul className={`pl-9 mt-1 ${!open && "hidden"}`}>
                            <li className="mb-1 last:mb-0">
                              <NavLink
                                end
                                to="/signin"
                                className="block text-slate-400 hover:text-slate-200 transition duration-150 truncate"
                              >
                                <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                  Sign in
                                </span>
                              </NavLink>
                            </li>
                            <li className="mb-1 last:mb-0">
                              <NavLink
                                end
                                to="/signup"
                                className="block text-slate-400 hover:text-slate-200 transition duration-150 truncate"
                              >
                                <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                  Sign up
                                </span>
                              </NavLink>
                            </li>
                          </ul>
                        </div>
                      </React.Fragment>
                    );
                  }}
                </SidebarLinkGroup>
              </ul>
            </div>
          </div>
        </div>

        {/* Expand / collapse button */}
        <ExpandCollapseButton sidebarExpanded={sidebarExpanded} setSidebarExpanded={setSidebarExpanded} />
      </div>
    </div>
  );
};

export default Sidebar;
