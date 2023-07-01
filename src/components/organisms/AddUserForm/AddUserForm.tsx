import {
  Button,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Input,
} from "@chakra-ui/react";
import { useRef } from "react";
import { useFormContext } from "../../../contexts/formContext";

const AddUserForm = () => {
  const { nameList, setNameList } = useFormContext();
  const nameInput = useRef<HTMLInputElement>(null);

  const validateInputs = () => {
    const inputValue = nameInput.current?.value;
    if (inputValue && nameList.includes(inputValue)) {
      nameInput.current?.setCustomValidity("Name already present.");
    } else {
      nameInput.current?.setCustomValidity("");
    }
    return nameInput.current?.checkValidity();
  };

  const addTeammate = (event: React.MouseEvent<HTMLButtonElement>) => {
    const isValid = validateInputs();
    if (isValid) {
      setNameList([...nameList, nameInput.current?.value ?? ""]);
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
