import Image from "./image";

export default interface Product {

  code: string,
  id: number,
  mainTaxon: string,
  translations: object,
  image: Image[]
}
