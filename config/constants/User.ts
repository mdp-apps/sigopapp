import { UserProfile } from "@/presentation/auth/store";

export const USER_PROFILES = {
  [UserProfile.driver]: "Conductor",
  [UserProfile.supervisor]: "Supervisor",
  [UserProfile.customer]: "Cliente",
  [UserProfile.planner]: "Planificador",
};