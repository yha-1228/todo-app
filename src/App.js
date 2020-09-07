import React from 'react';
import './tailwind.output.css';
import classNames from 'classnames';
import Container from './components/Container';
import Title from './components/Title';
import Box from './components/Box';
import TodoView from './components/TodoView';

const App = () => {
  return (
    <div className={classNames('min-h-screen', 'bg-gray-100')}>
      <header className={classNames("py-3", 'bg-apple-default-blue', 'text-white')}>
        <Container>
          <Title>Todo list</Title>
        </Container>
      </header>

      <main>
        <Container>
          <div className={classNames('py-3')}>
            <Box>
              <TodoView />
            </Box>
          </div>
        </Container>
      </main>
    </div>
  );
};

export default App;
