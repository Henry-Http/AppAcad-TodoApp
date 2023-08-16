import { createContext, useState } from "react";

const LoginContext = createContext({});

export const LoginContextProvider = ({ children }) => {
  const [login, setLogin] = useState({});

  return (
    <LoginContext.Provider value={{ login, setLogin }}>
      {children}
    </LoginContext.Provider>
  );
};

export default LoginContext;
