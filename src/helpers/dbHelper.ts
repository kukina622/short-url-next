import { PrismaClient } from "@prisma/client";

export default class DbHelper {
  private static Prisma: PrismaClient;

  public static getPrisma(): PrismaClient {
    this.Prisma ||= new PrismaClient();

    return this.Prisma;
  }

  public static disconnect() {
    return DbHelper.Prisma?.$disconnect();
  }
}
