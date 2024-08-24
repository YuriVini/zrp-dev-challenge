import { PropsWithChildren } from "react";

interface ModalProps {
  visible: boolean;
  onClose: () => void;
}
export const Modal = ({ visible, onClose, children }: PropsWithChildren<ModalProps>) => {
  if (!visible) return null;

  return (
    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 outline-none focus:outline-none bg-zinc-950 bg-opacity-50">
      <button className="p-2 absolute top-4 right-10 text-4xl" onClick={onClose}>
        X
      </button>
      {children}
    </div>
  );
};
