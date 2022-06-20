import { createPortal } from "react-dom";

const Portal = ({children}) => {
    const mount = document.body;
    return createPortal(children, mount)
};

export default Portal;
