import React from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import { useRecoilState } from "recoil";
import { newToDoState } from "../atoms";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import Board from "./Board";
import Button from "./Button";

const ListHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 0 20px 10px;
  &:before {
    content: "";
    display: block;
    width: 110px;
  }
`;
const PageTitle = styled.h1`
  flex-grow: 1;
  padding: 1em 0 0.7em;
  text-align: center;
  font-size: 1.5em;
`;
const Wrapper = styled.div`
  max-width: 890px;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
`;

const Boards = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
`;

const ToDoList = () => {
  const [toDos, setToDos] = useRecoilState(newToDoState);
  // console.log(toDos);
  const makeNewBoard = () => {
    let newBoardName = "New Board";
    setToDos((oldToDos) => {
      const boardTitles = Object.keys(oldToDos);
      if (boardTitles.includes(newBoardName))
        newBoardName = "New Board " + Math.ceil(Math.random() * 10000);
      return { ...oldToDos, [newBoardName]: [] };
    });
  };
  const onDragEnd = (info: DropResult) => {
    const { destination, source } = info;
    if (!destination) return;
    if (destination?.droppableId === source.droppableId) {
      // same board
      setToDos((allBoards) => {
        const boardCopy = [...allBoards[source.droppableId]];
        const taskObj = boardCopy[source.index];
        boardCopy.splice(source.index, 1);
        boardCopy.splice(destination?.index, 0, taskObj);
        return { ...allBoards, [source.droppableId]: boardCopy };
      });
    } else {
      // cross board
      setToDos((allBoards) => {
        const sourceBoard = [...allBoards[source.droppableId]];
        const taskObj = sourceBoard[source.index];
        sourceBoard.splice(source.index, 1);
        const destinationBoard = [...allBoards[destination.droppableId]];
        destinationBoard.splice(destination.index, 0, taskObj);
        return {
          ...allBoards,
          [source.droppableId]: sourceBoard,
          [destination.droppableId]: destinationBoard,
        };
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>To Do List</title>
      </Helmet>
      <ListHeader>
        <PageTitle>To Do List</PageTitle>
        <Button btnType="AddBoard" onClick={makeNewBoard} />
      </ListHeader>
      <Wrapper>
        <DragDropContext onDragEnd={onDragEnd}>
          <Boards>
            {Object.keys(toDos).map((boardId) => (
              <Board boardId={boardId} key={boardId} toDos={toDos[boardId]} />
            ))}
          </Boards>
        </DragDropContext>
      </Wrapper>
    </>
  );
};

export default ToDoList;
