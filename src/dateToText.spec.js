import {dateToText} from './dateToText';

test('converts a js date object inyo a yyyy-MM-DD format', ()=>{
  const date = new Date("1/1/2000");
  date
  const text = dateToText(date);

  expect(text).toEqual("2000-01-01");

})

test('converts a different js date object into a YYYY-MM-DD format', ()=>{
  const date = new Date('2/2/2000');
  date
  const test = dateToText(date);
  expect(test).toEqual('2000-02-02');
})

