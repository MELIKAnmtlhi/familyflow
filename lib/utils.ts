import { FamilyMember } from "./types";

export const getMemberNames = (ids: number[], members: FamilyMember[]): string => {
    return ids.map((id) => members.find((m) => m.id === id)?.name || "unknown").join(",")
}