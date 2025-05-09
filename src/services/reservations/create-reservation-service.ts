import { Reservation } from "@prisma/client";

export class CreateReservationService{
  async execute({ userId, roomId, startTime, endTime }: Pick<Reservation, 'userId' | 'roomId' | 'startTime' | 'endTime'>){
    
  }
}