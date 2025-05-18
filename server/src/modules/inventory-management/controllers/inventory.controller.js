import * as svc from '../services/inventory.service.js';
export const list   = async (_, res) => res.json(await svc.list());
export const create = async (req, res) => res.status(201).json(await svc.create(req.body));
export const update = async (req, res) => res.json(await svc.update(req.params.id, req.body));
export const remove = async (req, res) => { await svc.remove(req.params.id); res.sendStatus(204); };
