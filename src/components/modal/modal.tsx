import * as classNames from "classnames";
import * as React from "react";
import "./modal.css";
import * as ReactModal from "react-modal";
import { RiCloseCircleLine } from "react-icons/ri";

type Props = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  closeOutside?: boolean;
  label?: string;
  children?: React.ReactNode;
  className?: string;
};
const customStyles = {
  content: {
    top: "200px",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const Modal = ({
  isOpen,
  setIsOpen,
  closeOutside = true,
  label,
  children,
  className,
}: Props) => {
  return (
    <ReactModal
      isOpen={isOpen}
      contentLabel={label}
      onRequestClose={() => setIsOpen(false)}
      shouldCloseOnOverlayClick={closeOutside}
      className={classNames("modal", className)}
      // style={customStyles}
    >
      <div className="modal_close">
        <RiCloseCircleLine
          className="modal_close--icon"
          onClick={() => setIsOpen(false)}
        />
      </div>

      {children}
    </ReactModal>
  );
};

export default Modal;
