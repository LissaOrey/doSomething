import React, {  useState } from 'react';
import { useSelector } from 'react-redux';
import { changePageNumb } from '../../../Redux/Slices/usersSlice';
import s from './Paginator.module.css';

const PageSlider = (props) => {
    const usersCount = useSelector(state=>state.users.usersCount);
    const pageSize = useSelector(state=>state.users.pageSize);
    let pageCount = Math.ceil(usersCount/pageSize);
    let arr = createPagesArray(10);
    const [pages, setPages] = useState(arr);
    let pagesLastIndex = pages.length-1;


    const onClick=(func)=> {
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
    function pageRight(){
        for (let i = 0; i < pages.length; i++) {
           pages[i].value+=pages.length ;
        }
    }

    function  pageLeft(){
        pages.forEach(element => {
            element.value-=pages.length
        });
    }

    return (
        <div className={s.pages}>
            {pages[0].value===1 ? undefined 
                          : <button onClick={()=> { onClick(pageLeft)}} >Назад</button>}
           {pages.map(p => p.value<=pageCount 
                                ? <span className={props.pageNumb===p.value ? s.selectedPage : undefined} key={p.id} onClick={(e)=>props.dispatch(changePageNumb(Number(e.currentTarget.innerText)))}>{p.value}</span> 
                                : <span key={p.id}></span>)} 
           {pages[pagesLastIndex].value>=pageCount ? undefined 
                         : <button onClick={()=> { onClick(pageRight)}} >Вперед</button>}
        </div>
    )
}
export default PageSlider;