export const unitMap = new Map([
    ["1", 'm']
  ]);

  export const metreMap = new Map([
    ["1", 'mm'],
    ["2", 'cm'],
    ["3", 'dm'],
    ["4", 'm']
  ]);

  export const currencyMap = new Map([
    ["1", "zł"]
  ]);

  export const metreConverter = (value :string)=>{
    const metreEnumMap = new Map([
      ["mm", "MILI"],
      ["cm", "CENTY"],
      ["dm", "DECY"],
      ["m", "METER"]]);
    return metreEnumMap.get(value);
  }