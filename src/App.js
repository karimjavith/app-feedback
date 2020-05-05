import React from 'react';
import Form from './components/Form';
import cn from 'classname';
import styles from './App.module.scss';
import feedback from './assets/images/feedback.svg';

function App() {
  return (
    <div className="flex">
      <div
        className={cn(
          'xs:hidden sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2  bg-gray-100 min-h-screen relative',
          styles.primary
        )}
      >
        <div className="block">
          <div className={styles['logo-holder']}>
            <img alt="feedback" src={feedback} className={styles['feedback-logo']} />
            <p className="text-xl font-medium my-4">Thanks for your time</p>
          </div>
        </div>
      </div>
      <div
        className={cn(
          'w-full sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2 min-h-screen relative',
          styles.background
        )}
      >
        <Form />
      </div>
    </div>
  );
}

export default App;
