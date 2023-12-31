import { Layout, SiderProps as SiderPropsAntd, Menu } from "antd";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { ItemType } from "rc-menu/lib/interface";

const { Sider: SiderAntd } = Layout;

const Sider = () => {
  const pathname = usePathname();
  const menuData: Array<ItemType> = [
    {
      key: "/lofi",
      label: <Link href="/lofi">Lofi</Link>,
    },
    {
      key: "/youtube",
      label: "Youtube",
      children: [
        {
          key: "/youtube/search",
          label: <Link href="/youtube/search">Search</Link>,
        },
      ],
    },
  ];

  return (
    <SiderAntd collapsible>
      <Menu
        mode="inline"
        defaultSelectedKeys={[pathname]}
        style={{
          height: "100%",
          borderRight: 0,
        }}
        items={menuData}
      />
    </SiderAntd>
  );
};
export default Sider;
