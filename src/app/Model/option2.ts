import OptionValues from "./optionValues";

export default interface Option2 {
  code: string,
  values: OptionValues[],
  translations: {
    de_DE: {
      name: string,
      locale: string
    }
  }
}
