// /controllers/property.ts
import { Request, Response } from 'express';
import { PropertyModel } from '../models/property';
import { ResponseStatus } from '../utils/response-status';

class PropertyController {

  async getAllProperties(req: Request, res: Response): Promise<void> {
    try {
      const properties = await PropertyModel.find();
      res.send(properties);
    } catch (error) {
      console.error('Error retrieving properties:', error);
      res.status(ResponseStatus.BAD_REQUEST).send('Something went wrong while retrieving properties.');
    }
  }

  async createProperty(req: Request, res: Response): Promise<void> {
    try {
      const propertyData = req.body;
      const newProperty = await PropertyModel.create(propertyData);
      res.send(newProperty);
    } catch (error) {
      console.error('Error creating property:', error);
      res.status(ResponseStatus.BAD_REQUEST).send('Failed to create property');
    }
  }

  async getPropertyById(req: Request, res: Response): Promise<void> {
    try {
      const propertyId = req.params.id;
      const property = await PropertyModel.findById(propertyId);
      if (property) {
        res.send(property);
      } else {
        res.status(ResponseStatus.NOT_FOUND).send('Property not found');
      }
    } catch (error) {
      console.error('Error finding property by ID:', error);
      res.status(ResponseStatus.BAD_REQUEST).send('Something went wrong while finding property by ID.');
    }
  }

  async updateProperty(req: Request, res: Response): Promise<void> {
    try {
      const propertyId = req.params.id;
      const updateData = req.body;
      const updatedProperty = await PropertyModel.findByIdAndUpdate(propertyId, updateData, { new: true });
      if (updatedProperty) {
        res.send(updatedProperty);
      } else {
        res.status(ResponseStatus.NOT_FOUND).send('Property not found');
      }
    } catch (error) {
      console.error('Error updating property:', error);
      res.status(ResponseStatus.BAD_REQUEST).send('Failed to update property');
    }
  }

  async deleteProperty(req: Request, res: Response): Promise<void> {
    try {
      const propertyId = req.params.id;
      const deletedProperty = await PropertyModel.findByIdAndDelete(propertyId);
      if (deletedProperty) {
        res.send('Property deleted successfully!');
      } else {
        res.status(ResponseStatus.NOT_FOUND).send('Property not found');
      }
    } catch (error) {
      console.error('Error deleting property:', error);
      res.status(ResponseStatus.BAD_REQUEST).send('Failed to delete property');
    }
  }
}

export default new PropertyController();
