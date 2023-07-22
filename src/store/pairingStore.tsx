import { makeAutoObservable } from "mobx";
import React, { useState } from "react";

export interface TeamMember {
  id: number;
  name: string;
}

class PairingStore {
  teamMemberPool: TeamMember[] = [];
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  setTeamMemberPoolList(updatedList: TeamMember[]) {
    this.teamMemberPool = updatedList;
  }
}

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

export {
  PairingStore,
  PairingStoreContext,
  PairingStoreProvider,
  usePairingStore,
};
