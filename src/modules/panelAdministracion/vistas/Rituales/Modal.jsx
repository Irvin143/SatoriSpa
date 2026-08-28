// components/ui/Modal.jsx
import { useEffect } from "react";

export default function Modal({ titulo, onClose, children }) {
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === "Escape") onClose();
        };
        document.addEventListener("keydown", handleEscape);
        document.body.style.overflow = "hidden";

        return () => {
            document.removeEventListener("keydown", handleEscape);
            document.body.style.overflow = "";
        };
    }, [onClose]);

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-8"
            onClick={onClose}
        >
            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-titulo"
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-[30px] bg-white shadow-xl"
            >
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                    <h2 id="modal-titulo" className="text-lg font-bold text-[#655e57]">
                        {titulo}
                    </h2>
                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Cerrar"
                        className="text-2xl leading-none text-gray-400 hover:text-gray-700 transition
                        cursor-pointer"
                    >
                        ×
                    </button>
                </div>

                <div className="p-6">{children}</div>
            </div>
        </div>
    );
}