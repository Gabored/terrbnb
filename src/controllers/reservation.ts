
import { Request, Response } from 'express';
import { ReservationModel } from '../models/reservation';
import { ResponseStatus } from '../utils/response-status';

class ReservationController {

  async getAllReservations(req: Request, res: Response): Promise<void> {
    try {
      const reservations = await ReservationModel.find();
      res.send(reservations);
    } catch (error) {
      console.error('Error retrieving reservations:', error);
      res.status(ResponseStatus.BAD_REQUEST).send('Something went wrong while retrieving reservations.');
    }
  }

  async createReservation(req: Request, res: Response): Promise<void> {
    try {
      const reservationData = req.body;
      const newReservation = await ReservationModel.create(reservationData);
      res.send(newReservation);
    } catch (error) {
      console.error('Error creating reservation:', error);
      res.status(ResponseStatus.BAD_REQUEST).send('Failed to create reservation');
    }
  }

  async getReservationById(req: Request, res: Response): Promise<void> {
    try {
      const reservationId = req.params.id;
      const reservation = await ReservationModel.findById(reservationId);
      if (reservation) {
        res.send(reservation);
      } else {
        res.status(ResponseStatus.NOT_FOUND).send('Reservation not found');
      }
    } catch (error) {
      console.error('Error finding reservation by ID:', error);
      res.status(ResponseStatus.BAD_REQUEST).send('Something went wrong while finding reservation by ID.');
    }
  }

  async updateReservation(req: Request, res: Response): Promise<void> {
    try {
      const reservationId = req.params.id;
      const updateData = req.body;
      const updatedReservation = await ReservationModel.findByIdAndUpdate(reservationId, updateData, { new: true });
      if (updatedReservation) {
        res.send(updatedReservation);
      } else {
        res.status(ResponseStatus.NOT_FOUND).send('Reservation not found');
      }
    } catch (error) {
      console.error('Error updating reservation:', error);
      res.status(ResponseStatus.BAD_REQUEST).send('Failed to update reservation');
    }
  }

  async deleteReservation(req: Request, res: Response): Promise<void> {
    try {
      const reservationId = req.params.id;
      const deletedReservation = await ReservationModel.findByIdAndDelete(reservationId);
      if (deletedReservation) {
        res.send('Reservation deleted successfully!');
      } else {
        res.status(ResponseStatus.NOT_FOUND).send('Reservation not found');
      }
    } catch (error) {
      console.error('Error deleting reservation:', error);
      res.status(ResponseStatus.BAD_REQUEST).send('Failed to delete reservation');
    }
  }
}

export default new ReservationController();
