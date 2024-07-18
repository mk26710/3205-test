import { Injectable } from "@nestjs/common";
import * as data from "@/data.json";

@Injectable()
export class UsersService {
  find(email: string, number?: string | null) {
    let records = data.filter((entry) => entry.email === email);
    if (typeof number === "string") {
      records = records.filter((entry) => entry.number === number);
    }

    return records;
  }
}
