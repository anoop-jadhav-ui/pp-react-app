import { makeAutoObservable } from "mobx";
import React, { useState } from "react";

export interface TeamMember {
	id: number;
	name: string;
}

class TeamMemberStore {
	teamMemberList: TeamMember[] = [];
	constructor() {
		makeAutoObservable(this, {}, { autoBind: true });
	}

	setTeamMemberList(updatedList: TeamMember[]) {
		this.teamMemberList = updatedList;
	}
}

const TeamMemberStoreContext = React.createContext({} as TeamMemberStore);

const TeamMemberStoreProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const [teamMemberStore] = useState(new TeamMemberStore());
	return (
		<TeamMemberStoreContext.Provider value={teamMemberStore}>
			{children}
		</TeamMemberStoreContext.Provider>
	);
};

const useTeamMemberStore = () => React.useContext(TeamMemberStoreContext);

export {
	TeamMemberStore,
	TeamMemberStoreContext,
	TeamMemberStoreProvider,
	useTeamMemberStore,
};
