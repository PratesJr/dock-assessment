import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  AfterCreate
} from 'sequelize-typescript';
import { DateTime } from 'luxon';
import { Portador } from './portador.entity';

@Table({
  modelName: 'conta',
  tableName: 'contas',
  underscored: true,
  timestamps: true,
  version: false,
  paranoid: true,
  deletedAt: 'deleted_at',
})
export class Conta extends Model {
  @Column({
    primaryKey: true,
    type: DataType.UUIDV4,
    allowNull: false,
    defaultValue: DataType.UUIDV4
  })
  id: string;

  @ForeignKey(() => Portador)
  @Column({
    allowNull: false,
    type: DataType.STRING,
  })
  portadorId: string;

  @Column({
    allowNull: false,
    type: DataType.STRING,
  })
  conta: string;

  @Column({
    allowNull: false,
    type: DataType.STRING,
  })
  agencia: string;
  @Column({

    allowNull: false,
    type: DataType.DECIMAL,
  })
  saldo: number;

  @Column({
    allowNull: true,
    type: DataType.BOOLEAN,
    defaultValue: false
  })
  blocked: boolean;


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


  @AfterCreate({ name: 'clearContent' })
  static clearContent(instance: Conta) {
    delete instance.deletedAt;
    delete instance.createdAt;
    delete instance.updatedAt;
  }
}