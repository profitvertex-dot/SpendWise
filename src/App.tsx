import {useState} from 'react'
import './index.css'
export default function App(){
 const [amt,setAmt]=useState(0)
 return <div style={{maxWidth:400,margin:'0 auto',padding:20}}>
  <h1>SpendWise - Track • Plan • Save • Grow</h1>
  <div style={{background:'#f5f5f5',padding:20,borderRadius:12,marginTop:20}}>
   <h2>This Month: ₹{amt}</h2>
   <p>App chal gaya! 🎉</p>
  </div>
 </div>
}
