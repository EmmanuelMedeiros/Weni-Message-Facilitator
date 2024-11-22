export default interface Message {
    Date: string,
    ContactUUID: string,
    Name: string,
    Direction: "IN"|"OUT"
}