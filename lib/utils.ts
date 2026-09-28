import { FamilyMember } from "./types";

export const getMemberNames = (ids: number[], members: FamilyMember[]): string => {
    return ids.map((id) => members.find((m) => String(m.id) === String(id))?.name || "unknown").join(",")
}