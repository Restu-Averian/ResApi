import { RightCircleFilled } from "@ant-design/icons";

interface SiderToggleButtonProps {
  open: boolean;
  onToggle: () => void;
}

const SiderToggleButton = ({ open, onToggle }: SiderToggleButtonProps) => {
  return (
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
      onClick={onToggle}
    />
  );
};
export default SiderToggleButton;
