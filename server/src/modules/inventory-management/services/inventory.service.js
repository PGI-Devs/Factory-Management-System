import { Inventory } from '../models/inventory.model.js';
export const list   = () => Inventory.findAll();
export const create = (dto) => Inventory.create(dto);
export const update = (id, dto) => Inventory.update(dto, { where: { id }});
export const remove = (id) => Inventory.destroy({ where: { id }});
