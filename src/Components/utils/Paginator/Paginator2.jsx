import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import s from './Paginator.module.css';


const Paginator =({itemsTotalCount, pageSize, currentPage,setCurrentPage})=>{
    //itemsTotalCount количество всех элементов
    //pageSize количество элементов на одной странице 
    // currentPage номер страницы на которой находимся, вначале =1
    
    const dispatch = useDispatch()

    const [portion, setPortion] = useState(1); //номер порции на которой находимся, вначале =1
    const [portionSize, setPortionSize] = useState(10); //количество страниц в одной порции
    let pages = [];
    let pagesCount=Math.ceil(itemsTotalCount/pageSize);
    let portionCount = Math.ceil(pagesCount/portionSize);

    for (let i = 1; i <= pagesCount; i++) {
        pages[i - 1] = { id: i, value: i } 
    }

    return(
    <div>
        {portion>1 && <button onClick={()=>setPortion((prevState)=>prevState-1)}> PREV </button> }

        {pages.filter(i=> i.value>=(1+portion*portionSize-portionSize) && i.value<=portion*portionSize).map(p=><span className={currentPage===p.value ? s.selectedPage : undefined} key={p.id} onClick={(e)=>{dispatch(setCurrentPage(Number(e.currentTarget.innerText)))}} > {p.value} </span>)}

        {portion<portionCount && <button onClick={()=>setPortion((prevState)=>prevState+1)} > NEXT </button> }
    </div>
   )
}
export default Paginator;