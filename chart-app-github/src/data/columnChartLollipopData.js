// Set data
let columnChartLollipopData = []
let value = 120

let names = [
  "Raina",
  "Demarcus",
  "Carlo",
  "Jacinda",
  "Richie",
  "Antony",
  "Amada",
  "Idalia",
  "Janella",
  "Marla",
  "Curtis",
  "Shellie",
  "Meggan",
  "Nathanael",
  "Jannette",
  "Tyrell",
  "Sheena",
  "Maranda",
  "Briana",
  "Rosa",
  "Rosanne",
  "Herman",
  "Wayne",
  "Shamika",
  "Suk",
  "Clair",
  "Olivia",
  "Hans",
]

for (let i = 0; i < names.length; i++) {
  value += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 5)
  columnChartLollipopData.push({ category: names[i], value: value })
}

export default columnChartLollipopData
