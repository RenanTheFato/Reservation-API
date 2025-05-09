export interface Reservation {
  id: string,
  userId: string,
  roomId: string,
  startTime: Date,
  endTime: Date,
  createdAt: Date,
  updatedAt: Date,
}