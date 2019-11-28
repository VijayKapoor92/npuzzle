import {STORAGE_DATABASE, STORAGE_CONFIG_DATABASE, PUZZLE_MODE_3X3} from "../utils/constants";

export
  const Storage = {
    db: localStorage.getItem(STORAGE_DATABASE),
    response: () => ({status: 1, message: ""}),
    connect: () => {
      if (!("localStorage" in window)) {
        alert("Erro ao conectar!");
        return;
      }

      Storage.createDB();
      StorageScores.createDB();
    },
    getLastId: () => Storage.get().length,
    createDB: () => {
      if (Storage.db && Storage.db.length)
        return;

      localStorage.setItem(STORAGE_DATABASE, Data.push([]));
    },
    insert: (game) => {
      let g = Storage.get();
      if (g.filter(gg => gg.id === game.id).length)
        return;

      for (let i = 0; i < g.length; i++)
        if (g[i].status === "saved")
          g[i].status = "stop";

      g.push(game);
      localStorage.setItem(STORAGE_DATABASE, Data.push(g));
    },
    update: ({id, status, puzzle, steps}) => {
      const game = Storage.get();
      const g = game.filter(dd => dd.id === id).map(dd => {
        dd.status = status;
        dd.puzzle = puzzle;
        dd.steps = steps;
        return dd;
      });
      localStorage.setItem(STORAGE_DATABASE, Data.push(game));
    },
    delete: id => {
      const d = Storage.get();
      const game = d.filter(dd => dd.id !== id);
      localStorage.setItem(STORAGE_DATABASE, Data.push(game));
    },
    get: () => Data.pull(localStorage.getItem(STORAGE_DATABASE))
  },
  StorageScores = {
    db: localStorage.getItem("scores"),
    connect: () => {
      if (!("localStorage" in window)) {
        alert("Erro ao conectar!");
        return;
      }

      StorageScores.createDB();
    },
    createDB: () => {
      if (StorageScores.db && StorageScores.db.length)
        return;

      localStorage.setItem("scores", Data.push([]));
    },
    insert: score => {
      let g = StorageScores.get();
      // if (g.filter(gg => gg.id === game.id).length)
      //   return;

      console.log(score);

      g.push(score);
      localStorage.setItem("scores", Data.push(g));
    },
    get: () => Data.pull(localStorage.getItem("scores"))
  };

const Data = {
  push: (data) => JSON.stringify(data),
  pull: (data) => JSON.parse(data),
  content: [],
  filterById: id => Storage.get().filter(s => s.id === Storage.getId())
};