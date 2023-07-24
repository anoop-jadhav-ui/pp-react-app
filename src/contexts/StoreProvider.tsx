import { PairingStoreProvider } from "./PairingStoreProvider";
import { TeamMemberStoreProvider } from "./TeamMembersStoreProvider";

const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <TeamMemberStoreProvider>
      <PairingStoreProvider>{children}</PairingStoreProvider>
    </TeamMemberStoreProvider>
  );
};

export default StoreProvider;
