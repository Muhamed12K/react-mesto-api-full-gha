import { useEffect } from "react";

export default function useClosePopupsOnKeyPressEsc(isOpen, onClose) {
    useEffect(() => {
        if (!isOpen) {
            return;
        };

        function handleEscBtn(evt) {
            if (evt.key === 'Escape') {
                onClose();
            };
        };

        document.addEventListener('keydown', handleEscBtn);

        return () => {
            document.removeEventListener('keydown', handleEscBtn);
        };
    }, [isOpen, onClose]);
};