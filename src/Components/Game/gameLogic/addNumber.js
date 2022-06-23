export const addNum = (copy, arr, changeArrData, setField) => {
    //ф-ция доб цифру 2 на игровое поле
    let arr2 = [];//сюда доб все свободные клетки массива arr
    changeArrData(copy, arr);//copy и arr из ф-й goUp, goDown, goRight, goLeft
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < arr.length; j++) {
            let item = arr[i]
            if (item[j] === 0) {
                arr2.push(i + String(j))
            }
        }
    }
    if (arr2.length === 0) {
        return undefined;
    }
    let random = Math.floor(Math.random() * (arr2.length - 1));
    let coordinateRandomEmptyCell = arr2[random];
    let a = Number(coordinateRandomEmptyCell[0]);
    let b = Number(coordinateRandomEmptyCell[1]);
    copy.forEach(el => {
        if (el.x === a && el.y === b) {
            arr[a][b] = 2;
            el.value = 2;
        }
    })
    setField(copy)
}