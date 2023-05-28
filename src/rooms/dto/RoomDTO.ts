import { Guest } from "src/guests/guests.entity";

export class CreateRoomDto{
    room_id: number;
    capacity: number;
    beds_count: number;
    description: string;
    guests: Guest[];
}