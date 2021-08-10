import OptionValueTranslation from "./OptionValueTranslation";

export default interface ProductOptionValue {
  id: number,
  code: string,
  translations: OptionValueTranslation
}
