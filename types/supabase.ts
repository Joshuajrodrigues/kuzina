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
      kitchen_owners: {
        Row: {
          id: string
          kitchen: string | null
          owner: string | null
        }
        Insert: {
          id?: string
          kitchen?: string | null
          owner?: string | null
        }
        Update: {
          id?: string
          kitchen?: string | null
          owner?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "kitchen_owners_kitchen_fkey"
            columns: ["kitchen"]
            referencedRelation: "kitchens"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "kitchen_owners_owner_fkey"
            columns: ["owner"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
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
          email: string | null
          full_name: string | null
          id: string
          updated_at: string | null
          username: string | null
        }
        Insert: {
          email?: string | null
          full_name?: string | null
          id: string
          updated_at?: string | null
          username?: string | null
        }
        Update: {
          email?: string | null
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
      requests: {
        Row: {
          id: string
          is_approved: boolean
          request_from: string
          request_to: string | null
        }
        Insert: {
          id?: string
          is_approved?: boolean
          request_from: string
          request_to?: string | null
        }
        Update: {
          id?: string
          is_approved?: boolean
          request_from?: string
          request_to?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "requests_request_from_fkey"
            columns: ["request_from"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "requests_request_to_fkey"
            columns: ["request_to"]
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
      join_notifications: {
        Args: {
          kitchen_owner_id: string
          join_request_to: string
        }
        Returns: {
          username: string
          full_name: string
          email: string
          request_from: string
        }[]
      }
      reject_request: {
        Args: {
          request_from_id: string
          request_to_id: string
        }
        Returns: undefined
      }
      test: {
        Args: {
          kitchen_owner_id: string
          join_request_to: string
        }
        Returns: {
          username: string
          full_name: string
          email: string
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
