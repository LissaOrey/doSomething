//координаты первых двух чисел при старте игры
const randomCoordinates = () => {
    let h = 4;
    let a = Math.floor(Math.random() * h);
    let b = Math.floor(Math.random() * h);
    let c = Math.floor(Math.random() * h);
    let d = Math.floor(Math.random() * h);
    return [a, b, c, d]
}
function addRandomCoordinates(copy,k1, k2, k3, k4, x, y) {
    copy.forEach(el => {
        if (el.x === k1 && el.y === k2) {
            el.value = x;
        } else if (el.x === k3 && el.y === k4) {
            el.value = y;
        }
    })
}
//добавление рандомно чисел  2 или 4 на игровое поле при старте 

export const startRandom = (copy, setField) => {
    //copy - это копия массива field
    
    let randomNumber = Math.floor(Math.random() * 2);
    let [k1, k2, k3, k4] = randomCoordinates();
    switch (randomNumber) {
        case 0:
            if (k2 === k4 && k1 === k3) {
                //start again if numbers coordinates =/ example [0][1] and [0][1] 
                startRandom(copy, setField);
            } else {
                addRandomCoordinates(copy, k1, k2, k3, k4, 2, 4)
            }
            break;
        case 1:
            if (k2 === k4 && k1 === k3) {
                startRandom(copy,setField);
            } else {
                addRandomCoordinates(copy, k1, k2, k3, k4, 2, 2)
            }
            break;
        default:
            return copy;
    }
    setField(copy);
}


//  export const restart = (field, setField, setScore) => {
  
//     let copy = field.map(f => ({ ...f }));
//     copy.forEach(el => {
//         el.value = '';
//     })
//     // datas saves in startRandom function
//     startRandom(copy,setField)
//     setScore(0)
// }