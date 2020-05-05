import { FeedbackAPI } from '../index';

const getAllFeedback = () => FeedbackAPI.get('/api/all');

const createFeedback = (data) => FeedbackAPI.post('/api/create', { ...data });
export { getAllFeedback, createFeedback };
