
import { createMaterialService } from "../services/createMaterial.js";

export const createMaterial = async (req, res) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ 
        success: false,
        message: "Request body is missing",
        data: null
      });
    }

    const result = await createMaterialService(req.body);

    res.status(201).json({
      success: true,
      message: "Material created successfully",
      data: result
    });
  } catch (error) {
    console.error("Error creating material:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create material. Please try again later.",
      error: error.message || error,
      data: null
    });
  }
};
