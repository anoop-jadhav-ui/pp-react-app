import React, { useContext, useState } from "react";

type FormContextType = {
  nameList: string[];
  setNameList: React.Dispatch<React.SetStateAction<string[]>>;
};

export const FormContext = React.createContext<FormContextType>(
  {} as FormContextType
);

export const FormContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [nameList, setNameList] = useState<string[]>([]);
  return (
    <FormContext.Provider
      value={{
        nameList,
        setNameList,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useFormContext = () => useContext(FormContext);
