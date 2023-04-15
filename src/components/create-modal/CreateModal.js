import React, {useState} from 'react'
import "./CreateModal.css"
import axios from '../../api'
import { v4 as uuidv4 } from "uuid"

const date = new Date().toISOString("en-GB", {
  timeZone: "Asia/Tashkent"
})
const initialState = {
  id: uuidv4(),
  title: "",
  desc: "",
  time: new Date(date).toLocaleDateString("en-CA"),
  status: "plan"
}

function CreateModal({setModal, setRefresh}) {
  const [state, setState] = useState(initialState)
  const [loading, setLoading] = useState(false)
  const handleSubmit = (e)=>{
    e.preventDefault()
    setLoading(true)
    axios.post("/posts", {...state, id: uuidv4()})
      .then(res=> {
        console.log(res)
        setModal(false)
        setState(initialState)
        setRefresh(p=>!p)
      })
      .catch(err=> console.log(err))
      .finally(()=> setLoading(false))
  }
  return (
    <>
    <div onClick={()=> setModal(false)} className="create_modal-shadow"></div>
    <div className='create__modal'>
        <h3>Reja qo'shish</h3>
        <form onSubmit={handleSubmit} action="">
            <label htmlFor="">Sarlavha</label>
            <input value={state.title} onChange={e=>setState({...state, title:e.target.value})} required type="text" />
            <label htmlFor="">Mavzu</label>
            <textarea value={state.desc} onChange={e=>setState({...state, desc:e.target.value})} required name="" id="" cols="30" rows="10"></textarea>
            <div className='create__modal-btns'>
                <button disabled={loading} className='btn blue'>{loading? "Yuklanyapti": "Qo'shish"}</button>
                <button onClick={()=> setModal(false)} className='btn red'>Bekor qilish</button>
            </div>
        </form>
    </div>
    </>
  )
}

export default CreateModal