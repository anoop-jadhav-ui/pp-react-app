import React, { useState } from "react";
import PairingStore from "../store/pairingStore";

const PairingStoreContext = React.createContext({} as PairingStore);

const PairingStoreProvider = ({ children }: { children: React.ReactNode }) => {
  const [pairingStore] = useState(new PairingStore());
  return (
    <PairingStoreContext.Provider value={pairingStore}>
      {children}
    </PairingStoreContext.Provider>
  );
};

const usePairingStore = () => React.useContext(PairingStoreContext);

export { PairingStoreProvider, usePairingStore };
