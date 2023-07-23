import { makeAutoObservable } from "mobx";
import React, { useState } from "react";
import { mockTeamMembers } from "../data/mockData";
import { TeamMember } from "./teamMembersStore";

export interface Pair {
  id: number;
  items: TeamMember[];
}

class PairingStore {
  teamMemberPool: TeamMember[] = [];
  pairList: Pair[] = [];
  selectedTeamMembers: TeamMember[] = [];

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  setTeamMemberPoolList(updatedList: TeamMember[]) {
    this.teamMemberPool = updatedList;
  }

  setSelectedTeamMembers(updatedList: TeamMember[]) {
    this.teamMemberPool = updatedList;
  }

  setPairList(updatedPairList: Pair[]) {
    this.pairList = updatedPairList;
  }

  clearPairingBoard() {
    this.pairList = [];
    this.selectedTeamMembers = [];
    this.teamMemberPool = mockTeamMembers;
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
