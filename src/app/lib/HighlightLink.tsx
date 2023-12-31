import { memo, useState } from "react";
import { Button } from "antd";
import "../style/highlight-link.scss";
import { CopyOutlined, CheckOutlined } from "@ant-design/icons";

const HighlightLink_ = ({
  text,
  httpReqType = "GET",
}: {
  text: string;
  httpReqType?: "POST" | "GET";
}) => {
  const [isClicked, setIsClicked] = useState<boolean>(false);

  return (
    <div
      className="hlink"
      onMouseLeave={() => {
        setTimeout(() => {
          setIsClicked(false);
        }, 250);
      }}
    >
      <pre>
        <span className={httpReqType?.toLowerCase()}>[{httpReqType}]</span>{" "}
        {text}
      </pre>
      <Button
        className="cpy_icon"
        icon={isClicked ? <CheckOutlined /> : <CopyOutlined />}
        onClick={() => {
          navigator.clipboard.writeText(text);
          setIsClicked(true);
        }}
      />
    </div>
  );
};
const HighlightLink = memo(HighlightLink_);
export default HighlightLink;
