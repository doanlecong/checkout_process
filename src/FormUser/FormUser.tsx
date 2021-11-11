import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@material-ui/core";

export type user = {
  id : string,
  name : string,
};

type Props = {
  currUser: string;
  users: user[];
  chooseUser: (user: user) => void;
};
const FormUser: React.FC<Props> = ({ currUser, users, chooseUser }) => {

  const handleChooseUser = (e: React.ChangeEvent<HTMLInputElement>) => {
    const userId =  e.target.value;
    console.log(userId);
    
    chooseUser({id : userId, name: users.filter(user => user.id === userId)[0].name})
  }

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">WHO ARE YOU ? </FormLabel>
      <RadioGroup row aria-label="users" name="row-radio-buttons-group" onChange={handleChooseUser}>
        {users.map((user) => {
          return <FormControlLabel data-test={`USER_${user.id}`} key={user.id} value={user.id} checked={user.id === currUser} control={<Radio />} label={user.name} />
        })}
      </RadioGroup>
    </FormControl>
  );
};

export default FormUser;