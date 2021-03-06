import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import { parseISO } from 'date-fns';
import AppointmetsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

import ensureAuth from '../middlewares/ensureAuth';

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuth);

appointmentsRouter.get('/', async (request, response) => {
  const appointmetsRepository = getCustomRepository(AppointmetsRepository);

  const appointments = await appointmetsRepository.find();

  return response.status(200).json(appointments);
})

appointmentsRouter.post('/', async (request, response) => {
  const { provider_id, date } = request.body;

  const parsedDate = parseISO(date);

  const CreateAppointment = new CreateAppointmentService();

  const appointment = await CreateAppointment.execute({
    date: parsedDate,
    provider_id,
  });

  return response.status(200).json(appointment);
})

export default appointmentsRouter;
