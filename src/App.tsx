import React, {FormEventHandler, MouseEventHandler, useState} from 'react';
import Task from "./tasks";



function Tasks (props:Task){

    return(
        <>
            <div>
                <h1>{props.task.title}</h1>
                <p>{props.task.task}</p>
                <button onClick={()=>props.button(props.index)}>Delete</button>
            </div>
        </>
    )
}

function App() {

    const [state,setState]= useState<{title:string,task:string}>({title:'',task:''});
    const [arr,setArr]= useState<{title:string,task:string}[]>([]);

    const onChangeTitle: React.ChangeEventHandler<HTMLInputElement> = (e) =>{
        setState({...state,title:e.target.value})
    }

    const onChangeTask: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        setState({...state, task: e.target.value})
    }

    const onClick:MouseEventHandler<HTMLButtonElement> =()=> {
         setArr([...arr,state]);
         setState({title:'',task:''});
     }

     const submit:FormEventHandler<HTMLFormElement>=(e)=>{
        e.preventDefault();
     }

     const Delete = (i:number)=> {
        const oldArr = [...arr];
        oldArr.splice(i,1)
        setArr(oldArr)
    }

  return(
      <>
          <form onSubmit={submit}>
              <label>To-do tasks</label>
              <input type='text' onChange={onChangeTitle} value={state.title} />
              <input type='text' onChange={onChangeTask} value={state.task} />
              <button onClick={onClick}>Save</button>
          </form>
          <div>
              {arr.map((e,i)=>
                  <div key={i}>
                    <Tasks task={e} button={Delete} index={i}/>
                  </div>
              )}
          </div>
      </>
  )

}

export default App;
