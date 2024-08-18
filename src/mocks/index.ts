export const prizesMock = [
  {
    id: 1,
    name: "100$",
    color: "yellow",
    value: 100,
  },
  {
    id: 2,
    name: "200$",
    color: "pink",
    value: 200,
  },
  {
    id: 3,
    name: "300$",
    color: "yellow",
    value: 300,
  },
  {
    id: 4,
    name: "400$",
    color: "pink",
    value: 400,
  },
  {
    id: 5,
    name: "500$",
    color: "yellow",
    value: 500,
  },
  {
    id: 6,
    name: "600$",
    color: "pink",
    value: 600,
  },
  // {
  //   id: 7,
  //   name: "700$",
  //   color: "pink",
  // value: 700
  // },
  // {
  //   id: 8,
  //   name: "800$",
  //   color: "pink",
  // value: 800
  // },
];

export type Prize = (typeof prizesMock)[0];
