
import { Schema, Document, model, Model } from 'mongoose';

interface Reservation extends Document {
  _id: Schema.Types.ObjectId;
  // Define reservation properties here
}

interface ReservationModel extends Model<Reservation> {
  getAllReservations(): Promise<Reservation[]>;
  getReservationById(reservationId: string): Promise<Reservation | null>;
  createReservation(reservationData: Reservation): Promise<Reservation>;
  updateReservation(reservationId: string, updateData: Partial<Reservation>): Promise<Reservation | null>;
  deleteReservation(reservationId: string): Promise<Reservation | null>;
}

const reservationSchema: Schema<Reservation> = new Schema({
  // Define reservation schema properties here
});

reservationSchema.statics.getAllReservations = async function (): Promise<Reservation[]> {
  return this.find();
};

reservationSchema.statics.getReservationById = async function (reservationId: string): Promise<Reservation | null> {
  return this.findById(reservationId);
};

reservationSchema.statics.createReservation = async function (reservationData: Reservation): Promise<Reservation> {
  return this.create(reservationData);
};

reservationSchema.statics.updateReservation = async function (reservationId: string, updateData: Partial<Reservation>): Promise<Reservation | null> {
  return this.findByIdAndUpdate(reservationId, updateData, { new: true });
};

reservationSchema.statics.deleteReservation = async function (reservationId: string): Promise<Reservation | null> {
  return this.findByIdAndDelete(reservationId);
};

export const ReservationModel: ReservationModel = model<Reservation, ReservationModel>('Reservation', reservationSchema, 'reservation');
