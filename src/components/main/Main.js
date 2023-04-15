import React, {useState, useEffect} from 'react'
import "./Main.css"
import {AiOutlinePlus} from "react-icons/ai"
import CreateModal from '../create-modal/CreateModal'
import axios from '../../api'

const template = [
  {
    type: "plan",
    title: "Reja"
  },
  {
    type: "progress",
    title: "Jarayonda"
  },
  {
    type: "ignore",
    title: "Bekor qilindi"
  },
  {
    type: "done",
    title: "Bajarildi"
  },
]

function Main() {
  const [modal, setModal] = useState(false)
  const [data, setData] = useState([])
  const [refresh, setRefresh] = useState(false)

  useEffect(()=>{
    axios.get("/posts")
      .then(res=> setData(res.data))
      .catch(err=> console.log(err))
  }, [refresh])
  

  const handleDelete = (id)=>{
    axios.delete(`/posts/${id}`)
      .then(res => setRefresh(p=>!p))
      .catch(err => console.log(err))
  }

  const handleChangeStatus = (item, value) => {
    axios.put(`/posts/${item.id}`, {...item, status: value})
      .then(res => setRefresh(p=>!p))
      .catch(err => console.log(err))
  }

  return (
    <>
      <div className='main'>
          <h2 className='main__title'>Kanban Board</h2>
          <button onClick={()=> setModal(true)} className='btn blue'><AiOutlinePlus/> Qo'shish</button>
          <div className="main__content">
            {
              template?.map(({title, type}, inx)=>   <div key={inx} className={`main__item ${type}`}>
              <h3 className="main__item-title ">{title}</h3>
              {
                data?.filter(({status})=> status === type)?.map((item)=> <div key={item.id} className="main__box">
                <h4>{item.title}</h4>
                <p>{item.desc}</p>
                <span>{item.time}</span>
                <select defaultValue={item.status} onChange={(e)=>handleChangeStatus(item, e.target.value)} name="" id="">
                  <option value="plan">reja</option>
                  <option value="progress">jarayonda</option>
                  <option value="ignore">bekor qilindi</option>
                  <option value="done">bajarildi</option>
                </select>
                <button onClick={()=> handleDelete(item.id)}>O'chirish</button>
              </div>)
              }
              
            </div>)
            }
          </div>
      </div>
      {modal &&  <CreateModal setModal={setModal} setRefresh={setRefresh}/>}
    </>
  )
}

export default Main