import { IsNotEmpty } from "class-validator";
import { Appeal } from "src/appeals/appeals.entity";
import { Room } from "src/rooms/rooms.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";



@Entity('guests')
export class Guest{
    @PrimaryGeneratedColumn()
    guest_id: number;

    @Column()
    lastname: string;

    @Column()
    firstname: string;

    @Column()
    secondname: string;

    @Column()
    email: string;

    @Column()
    phone: string;

    @OneToMany(() => Appeal, (appeal) => appeal.guest)
    @JoinTable({
      name: 'guest_appeal',
      joinColumn: {name: 'guest_id'},
      inverseJoinColumn: {name: 'appeal_id'}
    })
    appeals: Appeal[]

    @ManyToOne(() => Room, (room) => room.guests)
    @IsNotEmpty()
    @JoinTable({
      name: 'guest_room',
      joinColumn: {name: 'guest_id'},
      inverseJoinColumn: {name: 'room_id'}
    })
    room: Room
}

/*
  {
    "guest_id": 1,
    "room_id": 1,
    "lastname": "Савосин",
    "firstname": "Александр",
    "secondname": "Александрович",
    "email": "gusgusevich@bk.ru",
    "phone": "+79153572644"
  }
*/