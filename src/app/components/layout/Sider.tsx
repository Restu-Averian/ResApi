import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Fragment, ReactNode, useCallback, useState } from "react";
import Menu, { SubMenu, MenuItem } from "rc-menu";
import "rc-menu/assets/index.css";
import { YoutubeFilled } from "@ant-design/icons";
import SiderToggleButton from "./SiderToggleButton";

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

  const isMenuHvChildren = useCallback((menu: menuDataType) => {
    return menu?.children && menu?.children?.length > 0;
  }, []);

  const onToggle = useCallback(() => {
    setOpen(!open);
  }, [open]);

  const menuData: menuDataType[] = [
    {
      key: "/ppcp",
      icon: <YoutubeFilled />,
      label: (
        <Link href="/ppcp" prefetch={false}>
          PP Couple
        </Link>
      ),
    },

    {
      icon: <YoutubeFilled />,
      label: "Youtube",
      children: [
        {
          key: "/youtube/search",
          label: (
            <Link href="/youtube/search" prefetch={false}>
              Search
            </Link>
          ),
        },
        {
          key: "/youtube/detail",
          label: (
            <Link href="/youtube/detail" prefetch={false}>
              Detail
            </Link>
          ),
        },
      ],
    },
  ];

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
        {menuData?.length > 0 ? (
          <>
            {menuData?.map((menu) => (
              <Fragment key={menu?.key}>
                {isMenuHvChildren(menu) ? (
                  <SubMenu
                    key={menu?.key || "submenu"}
                    title={open ? menu?.label : menu?.icon}
                  >
                    {menu?.children?.map((subMenu) => (
                      <MenuItem
                        key={subMenu?.key}
                        onClick={() => router.push(subMenu?.key || "")}
                      >
                        {subMenu?.label}
                      </MenuItem>
                    ))}
                  </SubMenu>
                ) : (
                  <MenuItem
                    key={menu?.key}
                    onClick={() => router.push(menu?.key || "")}
                  >
                    {open ? menu?.label : menu?.icon}
                  </MenuItem>
                )}
              </Fragment>
            ))}
          </>
        ) : (
          <>No Menu</>
        )}
      </Menu>
      <SiderToggleButton open={open} onToggle={onToggle} />
    </>
  );
};
export default Sider;
