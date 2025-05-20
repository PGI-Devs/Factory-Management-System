import { createMaterialModel } from "../models/materialModels.js";

export const createMaterialService = async (materialData) => {
  try {
    // Call the model to insert material data and get the result
    const data = await createMaterialModel(materialData);

    // You can transform or enrich data here if needed before returning
    return {
      success: true,
      message: "Material saved successfully",
      data: data,
    };
  } catch (error) {
    console.error("Service Error:", error);

    // Throw error up to controller with JSON error info (optional)
    throw {
      success: false,
      message: "Error saving material",
      error: error.message || error,
      data: null,
    };
  }
};
