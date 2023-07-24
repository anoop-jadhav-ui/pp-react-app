import { makeAutoObservable, runInAction } from "mobx";
import React, { useState } from "react";
import { DropResult } from "react-beautiful-dnd";
import { generateRandomId, getRandomPair } from "../utils/commonUtils";
import { TeamMember } from "./teamMembersStore";
import { mockTeamMembers } from "../data/mockData";

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
    this.selectedTeamMembers = updatedList;
  }

  setPairList(updatedPairList: Pair[]) {
    this.pairList = updatedPairList;
  }

  clearPairingBoard() {
    runInAction(() => {
      this.setTeamMemberPoolList(mockTeamMembers);
      this.setPairList([]);
      this.setSelectedTeamMembers([]);
    });
  }

  removeEmptyPairs = (list: Pair[]) => {
    return list.filter((pair) => pair.items.length > 0);
  };

  selectCardForPairing = (clickedId: number) => {
    const currentList = [...this.selectedTeamMembers];
    const isAlreadySelected = currentList.find((item) => item.id === clickedId);
    if (isAlreadySelected) {
      this.setSelectedTeamMembers(
        currentList.filter((item) => item.id !== clickedId)
      );
    } else {
      const selectedItem = this.teamMemberPool.find(
        (item) => item.id === clickedId
      );
      if (selectedItem) {
        this.setSelectedTeamMembers([...currentList, selectedItem]);
      }
    }
  };

  addPairToBoard = () => {
    if (this.selectedTeamMembers.length > 0) {
      const newPairItem: Pair = {
        id: generateRandomId(),
        items: [...this.selectedTeamMembers],
      };
      this.setPairList([...this.pairList, newPairItem]);
      this.setTeamMemberPoolList(
        this.teamMemberPool.filter((item) => {
          return !this.selectedTeamMembers.find(
            (ele) => ele.name === item.name
          );
        })
      );
      this.setSelectedTeamMembers([]);
    } else {
      const newPairItem: Pair = {
        id: generateRandomId(),
        items: [],
      };
      this.setPairList([...this.pairList, newPairItem]);
    }
  };

  addRandomPairsToBoard = () => {
    let tempItems = [...this.teamMemberPool];
    let tempPairs = [...this.pairList];

    const maxPairLimit = 2;
    let currentPairLimit = maxPairLimit;

    while (tempItems.length > 0) {
      if (tempItems.length < maxPairLimit) {
        currentPairLimit = tempItems.length;
      }
      const result = getRandomPair<TeamMember>(tempItems, currentPairLimit);
      const newPairItem: Pair = {
        id: generateRandomId(),
        items: result,
      };
      tempPairs = [...tempPairs, newPairItem];
      for (let i = 0; i < currentPairLimit; i++) {
        tempItems = tempItems.filter((item) => item.id !== result[i].id);
      }
    }

    this.setTeamMemberPoolList(tempItems);
    this.setPairList(tempPairs);
    this.setSelectedTeamMembers([]);
  };

  removeDroppablePair = (id: number) => {
    const removedPairItem = this.pairList.find((item) => item.id === id);
    if (removedPairItem) {
      const updatedPairList = this.pairList.filter((pair) => pair.id !== id);
      this.setTeamMemberPoolList([
        ...this.teamMemberPool,
        ...removedPairItem.items,
      ]);
      this.setPairList(this.removeEmptyPairs(updatedPairList));
    }
  };

  onDragEnd = (result: DropResult, cachedTeamMemberList: TeamMember[]) => {
    if (!result.destination) {
      return;
    }
    const source = result.source;
    const target = result.destination;

    const sourceId = source.droppableId;
    const targetId = target.droppableId;

    const sourcePairId = Number(sourceId.split("-")[1]);
    const targetPairId = Number(targetId.split("-")[1]);

    const draggedTeamMemberId = Number(result.draggableId.split("-")[1]);
    const draggedTeamMember = cachedTeamMemberList.find(
      (member) => member.id === draggedTeamMemberId
    );

    if (source) {
      if (sourceId.includes("pairDropArea") && targetId === "defaultDropArea") {
        const updatedPairList = this.pairList.map((pair) => {
          if (pair.id === sourcePairId) {
            const updatedItems = pair.items.filter(
              (item) => item.id !== draggedTeamMemberId
            );
            return {
              ...pair,
              items: updatedItems,
            };
          }
          return pair;
        });
        this.setPairList(this.removeEmptyPairs(updatedPairList));
        if (draggedTeamMember) {
          this.setTeamMemberPoolList([
            ...this.teamMemberPool,
            draggedTeamMember,
          ]);
        }
      } else if (
        sourceId === "defaultDropArea" &&
        targetId.includes("pairDropArea")
      ) {
        const tempPairList: Pair[] = this.pairList.map((pair) => {
          if (pair.id === targetPairId) {
            return {
              ...pair,
              items: [...pair.items, draggedTeamMember],
            } as Pair;
          }
          return pair;
        });
        this.setTeamMemberPoolList(
          this.teamMemberPool.filter(
            (member) => member.id !== draggedTeamMemberId
          )
        );
        this.setPairList(tempPairList);
      } else if (
        sourceId.includes("pairDropArea") &&
        targetId.includes("pairDropArea") &&
        sourceId !== targetId
      ) {
        const tempPairList: Pair[] = this.pairList.map((pair) => {
          if (pair.id === sourcePairId) {
            return {
              ...pair,
              items: pair.items.filter(
                (item) => item.id !== draggedTeamMemberId
              ),
            } as Pair;
          } else if (pair.id === targetPairId) {
            return {
              ...pair,
              items: [...pair.items, draggedTeamMember],
            } as Pair;
          }
          return pair;
        });
        this.setPairList(this.removeEmptyPairs(tempPairList));
      }
    }
  };
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
