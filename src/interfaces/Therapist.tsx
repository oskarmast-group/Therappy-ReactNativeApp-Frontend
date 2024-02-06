import TimeAvailability from './TimeAvailability';

export interface BaseTherapist {
  id: number;
  name: string;
  lastName: string;
  profileImg: string;
  title: string | null;
  categories: number[];
  reviewsCount: number;
  reviewAvg: number | null;
}

interface Therapist extends BaseTherapist {
  experience: string | null;
  phrase: string | null;
  timeAvailability: TimeAvailability;
  appointments: {date: string; id: number; therapistId: number}[];
}

export default Therapist;
