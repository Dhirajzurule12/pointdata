import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { Point } from 'geojson';
@Entity('map')
export class postgi {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  lat: string;
  @Column()
  long: string;
  @Column()
  city: string;

  @Index({ spatial: true })
  @Column({
    type: 'geography',
    spatialFeatureType: 'Point',
    srid: 4326,
    nullable: true,
  })
  location:Point


}
