import { useState, useEffect } from 'react'
import './index.css'

type Exp = { id:string, title:string, amount:number, cat:string, date:string }

const CATS = ['Food','Travel','Shopping','Bills','Health','Other']

export default function App(){
  const [exps,setExps] = useState<Exp[]>(()=> JSON.parse(localStorage.getItem('exps')||'[]'))
  const [title,setTitle] = useState(''), [amount,setAmount] = useState(''), [cat,setCat] = useState('Food')

  useEffect(()=> localStorage.setItem('exps', JSON.stringify(exps)), [exps])

  const total = exps.reduce((s,e)=>s+e.amount,0)
  const add = ()=>{
    if(!title ||!amount) return
    setExps([{id:Date.now()+'', title, amount:Number(amount), cat, date:new Date().toLocaleDateString()},...exps])
    setTitle(''); setAmount('')
  }

  return <div style={{maxWidth:420,margin:'0 auto',padding:16,fontFamily:'sans-serif'}}>
    <h2 style={{marginBottom:12}}>SpendWise 💰</h2>
    <div style={{background:'#111',color:'#fff',padding:20,borderRadius:16}}>
      <p style={{opacity:0.7}}>This Month</p>
      <h1>₹{total.toLocaleString('en-IN')}</h1>
      <p style={{marginTop:8,fontSize:13}}>Track • Plan • Save • Grow</p>
    </div>

    <div style={{background:'#f6f6f6',padding:12,borderRadius:12,marginTop:16,display:'flex',gap:8}}>
      <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Kya kharcha kiya?" style={{flex:1,padding:10,borderRadius:8,border:'1px solid #ddd'}}/>
      <input value={amount} onChange={e=>setAmount(e.target.value)} type="number" placeholder="₹" style={{width:80,padding:10,borderRadius:8,border:'1px solid #ddd'}}/>
    </div>
    <div style={{display:'flex',gap:6,marginTop:8,overflowX:'auto'}}>
      {CATS.map(c=><button key={c} onClick={()=>setCat(c)} style={{padding:'6px 12px',borderRadius:20,border:'1px solid #ddd',background:cat===c?'#111':'#fff',color:cat===c?'#fff':'#111'}}>{c}</button>)}
    </div>
    <button onClick={add} style={{width:'100%',marginTop:12,padding:14,background:'#111',color:'#fff',borderRadius:12,border:0,fontWeight:700}}>Add Expense</button>

    <div style={{marginTop:20}}>
      {exps.map(e=><div key={e.id} style={{display:'flex',justifyContent:'space-between',padding:'12px 0',borderBottom:'1px solid #eee'}}>
        <div><b>{e.title}</b><br/><small style={{color:'#888'}}>{e.cat} • {e.date}</small></div>
        <b>₹{e.amount}</b>
      </div>)}
      {exps.length===0 && <p style={{textAlign:'center',color:'#888',marginTop:40}}>No expenses yet</p>}
    </div>
  </div>
}
