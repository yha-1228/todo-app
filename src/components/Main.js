import React from 'react';
import classNames from 'classnames';
import Container from './Container';
import HeadingLv1 from './HeadingLv1';
import RoundedBox from './RoundedBox';
import TodoView from './TodoView';

const Main = () => {
  return (
    <main>
      <Container>
        <section className={classNames('py-10')}>
          <HeadingLv1>Todo list</HeadingLv1>
          <RoundedBox>
            <TodoView />
          </RoundedBox>
        </section>
      </Container>
    </main>
  );
};

export default Main;
