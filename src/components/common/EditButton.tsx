import Button from "./Button";

function EditButton({ onButtonClick }: { onButtonClick: () => void }) {
  return (
    <Button onClick={onButtonClick} icon="tabler:edit">
      Edit
    </Button>
  );
}
export default EditButton;
