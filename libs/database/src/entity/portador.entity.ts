import {
  Table,
  Column,
  Model,
  DataType,
  AfterCreate,
} from 'sequelize-typescript';
import { DateTime } from 'luxon';

@Table({
  modelName: 'portador',
  tableName: 'portadores',
  underscored: true,
  timestamps: true,
  version: false,
  paranoid: true,
  deletedAt: 'deleted_at',
})
export class Portador extends Model {
  @Column({
    primaryKey: true,
    type: DataType.STRING,
    allowNull: false,

  })
  document: string;

  @Column({
    allowNull: false,
    type: DataType.STRING,
  })
  fullName: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,

  })
  createdAt: Date;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  updatedAt: Date;

}