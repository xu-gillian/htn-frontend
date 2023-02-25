import React, { useState } from 'react';

// login state context - manages whether the use is logged in or not
type LoginStateType = {
    loginState: boolean;
    setLoginState: React.Dispatch<React.SetStateAction<boolean>>;
};

type eventIdProviderProps = {
    children: any;
}

const Context = React.createContext<LoginStateType>({} as LoginStateType);

export const LoginStateProvider: React.FC<eventIdProviderProps> = (props) => {
    const [loginState, setLoginState] = useState(true);

    return (
        <Context.Provider value={{ loginState, setLoginState }}>
            {props.children}
        </Context.Provider>
    );
};

export default LoginStateProvider;

export const useLoginState = () => React.useContext(Context);