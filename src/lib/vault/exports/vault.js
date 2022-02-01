import Vault from "node-vault";
import { config } from "../meta/config.js";

export const vault = Vault(config);
