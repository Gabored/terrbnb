
import { Schema, Document, model, Model } from 'mongoose';

interface Property extends Document {
  _id: Schema.Types.ObjectId;
  name: string;
  description: string;
  // Add other properties as needed
}

interface PropertyModel extends Model<Property> {
  getAllProperties(): Promise<Property[]>;
  getPropertyById(propertyId: string): Promise<Property | null>;
  createProperty(propertyData: Property): Promise<Property>;
  updateProperty(propertyId: string, updateData: Partial<Property>): Promise<Property | null>;
  deleteProperty(propertyId: string): Promise<Property | null>;
}

const propertySchema: Schema<Property> = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  // Define other properties here
});

propertySchema.statics.getAllProperties = async function (): Promise<Property[]> {
  return this.find();
};

propertySchema.statics.getPropertyById = async function (propertyId: string): Promise<Property | null> {
  return this.findById(propertyId);
};

propertySchema.statics.createProperty = async function (propertyData: Property): Promise<Property> {
  return this.create(propertyData);
};

propertySchema.statics.updateProperty = async function (propertyId: string, updateData: Partial<Property>): Promise<Property | null> {
  return this.findByIdAndUpdate(propertyId, updateData, { new: true });
};

propertySchema.statics.deleteProperty = async function (propertyId: string): Promise<Property | null> {
  return this.findByIdAndDelete(propertyId);
};

export const PropertyModel: PropertyModel = model<Property, PropertyModel>('Property' , propertySchema, "property");
