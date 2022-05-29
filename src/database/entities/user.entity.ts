import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import CustomBaseEntity from './base.entity'
import { News } from './news.entity'
import { UserType } from './usertype.entity'

export enum SexType {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
  UNKNOWN = 'unknown'
}

@Entity('user')
export class User extends CustomBaseEntity {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ length: 20 })
  firstName!: string

  @Column({ length: 20 })
  lastName!: string

  @Column({ length: 10, nullable: true })
  phoneNumber?: string

  @Column({ enum: SexType, type: 'enum', default: SexType.UNKNOWN })
  sex?: SexType

  @Column({ nullable: true })
  age?: number

  @Column({ nullable: true })
  address?: string

  @Column({ length: 300 })
  hashedPassword!: string

  @Column({ length: 500, nullable: true })
  refreshToken?: string

  @Column()
  email!: string

  @Column({ name: 'user_type_id' })
  userTypeId!: number

  @OneToMany(() => News, news => news.user)
  news?: News[]

  @ManyToOne(() => UserType, userType => userType.users)
  @JoinColumn({ name: 'user_type_id' })
  userType?: UserType
}
