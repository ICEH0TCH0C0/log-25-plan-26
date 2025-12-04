import { useState } from "react";

const useInput = (init = '') => {
    const [value, setValue] = useState(init);
    const handler = (e) => {
        setValue(e.target.value);
    };
    return [value, handler, setValue];
}

export default useInput;