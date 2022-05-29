import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import CustomBaseEntity from './base.entity'
import { User } from './user.entity'

@Entity('news')
export class News extends CustomBaseEntity {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ length: 500 })
  title!: string

  @Column({ length: 500 })
  titleNoAccent!: string

  @Column({ type: 'text' })
  content!: string

  @Column({ length: 200 })
  imgUrl!: string

  @Column({ name: 'user_id' })
  userId!: number

  @ManyToOne(() => User, user => user.news)
  @JoinColumn({ name: 'user_id' })
  user?: User
}
