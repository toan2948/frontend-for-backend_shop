import OptionValues from "./optionValues";

export default interface Variant {
  id: number,
  code: string,
  product: string,
  optionValues: OptionValues[],
  translations: {
    en_US: {
      name: string,
      id: string,
      locale: string
    }
  }
}

