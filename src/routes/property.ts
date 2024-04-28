import { Router } from 'express';
import PropertyController from '../controllers/property'; // Using the PropertyController Object Instance

const router = Router();

// GET all properties
router.get('/', PropertyController.getAllProperties);

// GET property by ID
router.get('/:id', PropertyController.getPropertyById);

// CREATE a new property
router.post('/', PropertyController.createProperty);

// UPDATE property by ID
router.put('/:id', PropertyController.updateProperty);

// DELETE property by ID
router.delete('/:id', PropertyController.deleteProperty);

export default router;
