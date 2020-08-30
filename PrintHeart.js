const fillSquare = '@@'
const blankSquare = '  '
//優化1 試著將變數減少 嘗試用array
let line = []

//優化2 把所有array用0和1寫出來; 0為空白格; 1為@@
//優化2 為新function heart2
function heart2() {
  let string = ''
  const lines = [
    [0, 0, 1, 0, 0, 0, 1, 0, 0],
    [0, 1, 1, 1, 0, 1, 1, 1, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1],
    [0, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 0, 1, 1, 1, 1, 1, 0, 0],
    [0, 0, 0, 1, 1, 1, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 0, 0]
  ]
  for (i = 0; i <= 8; i++) {
    //line.push('\n')
    string += '\n';
    //console.log(lines[i])
    for (n = 0; n <= 8; n++) {
      //console.log(lines[i][n])
      if (lines[i][n] === 0) {
        //line.push(blankSquare)
        string += blankSquare
      } else {
        //line.push(fillSquare)
        string += fillSquare
      }
    }
  }
  return string
}
console.log(heart2())
console.log(`\n 七夕過了，情人節快樂！`)

//接續第4列程式碼 (優化1)
function heart() {
  //第一行
  line.push('\n')
  for (let i = 1; i <= 9; i++) {
    if (i === 3 || i === 7) {
      line.push(fillSquare)
    } else {
      line.push(blankSquare)
    }
  }
  //第二行
  line.push('\n')
  for (let i = 1; i <= 9; i++) {
    if (i === 1 || i === 5 || i === 9) {
      line.push(blankSquare)
    } else {
      line.push(fillSquare)
    }
  }
  //第三行到第五行
  for (let n = 1; n <= 3; n++) {
    line.push('\n')
    for (let i = 1; i <= 9; i++) {
      line.push(fillSquare)
    } 
  }
  //第六行到第九行
  line.push('\n')
  line.push(blankSquare)
  //第六行
  for (let i = 1; i <= 7; i ++) {
    line.push(fillSquare)
  } 
  //第七行
  line.push('\n')
  line.push(blankSquare)
  line.push(blankSquare)
  for (let i = 1; i <= 5; i++) {
    line.push(fillSquare)
  }
  //第八行
  line.push('\n')
  line.push(blankSquare)
  line.push(blankSquare)
  line.push(blankSquare)
  for (let i = 1; i <= 3; i++) {
    line.push(fillSquare)
  }
  //第九行
  line.push('\n')
  line.push(blankSquare)
  line.push(blankSquare)
  line.push(blankSquare)
  line.push(blankSquare)
  line.push(fillSquare)
  //第十行文字
  line.push('\n')
  line.push(`\n 七夕情人節快樂！`)
}
heart()
console.log(line.join(''))