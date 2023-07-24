import React, { useState } from "react";
import TeamMemberStore from "../store/teamMembersStore";

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

export { TeamMemberStoreProvider, useTeamMemberStore };
