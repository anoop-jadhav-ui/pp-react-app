import {
  Button,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Input,
} from "@chakra-ui/react";
import { useRef } from "react";
import { Colleague, useFormContext } from "../../../contexts/formContext";

const AddUserForm = () => {
  const { colleagueList, setColleagueList } = useFormContext();
  const nameInput = useRef<HTMLInputElement>(null);

  const validateInputs = () => {
    const inputValue = nameInput.current?.value;
    const isAlreadyPresent = colleagueList.find(
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
      const newColleague: Colleague = {
        id: colleagueList.length,
        name: nameInput.current?.value ?? "",
      };
      setColleagueList([...colleagueList, newColleague]);
      event.preventDefault();
      nameInput.current!.value = "";
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
};

export default AddUserForm;
