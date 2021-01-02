import React from "react";
import "./style/tailwind.output.css";
import classNames from "classnames";
import Container from "./components/Container";
import Title from "./components/Title";
import Box from "./components/Box";
import TodoApp from "./components/TodoApp/index";

const App: React.FC = () => {
  return (
    <div className={classNames("min-h-screen")}>
      <header className={classNames("pt-5", "pb-2")}>
        <Container>
          <Title>Todo list</Title>
        </Container>
      </header>

      <main>
        <Container>
          <Box>
            <TodoApp />
          </Box>
        </Container>
      </main>

      {/* tailwind debug */}
      {/* <p className="text-apple-default-blue">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit.
      </p> */}
    </div>
  );
};

export default App;
