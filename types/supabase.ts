export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      kitchens: {
        Row: {
          created_at: string | null
          creator: string | null
          id: string
          kitchenName: string | null
        }
        Insert: {
          created_at?: string | null
          creator?: string | null
          id?: string
          kitchenName?: string | null
        }
        Update: {
          created_at?: string | null
          creator?: string | null
          id?: string
          kitchenName?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "kitchens_creator_fkey"
            columns: ["creator"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      pantry: {
        Row: {
          belongs_to: string | null
          created_at: string
          expiry_date: string | null
          id: number
          item_name: string | null
          last_updated: string | null
          price: number | null
          quantity: number | null
          unit: string | null
        }
        Insert: {
          belongs_to?: string | null
          created_at?: string
          expiry_date?: string | null
          id?: number
          item_name?: string | null
          last_updated?: string | null
          price?: number | null
          quantity?: number | null
          unit?: string | null
        }
        Update: {
          belongs_to?: string | null
          created_at?: string
          expiry_date?: string | null
          id?: number
          item_name?: string | null
          last_updated?: string | null
          price?: number | null
          quantity?: number | null
          unit?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "pantry_belongs_to_fkey"
            columns: ["belongs_to"]
            referencedRelation: "kitchens"
            referencedColumns: ["id"]
          }
        ]
      }
      profiles: {
        Row: {
          full_name: string | null
          id: string
          kitchen: string | null
          updated_at: string | null
          username: string | null
        }
        Insert: {
          full_name?: string | null
          id: string
          kitchen?: string | null
          updated_at?: string | null
          username?: string | null
        }
        Update: {
          full_name?: string | null
          id?: string
          kitchen?: string | null
          updated_at?: string | null
          username?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profiles_kitchen_fkey"
            columns: ["kitchen"]
            referencedRelation: "kitchens"
            referencedColumns: ["id"]
          }
        ]
      }
      shopping: {
        Row: {
          createdAt: string
          id: number
          modifiedBy: string | null
          note: string | null
          pantryId: number | null
          status: boolean | null
        }
        Insert: {
          createdAt?: string
          id?: number
          modifiedBy?: string | null
          note?: string | null
          pantryId?: number | null
          status?: boolean | null
        }
        Update: {
          createdAt?: string
          id?: number
          modifiedBy?: string | null
          note?: string | null
          pantryId?: number | null
          status?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "shopping_modifiedBy_fkey"
            columns: ["modifiedBy"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "shopping_pantryId_fkey"
            columns: ["pantryId"]
            referencedRelation: "pantry"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
