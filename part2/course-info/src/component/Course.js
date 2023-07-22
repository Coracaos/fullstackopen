import Header from './Header.js';
import Content from './Content.js';

const Course = (props) => {

  const total = props.parts.reduce((sum, part) => sum  + part.exercises, 0);

  return (
    <div>
      <Header course={props.course} />
      <Content parts={props.parts} />
      <p><b>total of {total} exercises</b></p>
    </div>
  )
}

export default Course;