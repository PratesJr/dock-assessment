import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
} from 'sequelize-typescript';

import { Conta } from './conta.entity';
import { Portador } from './portador.entity';
import { OperationType } from '@app/types/enum/operation.enum';

@Table({
  modelName: 'movimentacao',
  tableName: 'movimentacoes',
  underscored: true,
  timestamps: true,
  version: false,
})
export class Movimentacao extends Model {
  @Column({
    primaryKey: true,
    type: DataType.INTEGER,
    allowNull: false,
    autoIncrement: true
  })
  id: string;

  @ForeignKey(() => Portador)
  @Column({
    allowNull: false,
    type: DataType.STRING,
  })
  portadorId: string;

  @ForeignKey(() => Conta)
  @Column({
    allowNull: false,
    type: DataType.STRING,
  })
  contaId: string;

  @Column({
    allowNull: false,
    type: DataType.DECIMAL,
  })
  valor: number;

  @Column({
    allowNull: false,
    type: DataType.STRING,
  })
  tipo: OperationType;

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