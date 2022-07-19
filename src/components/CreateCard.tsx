import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { newToDoState } from "../atoms";
import Button from "./Button";

const ToDoForm = styled.form`
  display: flex;
  margin: 0;
  padding: 3px 10px 5px;
  align-items: center;
  input {
    display: block;
    width: 100%;
    padding: 10px 10px 8px;
  }
  button {
    margin-left: -40px;
    padding-top: 3px;
    border: 0;
    background-color: transparent;
    svg {
      width: 20px;
    }
  }
`;

interface IForm {
  toDo: string;
}

const CreateToDo = ({ category }: any) => {
  const setToDos = useSetRecoilState(newToDoState);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const handleValid = ({ toDo }: IForm) => {
    const newTodo = {
      id: Date.now(),
      text: toDo,
    };
    setToDos((oldToDos) => {
      const targetArray = Object.values(oldToDos[category]);
      const boardCopy = [newTodo, ...targetArray];
      return { ...oldToDos, [category]: boardCopy };
    });
    setValue("toDo", "");
  };
  return (
    <ToDoForm onSubmit={handleSubmit(handleValid)}>
      <input
        {...register("toDo", { required: "Please enter something" })}
        type="text"
        placeholder={`Add a something ${category}`}
      />
      <Button btnType="AddToDo" />
    </ToDoForm>
  );
};

export default CreateToDo;
