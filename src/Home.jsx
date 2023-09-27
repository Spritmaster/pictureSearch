import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {BsHeartFill} from 'react-icons/bs'
import './App.css'


const Home = () => {
    const [data,setData] =useState(null)
    const [page,setPage]=useState(1)
    const [pic,setPic]=useState('all')
    const[hide,setHide]=useState('')
    const url=  `https://api.unsplash.com/search/photos?client_id=nS0ZuWjRPItGjKojIhTKZfQi5O92kbah4bbgZY2Z2LU&page=${page}&per_page=20&query=${pic}`



    useEffect(()=>{
        axios.get(url)
        .then(res => {
          setData(res)
          console.log(res);
          page >1?setHide(null):setHide('hidden')
          console.log(res);
        })
        .catch(err => console.log(err))
      },[pic ,page])

      const req=(e)=>{
        setPic(e.target.value)
        if(e.target.value ==''){
            setPic('all')
        }
      }

const plus=()=>{
      if(data.data.total_pages>page){
        let count=page
        count+=1
        setPage(count)
      }}
      const minus=()=>{
        if(1 < page){
            let count=page
            count-=1
            setPage(count)
        }
        }
        
  return (
    <div> 
        
        <div className='bg-warning inline-block py-[8px] ml-[30px] pl-3 pr-[70px] rounded-[5px] mt-10'>
        <input 
        type="text" 
        name="" id="" 
        placeholder='Search picture name...'
        className='border-none outline-none text-xl bg-warning placeholder:text-[#000] text-[#000]'
        onChange={(e)=>{req(e)}}
        />
        </div>
        <div className='container px-4 grid gap-[50px] justify-items-center grid-cols-[repeat(auto-fit,minmax(300px,1fr))]  mx-auto mt-12'>
        {data ? data.data.results.map((picture)=>{
            const {id , urls ,likes , user} =picture
            return (
                <div  className='p-2  parent relative overflow-hidden rounded-[5px]' style={{background:picture.color}} key={id}>
                    <div className='absolute child z-100 top-[-60%] left-0 p-4  w-full h-[120px] text-[#000]  bg-[#ecbf36]   '>

                       <div className='flex  items-center gap-3 font-bold text-[18px]'><BsHeartFill className='w-9 h-9 text-[#d52727]'/> {likes}</div>

                       <div className='flex gap-2 text-[17px] font-semibold items-center mt-[5px]'> <img src={user.profile_image.small} 
                       className='object-cover rounded-full' alt="" /> {user.name}</div>
                    </div>
                    <img src={urls.small} alt="" className='w-[300px]  h-[300px] object-cover duration-200 ' style={{zIndex:10}}/>
                </div>
            )
        }) :null}


    </div>
    {data ? <div className="join grid grid-cols-2 w-[200px] mx-auto mt-3">
  <button className={`join-item btn btn-outline ${hide}`} onClick={()=>{minus()}}>Previous page</button>
  <button className="join-item btn btn-outline" onClick={()=>{plus()}}>Next</button>
</div> :null}
    </div>
  )
}

export default Home