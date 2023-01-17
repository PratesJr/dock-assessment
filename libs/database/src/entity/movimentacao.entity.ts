import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
} from 'sequelize-typescript';
import { DateTime } from 'luxon';
import { Conta } from './conta.entity';
import { Portador } from './portador.entity';
import { OperationType } from '@app/types/enum/operation.enum';

@Table({
  modelName: 'movimentacao',
  tableName: 'user',
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
    get() {
      return this.getDataValue('createdAt')
        ? DateTime.fromSQL(this.getDataValue('createdAt'))
          .setZone('America/Sao_Paulo')
          .toFormat('YYYY-MM-DD HH:mm:ss')
        : null;
    },
  })
  createdAt: Date;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    get() {
      return this.getDataValue('createdAt')
        ? DateTime.fromSQL(this.getDataValue('createdAt'))
          .setZone('America/Sao_Paulo')
          .toFormat('YYYY-MM-DD HH:mm:ss')
        : null;
    },
  })
  updatedAt: Date;


}