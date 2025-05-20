import db from "../../database/config/db.js";

export const createMaterialModel = async (materialData) => {
  try {
   const {
  material_id,
  name,
  category_id,
  variant_id,
  uom,
  condition_id,
  location_id,
  reorder_level,
  storage_temperature
} = materialData;

const sql = `
  INSERT INTO MATERIALS 
  (material_id, name, category_id, variant_id, uom, condition_id, location_id, reorder_level, storage_temperature)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
`;

const [result] = await db.query(sql, [
  material_id,
  name,
  category_id,
  variant_id,
  uom,
  condition_id,
  location_id,
  reorder_level,
  storage_temperature
]);


    // Return insert info or affected rows, etc.
    return {
      insertId: result.insertId,
      affectedRows: result.affectedRows,
    };

  } catch (error) {
    console.error("Model Error:", error);
    throw error; // Propagate error so service can catch it
  }
};
