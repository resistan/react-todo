import styled from "styled-components";
import { useRecoilState } from "recoil";
import { isDarkAtom } from "../atoms";

const Foot = styled.footer`
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 999;
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 5px 10px;
  background-color: ${(props) => props.theme.black.lighter};
  color: ${(props) => props.theme.white.lighter};
  font-size: 0.8em;
  button {
    border: 0;
    background: transparent;
  }
`;

const Footer = () => {
  const [theme, setTheme] = useRecoilState(isDarkAtom);
  const toggleTheme = () => setTheme((prev) => !prev);
  return (
    <>
      <Foot>
        <p>React Study @ 2022</p>
        <button onClick={toggleTheme} title="Toggle theme">
          {theme ? "🌞" : "🌚"}
        </button>
      </Foot>
    </>
  );
};

export default Footer;
