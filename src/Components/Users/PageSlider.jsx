import React, {  useState } from 'react';
import { useSelector } from 'react-redux';
import { changePageNumb } from '../../Redux/Slices/usersSlice';
import s from './Users.module.css';

const PageSlider = (props) => {
    const usersCount = useSelector(state=>state.users.usersCount);
    const pageSize = useSelector(state=>state.users.pageSize);
    let pageCount = Math.ceil(usersCount/pageSize);
    let arr = createPagesArray(10);
    const [pages, setPages] = useState(arr);
    let pagesLastIndex = pages.length-1;


    let onClick=(func)=> {
        let pages2 = [...pages];
        func();
        setPages(pages2);
    }
    function createPagesArray(elementsCount) {
        let array = []
        for (let i = 1; i <= elementsCount; i++) {
            array[i - 1] = { id: i, value: i }
        }
        return array;
    }
    function goright(){
        for (let i = 0; i < pages.length; i++) {
           pages[i].value+=pages.length ;
        }
     }
    function  goleft(){
        pages.forEach(element => {
            element.value-=pages.length
        });
     }

    return (
        <div className={s.pages}>
            {pageCount<pagesLastIndex+2 ? undefined 
                          : <button onClick={()=> { onClick(goleft)}} disabled={pages[0].value===1} >Назад</button>}
           {pages.map(p => p.value<=pageCount 
                                ? <span className={Number(props.pageNumb)===p.value ? s.selectedPage : undefined} key={p.id} onClick={(e)=>props.dispatch(changePageNumb(e.currentTarget.innerText))}>{p.value}</span> 
                                : <span key={p.id}></span>)} 
           {pageCount<pagesLastIndex+2 ? undefined 
                         : <button onClick={()=> { onClick(goright)}} disabled={pages[pagesLastIndex].value>pageCount}>Вперед</button>}
        </div>
    )
}
export default PageSlider;