import { PairingStoreProvider } from "../store/pairingStore";
import { TeamMemberStoreProvider } from "../store/teamMembersStore";

const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <TeamMemberStoreProvider>
      <PairingStoreProvider>{children}</PairingStoreProvider>
    </TeamMemberStoreProvider>
  );
};

export default StoreProvider;
