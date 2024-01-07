import { memo, useState } from "react";
import "../style/highlight-link.scss";
import { CopyOutlined, CheckOutlined } from "@ant-design/icons";
import { Button, IconButton } from "@chakra-ui/react";

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
      <IconButton
        aria-label="Search database"
        icon={isClicked ? <CheckOutlined /> : <CopyOutlined />}
        className="cpy_icon"
        colorScheme="blue"
        variant="ghost"
        borderRadius={10}
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
