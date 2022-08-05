import React from "react";
import "react-responsive-modal/styles.css";
import { Modal as ResponsiveModal } from "react-responsive-modal";
import PropTypes from "prop-types";

function Modal(props) {
  const { children, title, visible, onClose } = props;
  return (
    <>
      <ResponsiveModal open={visible} onClose={onClose} center>
        <div className="pb-[5px] font-bold text-[18px] text-gray-700 min-w-[300px]">
          {title}
        </div>
        <hr />
        <br />
        {children}
      </ResponsiveModal>
    </>
  );
}

Modal.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  visible: PropTypes.bool,
  onClose: PropTypes.func,
};
export default Modal;
