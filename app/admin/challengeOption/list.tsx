import {
  BooleanField,
  Datagrid,
  ImageField,
  List,
  NumberField,
  ReferenceField,
  TextField,
} from "react-admin";

export const ChallengeOptionsList = () => {
  return (
    <List>
      <Datagrid rowClick="edit">
        <NumberField source="id" />
        <TextField source="text" />
        <BooleanField source="correct" />
        <ReferenceField source="challengeId" reference="challenges" />
        <ImageField source="imageSrc" title="Image" />
        <TextField source="audioSrc" />
      </Datagrid>
    </List>
  );
};
