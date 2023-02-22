import React, { useEffect, useState } from 'react'
import './style.css'

const Todo = () => {
    const getLocalStorageData = () =>{
        const array = localStorage.getItem("mytodoList");
        if(array){
            return JSON.parse(array);
        }
        return [];
    }
    const [inputData, setInputData] = useState("");
    const [items, setItems] = useState(getLocalStorageData);
    const [isEditItem, setIsEditItem] = useState("");
    const [toggleButton, setToggleButton] = useState(false);
    const addItem = () =>{
        if(!inputData){
            alert("Please Fill The Message");
        }
        else if(toggleButton){
            isEditItem.val = inputData;
            setInputData("");
            setIsEditItem("");
            setToggleButton(false);
        }
        else{
            const objectData = {
                id : new Date().getTime().toString(),
                val : inputData
            }
            setItems([...items, objectData]);
            setInputData("");
        }
    }
    const deleteElem = ((del_id) =>{
        const updatedItems = items.filter((curElem)=>{
            return curElem.id !== del_id;
        })
        setItems(updatedItems);
    })
    const editElem = ((ed_id)=>{
        const item_edited = items.filter((curElem)=>{
            return ed_id === curElem.id;
        })
        setInputData(item_edited[0].val);
        setIsEditItem(item_edited[0]);
        setToggleButton(true);
    })
    useEffect(()=>{
        localStorage.setItem("mytodoList",JSON.stringify(items))
    },[items])    
  return (
    <>
        <div className="main-div">
            <div className="child-div">
                <figure>
                    <img src="./images/todo.svg" alt="todologo" />
                    <figcaption>Add Your List Here ✌️</figcaption>
                </figure>
                <div className="addItems">
                    <input type="text" placeholder='✍️ Add an Item' className='form-control' value={inputData} onChange={(event)=>setInputData(event.target.value)} />
                    {
                        toggleButton === true ? <i className="far fa-edit" onClick={addItem}></i> : <i className="fa fa-solid fa-plus" onClick={addItem}></i>
                    }
                    </div>
                <div className="showItems">
                    {
                        items.map((curElem) =>{
                            return(
                                <div className="eachItem" key={curElem.id}>
                                    <h3>{curElem.val}</h3>
                                    <div className="todo-btn">
                                        <i className="far fa-edit" onClick={()=>editElem((curElem.id))}></i>
                                        <i className="far fa-trash-alt" onClick={() => deleteElem(curElem.id)}></i>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="showItems"><button className='btn effect04' data-sm-link-text='Remove All' onClick={()=>setItems([])}><span>CHECK LIST</span></button></div>
            </div>
        </div>
    </>
  )
}

export default Todo;