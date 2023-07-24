import { Button, FormControl, Grid } from "@mui/material";
import { observer } from "mobx-react-lite";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useTeamMemberStore } from "../../../contexts/TeamMembersStoreProvider";
import { TeamMember } from "../../../store/teamMembersStore";
import ControlledTextField from "../../molecules/ControlledTextField/ControlledTextField";

interface AddTeammateForm {
  colleagueName: string;
}

const defaultValues: AddTeammateForm = {
  colleagueName: "",
};

const AddUserForm = observer(() => {
  const { teamMemberList, setTeamMemberList } = useTeamMemberStore();

  const methods = useForm({
    defaultValues,
  });

  const { handleSubmit } = methods;

  const onFormSubmit: SubmitHandler<AddTeammateForm> = ({ colleagueName }) => {
    const newColleague: TeamMember = {
      id: teamMemberList.length,
      name: colleagueName,
    };
    setTeamMemberList([...teamMemberList, newColleague]);
  };

  const isExistingValue = async (name: string) => {
    return teamMemberList.find((member) => member.name === name)
      ? "Name already added in the list"
      : true;
  };

  return (
    <FormProvider {...methods}>
      <form noValidate onSubmit={handleSubmit(onFormSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <FormControl fullWidth>
              <ControlledTextField
                name="colleagueName"
                type="text"
                required
                placeholder="Enter name"
                label="Colleague's Name"
                rules={{
                  required: "Please enter your colleague's name.",
                  validate: isExistingValue,
                }}
              />
            </FormControl>
          </Grid>
          <Grid item>
            <Button
              variant="outlined"
              type="submit"
              size="large"
              sx={{ padding: "0.8125rem 1.5rem" }}
            >
              Add Colleague
            </Button>
          </Grid>
        </Grid>
      </form>
    </FormProvider>
  );
});

export default AddUserForm;
