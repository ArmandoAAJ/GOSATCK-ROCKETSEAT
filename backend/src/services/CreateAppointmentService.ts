import Appointmet from '../models/Appointmets';
import { getCustomRepository } from 'typeorm'
import { startOfHour } from 'date-fns';
import AppError from '../errors/AppError';
import AppointmetsRepository from '../repositories/AppointmentsRepository';

interface RequestDTO {
  provider_id: string;
  date: Date;
}

class CreateAppointmentService {
  public async execute({ date, provider_id }: RequestDTO): Promise<Appointmet> {
    const appointmentsRepository = getCustomRepository(AppointmetsRepository);

    const appointmentDate = startOfHour(date);

    const findAppointmetInSameDate = await appointmentsRepository.findByDate(appointmentDate);

    if (findAppointmetInSameDate) {
      throw new AppError('This appointments is already booked.')
    }

    const appoitment = appointmentsRepository.create({
      provider_id,
      date: appointmentDate
    });

    await appointmentsRepository.save(appoitment);

    return appoitment;
  }
}

export default CreateAppointmentService;