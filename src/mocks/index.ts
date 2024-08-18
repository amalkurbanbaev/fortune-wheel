export const prizesMock = [
  {
    id: 1,
    name: "100$",
    color: "yellow",
  },
  {
    id: 2,
    name: "200$",
    color: "pink",
  },
  {
    id: 3,
    name: "300$",
    color: "yellow",
  },
  {
    id: 4,
    name: "400$",
    color: "pink",
  },
  {
    id: 5,
    name: "500$",
    color: "yellow",
  },
  {
    id: 6,
    name: "600$",
    color: "pink",
  },
  // {
  //   id: 7,
  //   name: "700$",
  //   color: "pink",
  // },
  // {
  //   id: 8,
  //   name: "800$",
  //   color: "pink",
  // },
];

export type Prize = (typeof prizesMock)[0];
