import React, { useState } from "react";
import styled from "styled-components";
import { useSetRecoilState } from "recoil";
import { Droppable } from "react-beautiful-dnd";
import { IBoardProps, IToDoState, newToDoState } from "../atoms";
import CreateToDo from "./CreateCard";
import Card from "./Card";
import Button from "./Button";
import { useForm } from "react-hook-form";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px dotted ${(props) => props.theme.lightBg};
  border-radius: 5px;
  background-color: ${(props) => props.theme.bgColor};
  box-shadow: 0 5px 5px #999;
`;
const BoardHeader = styled.div`
  display: flex;
  h2 {
    flex-grow: 1;
    display: flex;
    padding: 15px 10px 10px;
    color: ${(props) => props.theme.textColor};
    svg {
      width: 16px;
      opacity: 0.8;
    }
  }
`;

interface IBoardListProps {
  isDraggingOver: boolean;
  isDraggingFromThis: boolean;
}
interface IForm {
  newBoardTitle: string;
}

const BoardList = styled.div<IBoardListProps>`
  flex-grow: 1;
  border-radius: 5px;
  padding: 10px;
  background-color: ${(props) =>
    props.isDraggingOver
      ? "pink"
      : props.isDraggingFromThis
      ? "#333"
      : "transparent"};
  transition: background-color 0.2s ease;
`;

const Board = ({ toDos, boardId }: IBoardProps) => {
  const setToDos = useSetRecoilState(newToDoState);
  // console.log(toDos);
  const { register, handleSubmit } = useForm<IForm>();
  const [titleEdit, setTitleEdit] = useState(false);
  const handleValid = ({ newBoardTitle }: IForm) => {
    setToDos((oldBoards) => {
      const boardTitles = Object.keys(oldBoards);
      let boardCopy: IToDoState = {};
      const currentOrder = boardTitles.findIndex((el) => el === boardId);
      boardTitles.map((item, index) => {
        if (index === currentOrder) {
          boardCopy[newBoardTitle] = oldBoards[item];
        } else {
          boardCopy[item] = oldBoards[item];
        }
      });
      return { ...boardCopy };
    });
    setTitleEdit((prev) => !prev);
  };
  const removeBoard = () => {
    setToDos((oldBoards) => {
      const boardTitles = Object.keys(oldBoards);
      let boardCopy: IToDoState = {};
      boardTitles.map((item, index) => {
        if (item !== boardId) boardCopy[item] = oldBoards[item];
      });
      return { ...boardCopy };
    });
  };
  return (
    <Droppable droppableId={boardId}>
      {(magic, snapshot) => (
        <Wrapper>
          <BoardHeader>
            <h2>
              {titleEdit ? (
                <form onSubmit={handleSubmit(handleValid)}>
                  <input
                    {...register("newBoardTitle", {
                      required: "Please enter something",
                      value: boardId,
                    })}
                    id={`edit${boardId.replace(" ", "_")}`}
                    type="text"
                  />
                </form>
              ) : (
                <>
                  {boardId}
                  <Button
                    id={`editTitle_${boardId.replace(" ", "_")}`}
                    btnType="EditTitle"
                    onClick={() => {
                      setTitleEdit((prev) => !prev);
                      document
                        .getElementById(`edit${boardId.replace(" ", "_")}`)
                        ?.focus();
                    }}
                  />
                </>
              )}
            </h2>
            <Button btnType="DelBoard" onClick={removeBoard} />
          </BoardHeader>
          <CreateToDo category={boardId} />
          <BoardList
            isDraggingOver={snapshot.isDraggingOver}
            isDraggingFromThis={Boolean(snapshot.draggingFromThisWith)}
            ref={magic.innerRef}
            {...magic.droppableProps}
          >
            {toDos.map((toDo, index) => (
              <Card
                key={toDo.id}
                index={index}
                toDoText={toDo.text}
                toDoId={toDo.id}
                boardId={boardId}
              />
            ))}
            {magic.placeholder}
          </BoardList>
        </Wrapper>
      )}
    </Droppable>
  );
};

export default React.memo(Board);
