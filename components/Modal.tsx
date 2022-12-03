import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

// images. stores, and types import
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useMovieStore } from "@/stores/useMovieStore";
import { Movie } from "@/types/types";

type ModalProps = {
  isOpen: boolean;
  toggleModal: () => void;
};

const Modal = ({ isOpen, toggleModal }: ModalProps) => {
  const { movie, setMovie } = useMovieStore((state) => state);
  console.log(movie);

  const closeModal = () => {
    toggleModal();
    setMovie(null);
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => closeModal()}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/75" />
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
                <button
                  type="button"
                  aria-label="open modal"
                  className="absolute right-4 flex items-center p-1 rounded-full bg-gray-500 hover:bg-gray-600 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  onClick={() => closeModal()}
                >
                  <XMarkIcon
                    aria-hidden="true"
                    className="w-4 aspect-square text-white"
                  />
                </button>
                <Dialog.Title
                  as="h1"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  {movie?.title ?? movie?.name}
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Your payment has been successfully submitted. We’ve sent you
                    an email with all of the details of your order.
                  </p>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;
