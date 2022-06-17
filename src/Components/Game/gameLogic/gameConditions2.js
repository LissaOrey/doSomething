

switch (key) {
    case value:
        
        break;

    default:
        break;
}
 // это функция, которая обрабатывает данные клеток игры при нажатии кнопок вверх, вниз, вправо,влево
 export const gameConditions = (a, b, c, d, setScore, score) => {
    // a,b,c,d это клетки игры(данные из массива)
    // a,b,c,d - cells of game (array's datas/values)
    if (a === '' && b !== '' && c !== '' && d !== '') {
        if (d !== c && c === b) {
            c = String(b * 2);
            b = '';
            setScore(score + Number(c))
            // setScore((prevScore)=> prevScore + Number(c))
        } else if (d === c) {
            d = String(c * 2);
            c = b;
            b = '';
            setScore(score + Number(d))
        }
    } else if (a !== '' && b === '' && c !== '' && d !== '') {
        if (d !== c && c === a) {
            c = String(a * 2);
            b = '';
            a = '';
            setScore(score + Number(c))
        } else if (d !== c && c !== a) {
            b = a;
            a = '';
        } else if (d === c) {
            d = String(c * 2);
            c = a;
            a = '';
            b = '';
            setScore(score + Number(d))
        }
    } else if (a !== '' && b !== '' && c === '' && d !== '') {
        if (d !== b && b !== a) {
            c = b;
            b = a;
            a = '';
        } else if (d !== b && b === a) {
            c = String(b * 2);
            b = '';
            a = '';
            setScore(score + Number(c))
        } else if (d === b) {
            d = String(b * 2);
            c = a;
            b = '';
            a = '';
            setScore(score + Number(d))
        }
    } else if (a !== '' && b !== '' && c !== '' && d === '') {
        if (c !== b && b !== a) {
            d = c;
            c = b;
            b = a;
            a = '';
        } else if (c !== b && b === a) {
            d = c;
            c = String(b * 2);
            b = '';
            a = '';
            setScore(score + Number(c))
        } else if (c === b) {
            d = String(c * 2);
            c = a;
            b = '';
            a = '';
            setScore(score + Number(d))
        }
    } else if (a === '' && b !== '' && c !== '' && d === '') {
        if (b !== c) {
            d = c;
            c = b;
            b = '';
            a = '';
        } else {
            d = String(c * 2);
            c = '';
            b = '';
            a = '';
            setScore(score + Number(d))
        }
    } else if (a !== '' && b === '' && c !== '' && d === '') {
        if (a === c) {
            d = String(c * 2);
            c = '';
            b = '';
            a = '';
            setScore(score + Number(d))
        } else {
            d = c;
            c = a;
            a = '';
        }
    } else if (a === '' && b !== '' && c === '' && d !== '') {
        if (d === b) {
            d = String(b * 2);
            b = '';
            setScore(score + Number(d))
        } else {
            c = b;
            b = '';
        }
    } else if (a !== '' && b === '' && c === '' && d !== '') {
        if (a === d) {
            d = String(a * 2);
            a = '';
            setScore(score + Number(d))
        } else {
            c = a;
            a = '';
        }
    } else if (a === '' && b === '' && c !== '' && d !== '' && d === c) {
        d = String(c * 2);
        c = '';
        setScore(score + Number(d))
    } else if (a !== '' && b !== '' && c === '' && d === '') {
        if (a === b) {
            d = String(a * 2);
            a = '';
            b = '';
            setScore(score + Number(d))
        } else {
            d = b;
            c = a;
            b = '';
            a = '';
        }
    } else if (a !== '' && b !== '' && c !== '' && d !== '') {
        if (d !== c && c !== b && b === a) {
            b = String(a * 2);
            a = '';
            setScore(score + Number(b))
        } else if (d !== c && c === b) {
            c = String(b * 2);
            b = a;
            a = '';
            setScore(score + Number(c))
        } else if (d === c && b === a) {
            d = String(c * 2);
            c = String(b * 2);
            b = '';
            a = '';
            setScore(score + Number(d)+ Number(c))
        } else if (d === c && b !== a) {
            d = String(c * 2);
            c = b;
            b = a;
            a = '';
            setScore(score + Number(d))
        }
    } else if (a !== '' && b === '' && c === '' && d === '') {
        d = a;
        a = '';
    } else if (a === '' && b !== '' && c === '' && d === '') {
        d = b;
        b = '';
    } else if (a === '' && b === '' && c !== '' && d === '') {
        d = c;
        c = '';
    }
    return [a, b, c, d];
}


