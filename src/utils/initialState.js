const initialState = {
  data: [],
  filter: {
    "-": true,
    S: true,
    M: true,
    KD: true,
    SD: true,
    L: true,
    C: true,
    V: true,
    MP: true,
    ageRange: [24, 87]
  },
  sort: "parti",
  ascOrder: false,
  filteredData: [],
  overallActivity: 0,
  mobileOpen: false,
  parties: [
    { title: "Politiska vildar", name: "-" },
    { title: "Centerpartiet", name: "C" },
    { title: "Kristdemokraterna", name: "KD" },
    { title: "Liberalerna", name: "L" },
    { title: "Moderaterna", name: "M" },
    { title: "Miljöpartiet", name: "MP" },
    { title: "Socialdemokraterna", name: "S" },
    { title: "Sverigedemokraterna", name: "SD" },
    { title: "Vänsterpartiet", name: "V" }
  ]
};

export default initialState;
