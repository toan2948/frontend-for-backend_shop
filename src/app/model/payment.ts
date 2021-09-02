export default interface Payment {
  order: string,
  id: number,
  method: {
    name: string
  }
}
