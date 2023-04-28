import React, {FormEventHandler, MouseEventHandler, useState} from 'react';
import Task from "./tasks";


function Tasks (props:Task){
    return(
            <div>
                <h1>{props.task.title}</h1>
                <p>{props.task.task}</p>
                <button onClick={()=>props.buttonDelete(props.index)}>Delete</button>
                <button onClick={()=>props.buttonChange(props.index)}>Change</button>
                <button onClick={()=>props.buttonSave(props.index)}>Save</button>
            </div>
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

    const onClick:MouseEventHandler<HTMLButtonElement> = ()=> {
        if(state.title!=='' && state.task!=='') {
            setArr([...arr, state]);
            setState({title: '', task: ''});
        }else{alert('Error!')}
     }

     const submit:FormEventHandler<HTMLFormElement>=(e)=>{
        e.preventDefault();
     }

     const Delete = (i:number)=> {
        const oldArr = [...arr];
        oldArr.splice(i,1)
        setArr(oldArr)
    }

    const Change = (i:number)=> {
        setState(arr[i]);
    }

    const Save = (i:number)=> {
        if(state.task!==''&&state.title!=='') {
            arr[i] = state;
            setState(arr[i]);
            setState({title: '', task: ''});
        }else{
            alert('Error!')
        }
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
                    <Tasks task={e}
                           index={i}
                           buttonDelete={Delete}
                           buttonChange={Change}
                           buttonSave={Save}/>
              )}
          </div>
      </>
  )

}

export default App;
