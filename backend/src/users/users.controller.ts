import { Body, Controller, Post, UsePipes } from "@nestjs/common";
import { ZodValidationPipe } from "@/zod-validation/zod-validation.pipe";
import { SearchUserDto, SearchUserSchema } from "./dto/search-user.dto";
import { UsersService } from "./users.service";
import { setTimeout } from "node:timers/promises";

@Controller("users")
@UsePipes(new ZodValidationPipe(SearchUserSchema))
export class UsersController {
  constructor(private service: UsersService) {}

  @Post()
  async search(@Body() body: SearchUserDto) {
    await setTimeout(5000);
    return this.service.find(body.email, body.number);
  }
}
