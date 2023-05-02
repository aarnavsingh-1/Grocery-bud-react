import React, { useState, useEffect } from "react";
import List from "./List";
import Alert from "./Alert";

function App() {
const getLocalStorage=()=>{
  let list=localStorage.getItem("list")
  if(list){
    return JSON.parse(localStorage.getItem("list"))
  }
  else return []
}


  const [name,setName] = useState("");
  const[list,setList]=useState(getLocalStorage())
  const [editing, setEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [alert, setAlert] = useState({ show: false, msg: "", type: "" });
  
  const showAlert=(show=false,type="",msg="")=>{
    setAlert({show,type,msg})
  }
  
  const clearItems=()=>{
    showAlert(true,"danger"," All Items removed")
    setList([])
  }

  const removeItem=(id)=>{
showAlert(true,"danger","Item removed")
setList(list.filter((item)=>item.id!==id))
  }
const editItem=(id)=>{
  const specificItem=list.find((item)=>item.id===id)
  setEditing(true)
  setEditId(id)
  setName(specificItem.title)
}
useEffect(()=>{
localStorage.setItem("list",JSON.stringify(list))
},[list])



  const handleSubmit = (e) => {
    e.preventDefault()
    if(name && editing){
   setList(list.map((item)=>{
    if(item.id===editId){
      return {...item,title:name}
    }
    return item
    
   }))
   showAlert(true,"success","Edit succesful")
    setEditing(false)
    setName("")
    setEditId(null)
    }
    else if(!name){
      showAlert(true,"danger","Please Enter Something")
    }
    else{
      showAlert(true,"success","Item added to the list!")
      const newItem={id: new Date().getTime().toString(),title:name}
      setList([...list,newItem])
      setName("")
    }
    

  };
  return (
    <section className="section-center">
      <form className="grocery-form" onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} removeAlert={showAlert} list={list}/>}
        <h3>Grocery Bud</h3>
        <div className="form-control">
          <input
            type="text"
            className="grocery"
            placeholder="e.g. eggs"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button type="submit" className="submit-btn">
            {editing ? "edit" : "submit"}
          </button>
        </div>
      </form>
      {list.length>0 &&
      <div className="grocery-container">
      <List items={list} removeItem={removeItem} editItem={editItem}/>
      <button className="clear-btn" onClick={clearItems}>Clear Items</button>
    </div>}
      
    </section>
  );
}

export default App;
