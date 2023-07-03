import { wineData } from "./constants";
import { WineData } from "./types";

export function groupWinesByAlcohol(): Record<number, WineData[]> {
  const wineObject: Record<number, WineData[]> = {};

  for (const wine of wineData) {
    const alcoholLevel: number = wine.Alcohol;

    if (wineObject.hasOwnProperty(alcoholLevel)) {
      wineObject[alcoholLevel].push(createGamma(wine));
    } else {
      wineObject[alcoholLevel] = [createGamma(wine)];
    }
  }

  return wineObject;
}

function createGamma(wine: WineData): WineData {
  const ash = Number(wine["Ash"]);
  const hue = Number(wine["Hue"]);
  const magnesium = Number(wine["Magnesium"]);

  if (!isNaN(ash) && !isNaN(hue) && !isNaN(magnesium)) {
    const gamma = (ash * hue) / magnesium;
    wine["Gamma"] = gamma.toFixed(3);
  }
  return wine;
}

export function calculateMean(data: WineData[], key: string): string {
  const flavanoidsValues: number[] = data.map((wine: WineData) => {
    const flavanoids = Number(wine[key]);
    return isNaN(flavanoids) ? 0 : flavanoids;
  });
  if (flavanoidsValues.length === 0) {
    return "0";
  }

  const sum: number = flavanoidsValues.reduce(
    (acc: number, num: number) => acc + num,
    0
  );
  const mean: number = sum / flavanoidsValues.length;

  return mean.toFixed(3);
}

export function calculateMode(data: WineData[], key: string): any[] {
  const counts: { [value: string]: number } = {};

  for (const wine of data) {
    const value = wine[key];
    if (value) {
      if (counts[value]) {
        counts[value]++;
      } else {
        counts[value] = 1;
      }
    }
  }

  let maxCount = 0;
  const modeValues: any[] = [];

  for (const value in counts) {
    if (counts[value] > maxCount) {
      modeValues.splice(0, modeValues.length, value);
      maxCount = counts[value];
    } else if (counts[value] === maxCount) {
      modeValues.push(value);
    }
  }

  return modeValues;
}

export function calculateMedian(data: WineData[], key: string): string {
  const values: number[] = [];

  for (const wine of data) {
    const value = Number(wine[key]);
    if (!isNaN(value)) {
      values.push(value);
    }
  }

  const sortedData = values.slice().sort((a, b) => a - b);
  const length = sortedData.length;
  const middle = Math.floor(length / 2);

  if (length % 2 === 0) {
    return ((sortedData[middle - 1] + sortedData[middle]) / 2).toFixed(3);
  } else {
    return sortedData[middle].toFixed(3);
  }
}
