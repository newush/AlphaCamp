const fillSquare = '@@'
const blankSquare = '  '

let line1 = ''
let line2 = ''
let line3 = ''
let line4 = ''
let line5 = ''
let line6 = ''
let line7 = ''
let line8 = ''
let line9 = ''
let line10 = `\n 七夕情人節快樂！`

function heart() {
  for (let i = 1; i <= 9; i++) {
    if (i === 3 || i ===7) {
      line1 += fillSquare
    } else {
      line1 += blankSquare
    } 
  } 
  for (let i = 1; i <=9; i++) {
    if (i === 1 || i === 5 || i === 9) {
      line2 += blankSquare
    } else {
      line2 += fillSquare
    }
  }
  for (let i = 1; i <=9; i++) {
    line3 += fillSquare
    line4 += fillSquare
    line5 += fillSquare
  }
 for (let i = 1; i <=9; i++) {
    if (i === 1 || i === 9) {
      line6 += blankSquare
    } else {
      line6 += fillSquare
    }
  }
 for (let i = 1; i <=9; i++) {
    if (i === 1 || i === 2 || i === 8 || i === 9) {
      line7 += blankSquare
    } else {
      line7 += fillSquare
    }
  } 
  for (let i = 1; i <=9; i++) {
      if (i === 4 || i === 5 || i === 6) {
        line8 += fillSquare
      } else {
        line8 += blankSquare
      }
    }
  for (let i = 1; i <=9; i++) {
    if (i === 5) {
      line9 += fillSquare
    } else {
      line9 += blankSquare
    }
  }
} 
heart()
console.log(line1 + line2 + '\n' + line3 + '\n' + line4 + '\n' + line5 + '\n' + line6 + '\n' + line7 + '\n' +line8 + '\n' + line9 + line10 )