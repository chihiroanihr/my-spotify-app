import { twMerge } from "tailwind-merge";
import * as Dialog from "@radix-ui/react-dialog";
import { IoMdClose } from "react-icons/io";

interface ModalProps {
  isOpen: boolean;
  onChange: (open: boolean) => void;
  title: string;
  description: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onChange,
  title,
  description,
  children,
}) => {
  return (
    <Dialog.Root open={isOpen} defaultOpen={isOpen} onOpenChange={onChange}>
      <Dialog.Portal>
        <Dialog.Overlay
          className={twMerge(
            "fixed inset-0",
            "bg-neutral-900/90",
            "backdrop-blur-sm"
          )}
        />
        <Dialog.Content
          className={twMerge(
            "fixed",
            "top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]",
            "w-full",
            "md:w-[90vw] md:max-w-[450px]",
            "h-full max-h-full",
            "md:h-auto md:max-h-[85vh]",
            "p-[25px]",
            "rounded-md",
            "border border-neutral-700",
            "bg-neutral-800",
            "drop-shadow-md",
            "focus:outline-none"
          )}
        >
          <Dialog.Title
            className={twMerge("mb-4", "text-center", "text-xl font-bold")}
          >
            {title}
          </Dialog.Title>

          <Dialog.Description
            className={twMerge("mb-5", "text-center", "text-sm leading-normal")}
          >
            {description}
          </Dialog.Description>

          <div>{children}</div>

          <Dialog.Close asChild>
            <button
              className={twMerge(
                "absolute",
                "top-[10px] right-[10px]",
                "w-[25px] h-[25px]",
                "inline-flex justify-center items-center",
                "rounded-full",
                "text-neutral-400 hover:text-white",
                "focus:outline-none",
                "appearance-none"
              )}
            >
              <IoMdClose />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default Modal;
