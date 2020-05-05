import React, { useState } from 'react';
import { createFeedback } from '../_shared/api/feedback/index.js';
import cn from 'classname';
import styles from './form.module.scss';
function Form() {
  const [state, setstate] = useState({
    loaded: false,
    feedback: { emotion: '', description: '' },
    errorMessage: '',
    isSubmittedAlready: false,
    loading: false,
  });
  const handleOnSubmit = async (event) => {
    event.preventDefault();
    setstate({ ...state, loading: true, errorMessage: '' });
    const emotions = Object.entries(state.feedback).reduce((acc, [key, value]) => {
      if (value === true || value === false) {
        if (value) {
          acc += key + ',';
        }
      }
      return acc;
    }, '');
    try {
      await createFeedback({ ...state.feedback, emotion: emotions.slice(0, -1) });
      setstate({ ...state, loading: false, isSubmittedAlready: true });
    } catch (e) {
      console.log(e);
      if (e.response && e.response.status === 401) {
        setstate({ ...state, errorMessage: 'Please enter the valid invitation code' });
      } else {
        setstate({ ...state, errorMessage: 'Something went wrong.' });
      }
    } finally {
      if (state.loading) {
        setstate({ ...state, loading: false });
      }
    }
  };
  const handleOnChange = (event) => {
    event.persist();
    let value = event.target.value;
    let name = event.target.name;
    if (event.currentTarget.getAttribute('data-name')) {
      name = event.currentTarget.getAttribute('data-name');
      value = !state.feedback[name];
    }
    setstate({
      ...state,
      feedback: { ...state.feedback, [name]: value },
    });
  };
  return (
    <div className="block">
      {state.isSubmittedAlready && (
        <div className={cn(styles['fb-form'])}>Thank you for your feedback</div>
      )}
      {!state.isSubmittedAlready && (
        <form
          className={cn(
            'w-full mx-auto object-center max-w-lg p-10 shadow-sm rounded-lg',
            styles['fb-form']
          )}
          onSubmit={handleOnSubmit}
        >
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3 mb-6 md:mb-0">
              <label
                className="block tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-emotions"
              >
                Overall emotion
              </label>
              <div id="grid-emotions" className={cn(styles.emotions)}>
                <span
                  tab={0}
                  role="button"
                  data-name="happy"
                  onClick={handleOnChange}
                  onKeyUp={handleOnChange}
                >
                  <i
                    className={cn('material-icons', styles.icon, styles.happy, {
                      [styles.active]: state.feedback.happy,
                    })}
                  >
                    mood
                  </i>
                </span>
                <span
                  tab={0}
                  role="button"
                  data-name="not-happy"
                  onClick={handleOnChange}
                  onKeyUp={handleOnChange}
                >
                  <i
                    className={cn('material-icons', styles.icon, styles.nothappy, {
                      [styles.active]: state.feedback['not-happy'],
                    })}
                  >
                    sentiment_very_dissatisfied
                  </i>
                </span>
                <span
                  tab={0}
                  role="button"
                  data-name="acceptable"
                  onClick={handleOnChange}
                  onKeyUp={handleOnChange}
                >
                  <i
                    className={cn('material-icons', styles.icon, styles.acceptable, {
                      [styles.active]: state.feedback.acceptable,
                    })}
                  >
                    thumb_up
                  </i>
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label
                className="block tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-password"
              >
                Description
              </label>
              <textarea
                className="appearance-none block w-full bg-white text-gray-700 border border-gray-100 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-password"
                type="text"
                rows="5"
                name="description"
                placeholder="Tell me more if you fancy, please"
                onChange={handleOnChange}
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3 mb-6 md:mb-0">
              <label
                className="block tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-invite-code"
              >
                Invite code
              </label>
              <input
                className="appearance-none block w-auto bg-white text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-invite-code"
                type="text"
                name="code"
                required
                placeholder=""
                onChange={handleOnChange}
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-2">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <button
                type="submit"
                className={cn(
                  'bg-red-400 text-gray-700  text-white font-normal py-2 px-4 rounded-full focus:outline-none',
                  styles['action-button']
                )}
              >
                {state.loading ? 'Please wait..' : 'Submit Feedback'}
              </button>
            </div>
          </div>
          <p className="text-red-500">{state.errorMessage}</p>
        </form>
      )}
    </div>
  );
}

export default Form;
