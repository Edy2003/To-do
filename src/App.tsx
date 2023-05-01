import React, {FormEventHandler, MouseEventHandler, useState} from 'react';
import Task from "./tasks";
import './App.css';

function Tasks (props:Task){
    return(
            <div className='tasks'>
                <div className='field'>
                    <div className='taskTitle'>{props.task.title}</div>
                    <div className='task'>{props.task.task}</div>
                </div>
                <div className='buttons'>
                    <button className='taskButton delete' onClick={()=>props.buttonDelete(props.index)}>Delete</button>
                    <button className='taskButton change' onClick={()=>props.buttonChange(props.index)}>Change</button>
                    <button className='taskButton save' onClick={()=>props.buttonSave(props.index)}>Save</button>
                </div>
            </div>
    )
}

function App() {

    const [state,setState]= useState<{title:string,task:string}>({title:'',task:''});
    const [arr,setArr]= useState<{title:string,task:string}[]>([]);
    const [num,setNum]=useState<number>()

    const submit:FormEventHandler<HTMLFormElement>=(e)=>{
        e.preventDefault();
    }

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
        }else{alert('Fields are empty! Please write something)')}
     }

     const onDelete = (i:number)=> {
        const oldArr = [...arr];
        oldArr.splice(i,1)
        setArr(oldArr)
    }

    const change = (i:number)=> {
        setState(arr[i]);
        setNum(i)
    }

    const save = (i:number)=> {
        if(state.task!==''&&state.title!=='' && num===i) {
            arr[i] = state;
            setState(arr[i]);
            setState({title: '', task: ''});
        }else if(state.task===''&&state.title===''){
            alert('Fields are empty! Please write something)')
        }else{
            alert('Your are trying to safe in the wrong task! Choose correct')
        }
    }

    return(
      <>
          <h2 className='title main'>To-do tasks</h2>
          <form onSubmit={submit} className='inputForm'>
              <div className='inputs'>
                  <input type='text' placeholder='Title' onChange={onChangeTitle} value={state.title} className='input'/>
                  <input type='text' placeholder='Task' onChange={onChangeTask} value={state.task} className='input'/>
              </div>

              <button onClick={onClick} className='mainSaveButton'>Add task</button>
          </form>
          <div>
              <h3 className='title second'>Tasks</h3>
              {arr.map((e,i)=>
                    <Tasks task={e}
                           index={i}
                           buttonDelete={onDelete}
                           buttonChange={change}
                           buttonSave={save}/>
              )}
          </div>
      </>
  )

}

export default App;
