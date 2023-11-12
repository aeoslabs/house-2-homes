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
      assets: {
        Row: {
          created_at: string
          id: string
          url: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          url: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          url?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "assets_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      generations: {
        Row: {
          created_at: string
          id: string
          Optional: Json | null
          prompt: string | null
          reference_img_url: string | null
          status: string | null
          url: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          Optional?: Json | null
          prompt?: string | null
          reference_img_url?: string | null
          status?: string | null
          url?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          Optional?: Json | null
          prompt?: string | null
          reference_img_url?: string | null
          status?: string | null
          url?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "generations_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      users: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          credits: number | null
          email: string | null
          full_name: string | null
          id: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          credits?: number | null
          email?: string | null
          full_name?: string | null
          id: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          credits?: number | null
          email?: string | null
          full_name?: string | null
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "users_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
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
