import { User } from '../user.entity';

export interface registrationResponse {
  access_token: string;
  user: User;
}
