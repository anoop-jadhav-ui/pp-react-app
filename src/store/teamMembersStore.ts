import { makeAutoObservable } from "mobx";
import { mockTeamMembers } from "../data/mockData";

export interface TeamMember {
  id: number;
  name: string;
  color?: string;
}

class TeamMemberStore {
  teamMemberList: TeamMember[] = mockTeamMembers;
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  setTeamMemberList(updatedList: TeamMember[]) {
    this.teamMemberList = updatedList;
  }

  clearTeamMemberList() {
    this.teamMemberList = [];
  }
}

export default TeamMemberStore;
