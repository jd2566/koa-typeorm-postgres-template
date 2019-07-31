import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';
import {Length} from 'class-validator';

@Entity()
export class Ads {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    length: 80,
    comment: '廣告名稱',
  })
  @Length(10, 80)
  name: string

  @Column({
    length: 80,
    comment: '檔案名稱',
  })
  @Length(10, 80)
  filename: string

  @Column({type: 'int', comment: '順序'})
  order: number
}

export const adsSchema = {
  id: {type: 'number', required: true, example: 1},
  name: {type: 'string', required: true, example: '好喝茶'},
  filename: {type: 'string', required: true, example: '好喝茶.jpg'},
  order: {type: 'number', required: true, example: 1},
};
