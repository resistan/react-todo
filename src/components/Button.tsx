import styled from "styled-components";

const ButtonStyled = styled.button`
  display: flex;
  align-items: center;
  border: 0;
  background-color: transparent;
  svg {
    width: 20px;
    color: ${(props) => props.theme.textColor};
  }
`;

interface ButtonProps {
  onClick?: any;
  btnType: "AddBoard" | "DelBoard" | "AddToDo" | "DelToDo" | "EditTitle";
  text?: string;
  disabled?: boolean;
  [key: string]: any;
}

const Button = ({ onClick, btnType, text, disabled, ...rest }: ButtonProps) => {
  return (
    <ButtonStyled onClick={onClick} {...rest}>
      {btnType === "AddBoard" ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <title>Add Board</title>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
          />
        </svg>
      ) : null}
      {btnType === "DelBoard" ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <title>Delete Board</title>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 13h6M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
          />
        </svg>
      ) : null}
      {btnType === "AddToDo" ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <title>Add To Do</title>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ) : null}
      {btnType === "DelToDo" ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <title>Delete Board</title>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ) : null}
      {btnType === "EditTitle" ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <title>Edit Title</title>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
          />
        </svg>
      ) : null}
      {text && text}
    </ButtonStyled>
  );
};
export default Button;
