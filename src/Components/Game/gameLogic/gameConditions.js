
 // это функция, которая обрабатывает данные клеток игры при нажатии кнопок вверх, вниз, вправо,влево
 export const gameConditions = (a, b, c, d, setScore, score) => {
    // a,b,c,d это клетки игры(данные из массива)
    // a,b,c,d - cells of game (array's datas/values)
    if (a === 0 && b !== 0 && c !== 0 && d !== 0) {
        if (d !== c && c === b) {
            c = b * 2;
            b = 0;
            setScore(score + c)
            // setScore((prevScore)=> prevScore +  c))
        } else if (d === c) {
            d = c * 2;
            c = b;
            b = 0;
            setScore(score +d)
        }
    } else if (a !== 0 && b === 0 && c !== 0 && d !== 0) {
        if (d !== c && c === a) {
            c = a * 2;
            b = 0;
            a = 0;
            setScore(score + c)
        } else if (d !== c && c !== a) {
            b = a;
            a = 0;
        } else if (d === c) {
            d = c * 2;
            c = a;
            a = 0;
            b = 0;
            setScore(score + d)
        }
    } else if (a !== 0 && b !== 0 && c === 0 && d !== 0) {
        if (d !== b && b !== a) {
            c = b;
            b = a;
            a = 0;
        } else if (d !== b && b === a) {
            c = b * 2;
            b = 0;
            a = 0;
            setScore(score + c)
        } else if (d === b) {
            d = b * 2;
            c = a;
            b = 0;
            a = 0;
            setScore(score + d)
        }
    } else if (a !== 0 && b !== 0 && c !== 0 && d === 0) {
        if (c !== b && b !== a) {
            d = c;
            c = b;
            b = a;
            a = 0;
        } else if (c !== b && b === a) {
            d = c;
            c = b * 2;
            b = 0;
            a = 0;
            setScore(score + c)
        } else if (c === b) {
            d = c * 2;
            c = a;
            b = 0;
            a = 0;
            setScore(score + d)
        }
    } else if (a === 0 && b !== 0 && c !== 0 && d === 0) {
        if (b !== c) {
            d = c;
            c = b;
            b = 0;
            a = 0;
        } else {
            d = c * 2;
            c = 0;
            b = 0;
            a = 0;
            setScore(score +  d)
        }
    } else if (a !== 0 && b === 0 && c !== 0 && d === 0) {
        if (a === c) {
            d =  c * 2;
            c = 0;
            b = 0;
            a = 0;
            setScore(score +  d)
        } else {
            d = c;
            c = a;
            a = 0;
        }
    } else if (a === 0 && b !== 0 && c === 0 && d !== 0) {
        if (d === b) {
            d =  b * 2;
            b = 0;
            setScore(score +  d)
        } else {
            c = b;
            b = 0;
        }
    } else if (a !== 0 && b === 0 && c === 0 && d !== 0) {
        if (a === d) {
            d =  a * 2;
            a = 0;
            setScore(score +  d)
        } else {
            c = a;
            a = 0;
        }
    } else if (a === 0 && b === 0 && c !== 0 && d !== 0 && d === c) {
        d =  c * 2;
        c = 0;
        setScore(score +  d)
    } else if (a !== 0 && b !== 0 && c === 0 && d === 0) {
        if (a === b) {
            d =  a * 2;
            a = 0;
            b = 0;
            setScore(score +  d)
        } else {
            d = b;
            c = a;
            b = 0;
            a = 0;
        }
    } else if (a !== 0 && b !== 0 && c !== 0 && d !== 0) {
        if (d !== c && c !== b && b === a) {
            b =  a * 2;
            a = 0;
            setScore(score +  b)
        } else if (d !== c && c === b) {
            c =  b * 2;
            b = a;
            a = 0;
            setScore(score +  c)
        } else if (d === c && b === a) {
            d =  c * 2;
            c =  b * 2;
            b = 0;
            a = 0;
            setScore(score +  d+  c)
        } else if (d === c && b !== a) {
            d =  c * 2;
            c = b;
            b = a;
            a = 0;
            setScore(score +  d)
        }
    } else if (a !== 0 && b === 0 && c === 0 && d === 0) {
        d = a;
        a = 0;
    } else if (a === 0 && b !== 0 && c === 0 && d === 0) {
        d = b;
        b = 0;
    } else if (a === 0 && b === 0 && c !== 0 && d === 0) {
        d = c;
        c = 0;
    }
    return [a, b, c, d];
}


