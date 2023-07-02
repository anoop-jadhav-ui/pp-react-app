import React, { useContext, useState } from "react";

export interface Colleague {
  id: number;
  name: string;
}

type FormContextType = {
  colleagueList: Colleague[];
  setColleagueList: React.Dispatch<React.SetStateAction<Colleague[]>>;
};

export const FormContext = React.createContext<FormContextType>(
  {} as FormContextType
);

export const FormContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [colleagueList, setColleagueList] = useState<Colleague[]>([]);
  return (
    <FormContext.Provider
      value={{
        colleagueList,
        setColleagueList,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useFormContext = () => useContext(FormContext);
