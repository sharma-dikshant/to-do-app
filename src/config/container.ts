import { Container } from "inversify";
import { User } from "../user";
import { Page } from "../page";

export const container: Container = new Container();

container.bind(User).toSelf()
container.bind(Page).toSelf()