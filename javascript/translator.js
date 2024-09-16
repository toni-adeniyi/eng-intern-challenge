const braille = {
  'a' : 'O.....',
  'b' : 'O.O...',
  'c' : 'OO....',
  'd' : 'OO.O..',
  'e' : 'O..O..',
  'f' : 'OOO...',
  'g' : 'OOOO..',
  'h' : 'O.OO..',
  'i' : '.OO...',
  'j' : '.OOO..',
  'k' : 'O...O.',
  'l' : 'O.O.O.',
  'm' : 'OO..O.',
  'n' : 'OO.OO.',
  'o' : 'O..OO.',
  'p' : 'OOO.O.',
  'r' : 'OOOOO.',
  's' : '.OO.O.',
  't' : '.OOOO.',
  'u' : 'O...OO',
  'v' : 'O.O.OO',
  'w' : '.OOO.O',
  'x' : 'OO..OO',
  'y' : 'OO.OOO',
  'z' : 'O..OOO',
  '1' : 'O.....',
  '2' : 'O.O...',
  '3' : 'OO....',
  '4' : 'OO.O..',
  '5' : 'O..O..',
  '6' : 'OOO...',
  '7' : 'OOOO..',
  '8' : 'O.OO..',
  '9' : '.OO...',
  '0' : '.OOO..',
  'capital follows' : '.....O',
  'decimal follows' : '.O...O',
  'number follows' : '.O.OOO',
  '.' : '..OO.O',
  ',' : '..O...',
  '?' : '..O.OO',
  '!' : '..OOO.',
  ':' : '..OO..',
  ';' : '..O.O.',
  '-' : '....OO',
  '/' : '.O..O.',
  '<' : '.OO..O',
  '>' : 'O..OO.',
  '(' : 'O.O..O',
  ')' : '.O.OO.',
  ' ' : '......',
}
const brailleLetters = {
  'a' : 'O.....',
  'b' : 'O.O...',
  'c' : 'OO....',
  'd' : 'OO.O..',
  'e' : 'O..O..',
  'f' : 'OOO...',
  'g' : 'OOOO..',
  'h' : 'O.OO..',
  'i' : '.OO...',
  'j' : '.OOO..',
  'k' : 'O...O.',
  'l' : 'O.O.O.',
  'm' : 'OO..O.',
  'n' : 'OO.OO.',
  'o' : 'O..OO.',
  'p' : 'OOO.O.',
  'r' : 'OOOOO.',
  's' : '.OO.O.',
  't' : '.OOOO.',
  'u' : 'O...OO',
  'v' : 'O.O.OO',
  'w' : '.OOO.O',
  'x' : 'OO..OO',
  'y' : 'OO.OOO',
  'z' : 'O..OOO',
  '.' : '..OO.O',
  ',' : '..O...',
  '?' : '..O.OO',
  '!' : '..OOO.',
  ':' : '..OO..',
  ';' : '..O.O.',
  '-' : '....OO',
  '/' : '.O..O.',
  '<' : '.OO..O',
  '>' : 'O..OO.',
  '(' : 'O.O..O',
  ')' : '.O.OO.',
  ' ' : '......',
}
let input = process.argv.slice(2);
let translated = '';
let keys = Object.keys(braille);
let keysLetters = Object.keys(brailleLetters);
input.forEach((word) => {
  console.log(word.length)
  if(word.length < 6){
    // it is english automatically so translate to braille
    if(Number.parseInt(word)){
      translated = braille['number follows'];
    }
    for(let i = 0; i < word.length; i++){
      let capital = /^[A-Z]/;
      if(word[i].match(capital)){
        translated += braille["capital follows"];
        word = word.replace(word[i], word[i].toLowerCase())
      }

      translated += (braille[word[i]]);
    }
    console.log(translated);
  } else{
    let count = 0;
    for (let i = 0; i < 6; i++) {
      const element = word[i];
      if(element == 'O' || element == '.'){
        count++;
      }
    }
    if (count == 6){
      // it is braille so translate to english
      // slice the word into 6, translate it and then add it to the translate string
      // maybe have a loop that increments in the power of 6 so it would translate 6 characters into a letter at once
      let first = 0;
      if(word.length < 7){
        translated = keys.find(key => 
          braille[key] == word
        );
      } else{
        let capitalize = false;
        let numeric = false
        let res
        for(let i = 6; i <= word.length; i+=6){
          let value = word.slice(first, i);
          if(value !== '.O.OOO' && value !== '.O...O' && value !== '.....O'){
            if(numeric){
              res = keys.find(key => braille[key] == value)
              console.log(res)
              if(res === ' '){
                numeric = false;
              }
            }
            else{
              res = keysLetters.find(key => brailleLetters[key] == value);
              if(capitalize){
                res = res.toUpperCase();
                capitalize = false;
              }
            }
           
            translated += res;
            console.log(translated)
          }
          else if(value === '.....O'){
            capitalize = true;
          }
          else if(value === '.O.OOO'){
            numeric = true;
          }
          first+=6;
        }
      }
    }
    else{
      if(Number.parseInt(word)){
        translated = braille['number follows'];
      }
      for(let i = 0; i < word.length; i++){
        console.log(word[i]);
        const capital = /^[A-Z]/;
        if(word[i].match(capital)){
          translated += braille["capital follows"];
          word = word.replace(word[i], word[i].toLowerCase())
        }
        translated += braille[word[i]];

      }
    }
    console.log(translated);
  }})