import { CheckinInt } from './../checkin/checkin-int';

export interface EventsInt {
  id?: string;
  name?: string;
  orgId?: string;
  createdAt?: number;
  when?: number;
  checkin?: Array<CheckinInt>;
  confirmed?: Array<CheckinInt>;
  expiration?: number;
  image?: string;
}
