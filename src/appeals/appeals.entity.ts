import { Guest } from "src/guests/guests.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('appeals')
export class Appeal{

    @PrimaryGeneratedColumn()
    appeal_id: number;

    @Column()
    appeal_text: string;

    @ManyToOne(() => Guest, (guest) => guest.appeals)
    guest: Guest;
}


/*
  {
    "appeal_id": 1,
    "lastname": "Савосин",
    "firstname": "Александр",
    "secondname": "Александрович",
    "email": "gusgusevich@bk.ru",
    "appeal_text": "*Какое-то супер деловое обращение.*"
  }
*/