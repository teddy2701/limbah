import React, { useEffect } from "react";
import { Fragment, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

const Modal = ({
  title,
  dataModal,
  tambahData,
  bukaModal,
  tutupModal,
  edit,
  reset,
}) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
    bukaModal = false;
  };

  useEffect(() => {
    if (bukaModal) {
      handleOpen();
    }
  }, [bukaModal]);

  const simpan = () => {
    if (bukaModal) {
      edit();
    } else {
      tambahData();
    }
    handleClose();
    tutupModal();
  };

  return (
    <Fragment>
      <Button
        onClick={() => {
          handleOpen();
          reset();
        }}
        className="bg-sky-100 hover:bg-sky-50 py-2 px-3 text-white font-bold w-full rounded-none  "
      >
        <div className="flex items-center gap-2 text-white justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          <span className="text-sm">{title}</span>
        </div>
      </Button>
      <Dialog open={open}>
        <DialogHeader>{title}</DialogHeader>
        <DialogBody divider>{dataModal}</DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={() => {
              handleClose();
              tutupModal();
            }}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button
            className="bg-sky-100 hover:bg-sky-50 py-2 px-3 text-white font-bold"
            onClick={simpan}
          >
            <span>Simpan</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </Fragment>
  );
};

export default Modal;
