import AppError from '../error/AppError';
import { TDateAdnTime } from '../modules/Booking/booking.interface';
import { bookingModel } from '../modules/Booking/booking.model';

const timeConflict = async (dateAndTime: TDateAdnTime, facilityId: string) => {
  const existingSchedule = await bookingModel
    .find({ facility: facilityId, date: dateAndTime.date })
    .select('startTime endTime');

  const newStartTime = new Date(`1970-01-01T${dateAndTime.startTime}`);
  const newEndTime = new Date(`1970-01-01T${dateAndTime.endTime}`);
 
  if (newStartTime > newEndTime ) {
    throw new AppError(500, 'please provide valid time, your start time is grater then end time')
  }

  for (const schedule of existingSchedule) {
    const existingStartTime = new Date(`1970-01-01T${schedule.startTime}`);
    const existingEndTime = new Date(`1970-01-01T${schedule.endTime}`);
    const newStartTime = new Date(`1970-01-01T${dateAndTime.startTime}`);
    const newEndTime = new Date(`1970-01-01T${dateAndTime.endTime}`);

    // 10:30 - 12:30
    // 11:30 - 1.30
    if (newStartTime < existingEndTime && newEndTime > existingStartTime) {
      return true;
    }
  }

  return false;
};

export default timeConflict;
