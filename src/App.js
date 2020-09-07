import React from 'react';
import './tailwind.output.css';
import classNames from 'classnames';
import Container from './components/Container';
import Title from './components/Title';
import RoundedBox from './components/RoundedBox';
import TodoView from './components/TodoView';

const App = () => {
  return (
    <div className={classNames('min-h-screen', 'bg-gray-100', 'leading-normal')}>
      <header className={classNames("py-2", 'bg-apple-default-blue', 'text-white')}>
        <Container>
          <Title>Todo list</Title>
        </Container>
      </header>

      <main>
        <Container>
          <section className={classNames('py-5')}>
            <RoundedBox>
              <TodoView />
            </RoundedBox>
          </section>
        </Container>
      </main>
    </div>
  );
};

export default App;
