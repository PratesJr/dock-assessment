import {
  Table,
  Column,
  Model,
  DataType,
  AfterCreate,
} from 'sequelize-typescript';
import { DateTime } from 'luxon';

@Table({
  modelName: 'user',
  tableName: 'user',
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


  @AfterCreate({ name: 'clearContent' })
  static clearContent(instance: Portador) {
    delete instance.createdAt;
    delete instance.updatedAt;
    delete instance.deletedAt;

  }
}