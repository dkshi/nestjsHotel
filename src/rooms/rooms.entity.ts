import { Guest } from "src/guests/guests.entity";
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn, PrimaryColumn } from "typeorm";

@Entity('rooms')
export class Room{
    @PrimaryColumn()
    room_id: number;

    @Column()
    capacity: number;

    @Column()
    beds_count: number;

    @Column()
    description: string;

    @OneToMany(() => Guest, (guest) => guest.room)
    @JoinTable({
      name: 'guest_room',
      joinColumn: {name: 'room_id'},
      inverseJoinColumn: {name: 'guest_id'}
    })
    guests: Guest[];
}

/*
  {
    "room_id": 1,
    "capacity": 2,
    "beds_count": 2,
    "description": "Уютная комната."
  }
*/