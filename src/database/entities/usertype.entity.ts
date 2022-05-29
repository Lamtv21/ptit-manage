import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import CustomBaseEntity from './base.entity'
import { User } from './user.entity'

export enum RoleType {
  MANAGER = 'manager',
  ADMIN = 'admin',
  STUDENT = 'student'
}

@Entity('user_type')
export class UserType extends CustomBaseEntity {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ type: 'enum', enum: RoleType, default: RoleType.STUDENT })
  role!: RoleType

  @Column()
  desc?: string

  @OneToMany(() => User, user => user.userType)
  users?: User[]
}
