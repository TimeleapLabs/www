import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";

dotenv.config();

export let db;
export let client;

export const getUnchainedDbClient = () => {
  if (!client) {
    client = new PrismaClient();
  }
  return client;
};
