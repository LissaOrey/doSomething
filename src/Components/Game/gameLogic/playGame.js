
import { addNum } from "./addNumber";
import { gameConditions } from "./gameConditions";

export const changeArrData = (copy, arr) => {
    copy.forEach(element => {
        let x = element.x;
        let y = element.y;
        arr[x][y] = element.value;
    });
}
export const goTo = (somewhere,field,setField,score, setScore) => {
    let copy1 = field.map(f => ({ ...f }));
    let copy = field.map(f => ({ ...f }));
    //здесь мы меняем структуру данных(делаем из массива с объектами массив с 4 массивами), чтобы функция gameCondition сработала
    // change array with objects to array with 4 arrays
    let arr = [
        [], [], [], []
    ];
    changeArrData(copy, arr);//add values of copy in array
    somewhere(copy, arr, setScore, score);
    // add number(2) in the game field only when values in array(field) changed
    if (JSON.stringify(copy1) === JSON.stringify(copy)) {
        return undefined
    } else {
        addNum(copy, arr, changeArrData, setField);//разблокировать
    }
}

export const goUp = (copy, arr, setScore, score ) => {
    copy.forEach(el => {
        for (let i = 0; i < arr.length; i++) {
            const [a, b, c, d] = gameConditions(arr[3][i], arr[2][i], arr[1][i], arr[0][i],  setScore, score);
            if (el.x === 3 && el.y === i)  el.value = a;
            if (el.x === 2 && el.y === i) el.value = b;
            if (el.x === 1 && el.y === i) el.value = c;
            if (el.x === 0 && el.y === i) el.value = d;
        }
    })
}
export const goRight = (copy, arr, setScore, score) => {
    copy.forEach(el => {
        for (let i = 0; i < arr.length; i++) {
            const [a, b, c, d] = gameConditions(arr[i][0], arr[i][1], arr[i][2], arr[i][3], setScore, score);
            if (el.x === i && el.y === 0) el.value = a;
            if (el.x === i && el.y === 1) el.value = b;
            if (el.x === i && el.y === 2) el.value = c;
            if (el.x === i && el.y === 3) el.value = d;
        }
    })
    

}
export const goLeft = (copy, arr, setScore, score) => {
    copy.forEach(el => {
        for (let i = 0; i < arr.length; i++) {
            const [a, b, c, d] = gameConditions(arr[i][3], arr[i][2], arr[i][1], arr[i][0], setScore, score);
            if (el.x === i && el.y === 0) el.value = d
            if (el.x === i && el.y === 1) el.value = c
            if (el.x === i && el.y === 2) el.value = b
            if (el.x === i && el.y === 3) el.value = a
        }
    })

}
export const goDown = (copy, arr, setScore, score) => {
    copy.forEach(el => {
        for (let i = 0; i < arr.length; i++) {
            const [a, b, c, d] = gameConditions(arr[0][i], arr[1][i], arr[2][i], arr[3][i], setScore, score);
            if (el.x === 3 && el.y === i) el.value = d;
            if (el.x === 2 && el.y === i) el.value = c;
            if (el.x === 1 && el.y === i) el.value = b;
            if (el.x === 0 && el.y === i) el.value = a;
        }
    })

}