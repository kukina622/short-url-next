import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

interface IShortLinkDialogProps {
  isOpen: boolean;
  isSuccess?: boolean;
  link?: string;
  message?: string;
  onClose: () => void;
}

const ShortLinkDialog = ({
  isOpen,
  isSuccess,
  link,
  message,
  onClose,
}: IShortLinkDialogProps) => {
  const [showHint, setShowHint] = useState<boolean>(false);

  const [prevLink, setPrevLink] = useState(link);

  if (prevLink !== link) {
    setShowHint(false);
    setPrevLink(link);
  }

  async function copyLink() {
    await navigator.clipboard.writeText(link as string);
    setShowHint(true);
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-xl font-medium leading-6 text-gray-900"
                >
                  {isSuccess ? "Success" : "Failure"}
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-lg text-gray-500">
                    {isSuccess ? link : message}
                  </p>
                </div>

                <div className="mt-8">
                  <button
                    type="button"
                    className="mr-2 inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={onClose}
                  >
                    Close
                  </button>
                  {isSuccess && (
                    <>
                      <button
                        type="button"
                        className="mr-3 inline-flex justify-center rounded-md border border-transparent bg-purple-100 px-4 py-2 text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2"
                        onClick={copyLink}
                      >
                        Copy Link
                      </button>
                      {showHint && (
                        <>
                          <svg
                            className="w-4 h-4 text-green-600 inline mr-2"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 16 12"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M1 5.917 5.724 10.5 15 1.5"
                            />
                          </svg>
                          <span className="text-lg text-green-600 font-medium">
                            Copy Successful !
                          </span>
                        </>
                      )}
                    </>
                  )}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

ShortLinkDialog.defaultProps = {
  isSuccess: false,
  link: undefined,
  message: "Operation failed",
};

export default ShortLinkDialog;
