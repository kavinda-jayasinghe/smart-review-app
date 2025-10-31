// src/app/models/user-suggestion.model.ts
export interface UserSuggestion {
  id: number;        // ← REQUIRED, no undefined
  fullName: string;
  role: string;
}