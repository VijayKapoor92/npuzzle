export const

  shuffle = squares => {
    const m = squares.length;
    let t;
    for (let i = 0; i < m; i++) {
      let n = squares[i].length, k = Math.floor(Math.random() * i), l;
      for (let j = 0; j < n; j++) {
        l = Math.floor(Math.random() * j);
        t = squares[i][j];
        squares[i][j] = squares[k][l];
        squares[k][l] = t;
      }
    }
    return squares;
  },

  getPositionZero = squares => {
    let position = {}, l = squares.length;
    for (let i = 0; i < l; i++)
      for (let j = 0; j < l; j++) {
        if (squares[i][j] === 0)
          position = {i, j};
      }

    return position;
  }

;