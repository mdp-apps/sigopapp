import { UserProfile } from "@/infrastructure/entities";

export const USER_PROFILES = {
  [UserProfile.driver]: "Conductor",
  [UserProfile.supervisor]: "Supervisor",
  [UserProfile.customer]: "Cliente",
  [UserProfile.planner]: "Planificador",
  [UserProfile.foreman]: "Capataz",
};