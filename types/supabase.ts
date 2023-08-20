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
          addedToCart: boolean | null
          belongs_to: string | null
          buyingDescription: string | null
          created_at: string
          description: string | null
          expiry_date: string | null
          id: string
          item_name: string | null
          last_updated: string | null
          price: number | null
          quantity: number | null
          unit: string | null
        }
        Insert: {
          addedToCart?: boolean | null
          belongs_to?: string | null
          buyingDescription?: string | null
          created_at?: string
          description?: string | null
          expiry_date?: string | null
          id?: string
          item_name?: string | null
          last_updated?: string | null
          price?: number | null
          quantity?: number | null
          unit?: string | null
        }
        Update: {
          addedToCart?: boolean | null
          belongs_to?: string | null
          buyingDescription?: string | null
          created_at?: string
          description?: string | null
          expiry_date?: string | null
          id?: string
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
          updated_at: string | null
          username: string | null
        }
        Insert: {
          full_name?: string | null
          id: string
          updated_at?: string | null
          username?: string | null
        }
        Update: {
          full_name?: string | null
          id?: string
          updated_at?: string | null
          username?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      recipies: {
        Row: {
          belongs_to_kitchen: string | null
          created_at: string
          description: string | null
          id: number
          steps: string[] | null
          title: string
        }
        Insert: {
          belongs_to_kitchen?: string | null
          created_at?: string
          description?: string | null
          id?: number
          steps?: string[] | null
          title: string
        }
        Update: {
          belongs_to_kitchen?: string | null
          created_at?: string
          description?: string | null
          id?: number
          steps?: string[] | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "recipies_belongs_to_kitchen_fkey"
            columns: ["belongs_to_kitchen"]
            referencedRelation: "kitchens"
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
