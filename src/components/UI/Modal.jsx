import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export default function Modal({ children, open, cssClasses = '' }) {
    const dialog = useRef();

    useEffect(() => {
        if(open) {
            dialog.current.showModal();
        }
    }, [open]);
    
    return createPortal(
        <dialog ref={dialog} className={`modal ${cssClasses}`}>{children}</dialog>,
        document.getElementById('modal')
    )
}