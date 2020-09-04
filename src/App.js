import React from 'react';
import classNames from 'classnames';
import './tailwind.output.css';
import Container from './components/Container';
import Main from './components/Main';
import HeadingLv1 from './components/HeadingLv1';
import RoundedBox from './components/RoundedBox';
import TodoView from './components/TodoView';

// TODO: モバイル前提として再設計する

const App = () => {
  return (
    <Main>
      <Container>
        <section className={classNames('py-8')}>
          <HeadingLv1>Todo list</HeadingLv1>
          <RoundedBox>
            <TodoView />
          </RoundedBox>
        </section>
      </Container>
    </Main>
  );
};

export default App;
