import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Fragment, ReactNode, useCallback } from "react";
import Menu, { SubMenu, MenuItem } from "rc-menu";
import "rc-menu/assets/index.css";

type menuDataType = {
  label: ReactNode | string;
  children?: menuDataType[] | undefined;
  key?: string;
};
const Sider = () => {
  const pathname = usePathname();
  const router = useRouter();

  const menuData: menuDataType[] = [
    {
      key: "/lofi",
      label: (
        <Link href="/lofi" prefetch={false}>
          Lofi
        </Link>
      ),
    },
    {
      label: "Youtube",
      children: [
        {
          key: "/youtube/search",
          label: <Link href="/youtube/search">Search</Link>,
        },
      ],
    },
  ];

  const isMenuHvChildren = useCallback((menu: menuDataType) => {
    return menu?.children && menu?.children?.length > 0;
  }, []);

  return (
    <Menu
      mode="inline"
      defaultSelectedKeys={[pathname]}
      style={{
        height: "90vh",
        width: "20%",
        cursor: "pointer",
        position: "sticky",
        top: 0,
      }}
    >
      {menuData?.map((menu, menuIdx) => (
        <Fragment key={menuIdx}>
          {!isMenuHvChildren(menu) && (
            <MenuItem onClick={() => router.push(menu?.key || "")}>
              {menu?.label}
            </MenuItem>
          )}
          {isMenuHvChildren(menu) && (
            <SubMenu title={menu?.label}>
              {menu?.children?.map((subMenu, subMenuIdx) => (
                <MenuItem
                  key={subMenuIdx}
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
  );
};
export default Sider;
