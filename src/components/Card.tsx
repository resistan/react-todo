import React from "react";
import { useSetRecoilState } from "recoil";
import { newToDoState } from "../atoms";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import Button from "./Button";

const CardWrap = styled.div<{ isDragging: boolean }>`
  display: flex;
  align-items: center;
  margin: 10px 0;
  padding: 10px;
  border-radius: 5px;
  background-color: ${(props) =>
    props.isDragging ? "#AAA" : props.theme.lightBg};
  box-shadow: ${(props) =>
    props.isDragging ? "1px 2px 5px rgba(0,0,0,.2)" : "none"};
  color: ${(props) => props.theme.textColor};
  span {
    flex-grow: 1;
  }
`;

interface ICardProps {
  toDoId: number;
  index: number;
  toDoText: string;
  boardId: string;
}
const Card = ({ toDoId, toDoText, index, boardId }: ICardProps) => {
  const setToDos = useSetRecoilState(newToDoState);
  const delTodo = () => {
    setToDos((oldToDos) => {
      const targetArray = [...oldToDos[boardId]];
      const targetIndex = targetArray.findIndex((toDo) => toDo.id === toDoId);
      const updateArray = targetArray.filter(
        (toDo) => toDo !== targetArray[targetIndex]
      );
      return { ...oldToDos, [boardId]: updateArray };
    });
  };
  return (
    <>
      <Draggable draggableId={toDoId + ""} index={index}>
        {(magic, snapshot) => (
          <CardWrap
            isDragging={snapshot.isDragging}
            ref={magic.innerRef}
            {...magic.draggableProps}
            {...magic.dragHandleProps}
          >
            <span>{toDoText}</span>
            <Button btnType="DelToDo" onClick={delTodo} />
          </CardWrap>
        )}
      </Draggable>
    </>
  );
};

export default React.memo(Card);
