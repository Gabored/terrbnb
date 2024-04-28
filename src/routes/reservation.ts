import { Router } from 'express';
import ReservationController from '../controllers/reservation'; // Using the ReservationController Object Instance

const router = Router();

// GET all reservations
router.get('/', ReservationController.getAllReservations);

// GET reservation by ID
router.get('/:id', ReservationController.getReservationById);

// CREATE a new reservation
router.post('/', ReservationController.createReservation);

// UPDATE reservation by ID
router.put('/:id', ReservationController.updateReservation);

// DELETE reservation by ID
router.delete('/:id', ReservationController.deleteReservation);

export default router;
