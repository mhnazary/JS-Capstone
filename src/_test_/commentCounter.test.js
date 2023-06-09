import commentcount from '../modules/commentCounter.js';

describe('counter test', () => {
  test('it should display 0 if there is nothing in the array', () => {
    const commentArray = [];
    const expextedResult = commentcount(commentArray);
    expect(expextedResult).toBe(0);
  });
  test('it should display the right number', () => {
    const commentArray = [
      { name: 'helen', comment: 'best movie', date: '2022-10-03' },
      { name: 'Gelila', comment: 'I love it', date: '2023-01-03' },
    ];
    const expextedResult = commentcount(commentArray);
    expect(expextedResult).toBe(2);
  });
});