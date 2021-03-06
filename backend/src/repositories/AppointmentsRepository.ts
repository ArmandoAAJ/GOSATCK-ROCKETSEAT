import Appointment from '../models/Appointmets';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Appointment)
class AppointmetsRepository extends Repository<Appointment>{
  public async findByDate(date: Date): Promise<Appointment | null> {
    const findAppointmentDate = await this.findOne({
      where: {
        date: date,
      }
    });
    return findAppointmentDate || null;
  }
}

export default AppointmetsRepository;