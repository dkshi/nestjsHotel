import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('bookings')
export class Booking{
    @PrimaryGeneratedColumn()
    booking_id: number;

    @Column()
    email: string;

    @Column()
    phone: string;

    @Column()
    startdate: Date;

    @Column()
    enddate: Date;
}

