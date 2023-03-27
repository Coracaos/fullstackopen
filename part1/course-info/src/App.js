const Header = (props) => {
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  );
}

const Part = (props) => {
  return (
    <div>
      <p>
        {props.part} {props.exercise}
      </p>
    </div>
  ) 
}

const Content = (props) => {
  return (
    <div>
      <Part part={props.parts[0].name} exercise={props.parts[0].age}/>
      <Part part={props.parts[1].name} exercise={props.parts[1].age}/>
      <Part part={props.parts[2].name} exercise={props.parts[2].age}/>
    </div>
  );
}

const Total = (props) => {
  return (
    <div>
      <p>Number of exercises {props.total}</p> 
    </div>
  )
}

const App = () => {
  const course = {
    name : 'Half Stack application development',
    parts : [
      {
        name : 'Fundamentals of React',
        age : 10
      },
      {
        name : 'Using props to pass data',
        age : 7
      },
      {
        name : 'State of a component',
        age : 14
      }
    ]
  };

  return (
    <div>
      <Header course={course.name}/>
      <Content parts={course.parts}/>
      <Total total={course.parts.reduce((sum, item) => sum + item.age, 0)}/>
    </div>
  )
}

export default App