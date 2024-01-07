import {
  Button,
  ModalBody,
  Modal as ModalChakra,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalProps,
} from "@chakra-ui/react";
import { ReactNode } from "react";

interface ModalChakraProps extends ModalProps {
  title?: string | ReactNode;
  footer?: ReactNode;
}
const ModalResApi = ({
  title,
  children,
  footer,
  ...props
}: ModalChakraProps) => {
  return (
    <ModalChakra {...props}>
      <ModalOverlay />
      <ModalContent>
        {title && <ModalHeader>{title}</ModalHeader>}
        <ModalCloseButton />
        <>{children}</>

        {footer && <ModalFooter>{footer}</ModalFooter>}
      </ModalContent>
    </ModalChakra>
  );
};
export default ModalResApi;
