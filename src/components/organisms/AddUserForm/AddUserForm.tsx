import {
  Button,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Input,
} from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { useRef } from "react";
import {
  TeamMember,
  useTeamMemberStore,
} from "../../../store/teamMembersStore";

const AddUserForm = observer(() => {
  const { teamMemberList, setTeamMemberList } = useTeamMemberStore();
  const nameInput = useRef<HTMLInputElement>(null);

  const validateInputs = () => {
    const inputValue = nameInput.current?.value;
    const isAlreadyPresent = teamMemberList.find(
      (item) => item.name === inputValue
    );
    if (inputValue && isAlreadyPresent) {
      nameInput.current?.setCustomValidity("Name already present.");
    } else {
      nameInput.current?.setCustomValidity("");
    }
    return nameInput.current?.checkValidity();
  };

  const addTeammate = (event: React.MouseEvent<HTMLButtonElement>) => {
    const isValid = validateInputs();
    if (isValid) {
      const newColleague: TeamMember = {
        id: teamMemberList.length,
        name: nameInput.current?.value ?? "",
      };
      setTeamMemberList([...teamMemberList, newColleague]);
      event.preventDefault();
      if (nameInput.current) {
        nameInput.current.value = "";
      }
    }
    nameInput.current?.reportValidity();
  };

  return (
    <form>
      <Grid templateColumns="4fr 1fr" gap={2} alignItems="flex-end">
        <GridItem>
          <FormControl>
            <FormLabel htmlFor="name">Colleague's Name</FormLabel>
            <Input
              type="text"
              id="name"
              required
              ref={nameInput}
              placeholder="Enter name"
            />
          </FormControl>
        </GridItem>
        <GridItem>
          <Button
            variant="outline"
            colorScheme="purple"
            onClick={addTeammate}
            type="submit"
          >
            Add Colleague
          </Button>
        </GridItem>
      </Grid>
    </form>
  );
});

export default AddUserForm;
