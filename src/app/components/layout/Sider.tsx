import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Fragment, ReactNode, useCallback, useState } from "react";
import Menu, { SubMenu, MenuItem } from "rc-menu";
import "rc-menu/assets/index.css";
import {
  CaretRightOutlined,
  RightCircleFilled,
  YoutubeFilled,
} from "@ant-design/icons";

type menuDataType = {
  label: ReactNode | string;
  children?: menuDataType[] | undefined;
  icon?: ReactNode;
  key?: string;
};
const Sider = () => {
  const pathname = usePathname();
  const router = useRouter();

  const [open, setOpen] = useState<boolean>(true);

  const menuData: menuDataType[] = [
    {
      key: "/ppcp",
      icon: <YoutubeFilled />,
      label: <Link href="/ppcp">PP Couple</Link>,
    },
    {
      icon: <CaretRightOutlined />,
      key: "/lofi",
      label: "Lofi",
      children: [
        {
          key: "/lofi/album",
          label: <Link href="/lofi/album">Album</Link>,
        },
        {
          key: "/lofi/releases",
          label: <Link href="/lofi/releases">Releases</Link>,
        },
      ],
    },
    {
      icon: <YoutubeFilled />,
      label: "Youtube",
      children: [
        {
          key: "/youtube/search",
          label: <Link href="/youtube/search">Search</Link>,
        },
        {
          key: "/youtube/detail",
          label: <Link href="/youtube/detail">Detail</Link>,
        },
      ],
    },
  ];

  const isMenuHvChildren = useCallback((menu: menuDataType) => {
    return menu?.children && menu?.children?.length > 0;
  }, []);

  return (
    <>
      <Menu
        {...(open && {
          mode: "inline",
        })}
        defaultSelectedKeys={[pathname]}
        style={{
          height: "100vh",
          width: open ? "20%" : "5%",
          cursor: "pointer",
          position: "sticky",
          top: 0,
          transition: "all 300ms",
          overflow: "hidden",
        }}
      >
        {menuData?.map((menu) => (
          <Fragment key={menu?.key}>
            {!isMenuHvChildren(menu) && (
              <MenuItem onClick={() => router.push(menu?.key || "")}>
                {open ? menu?.label : menu?.icon}
              </MenuItem>
            )}
            {isMenuHvChildren(menu) && (
              <SubMenu title={open ? menu?.label : menu?.icon}>
                {menu?.children?.map((subMenu) => (
                  <MenuItem
                    key={subMenu?.key}
                    onClick={() => router.push(subMenu?.key || "")}
                  >
                    {subMenu?.label}
                  </MenuItem>
                ))}
              </SubMenu>
            )}
          </Fragment>
        ))}
      </Menu>
      <RightCircleFilled
        style={{
          fontSize: 28,
          position: "absolute",
          top: "50%",
          left: open ? "13.8%" : "4.5%",
          transform: "translate(50%,0%)",
          rotate: open ? "0deg" : "180deg",
          transition: "all 300ms",
          zIndex: 1,
        }}
        onClick={() => setOpen(!open)}
      />
    </>
  );
};
export default Sider;
