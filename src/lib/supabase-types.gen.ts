export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      cards: {
        Row: {
          id: number
          text: string
          title: string | null
          type: Database["public"]["Enums"]["stop_type"]
        }
        Insert: {
          id?: number
          text: string
          title?: string | null
          type: Database["public"]["Enums"]["stop_type"]
        }
        Update: {
          id?: number
          text?: string
          title?: string | null
          type?: Database["public"]["Enums"]["stop_type"]
        }
        Relationships: []
      }
      game_rounds: {
        Row: {
          dice_roll: number
          game_id: number
          id: number
          round: number
        }
        Insert: {
          dice_roll: number
          game_id: number
          id?: number
          round: number
        }
        Update: {
          dice_roll?: number
          game_id?: number
          id?: number
          round?: number
        }
        Relationships: [
          {
            foreignKeyName: "game_rounds_game_id_fkey"
            columns: ["game_id"]
            isOneToOne: false
            referencedRelation: "games"
            referencedColumns: ["id"]
          },
        ]
      }
      games: {
        Row: {
          code: string
          id: number
          inserted_at: string
          state: Database["public"]["Enums"]["game_state"]
        }
        Insert: {
          code: string
          id?: number
          inserted_at?: string
          state?: Database["public"]["Enums"]["game_state"]
        }
        Update: {
          code?: string
          id?: number
          inserted_at?: string
          state?: Database["public"]["Enums"]["game_state"]
        }
        Relationships: []
      }
      player_answers: {
        Row: {
          answer: string
          game_id: number
          id: number
          player_id: number
          round: number
        }
        Insert: {
          answer: string
          game_id: number
          id?: number
          player_id: number
          round: number
        }
        Update: {
          answer?: string
          game_id?: number
          id?: number
          player_id?: number
          round?: number
        }
        Relationships: [
          {
            foreignKeyName: "player_answers_game_id_fkey"
            columns: ["game_id"]
            isOneToOne: false
            referencedRelation: "games"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "player_answers_player_id_fkey"
            columns: ["player_id"]
            isOneToOne: false
            referencedRelation: "players"
            referencedColumns: ["id"]
          },
        ]
      }
      player_cards: {
        Row: {
          card_id: number
          game_id: number
          id: number
          player_id: number
          round: number
        }
        Insert: {
          card_id: number
          game_id: number
          id?: number
          player_id: number
          round: number
        }
        Update: {
          card_id?: number
          game_id?: number
          id?: number
          player_id?: number
          round?: number
        }
        Relationships: [
          {
            foreignKeyName: "player_cards_game_id_fkey"
            columns: ["game_id"]
            isOneToOne: false
            referencedRelation: "games"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "player_cards_player_id_fkey"
            columns: ["player_id"]
            isOneToOne: false
            referencedRelation: "players"
            referencedColumns: ["id"]
          },
        ]
      }
      player_moves: {
        Row: {
          game_id: number
          id: number
          player_id: number
          round: number
          stop_id: number
        }
        Insert: {
          game_id: number
          id?: number
          player_id: number
          round: number
          stop_id: number
        }
        Update: {
          game_id?: number
          id?: number
          player_id?: number
          round?: number
          stop_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "player_moves_game_id_fkey"
            columns: ["game_id"]
            isOneToOne: false
            referencedRelation: "games"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "player_moves_player_id_fkey"
            columns: ["player_id"]
            isOneToOne: false
            referencedRelation: "players"
            referencedColumns: ["id"]
          },
        ]
      }
      players: {
        Row: {
          character: Database["public"]["Enums"]["character_type"] | null
          description: string | null
          game_id: number
          id: number
          inserted_at: string
          is_owner: boolean
          nickname: string | null
          user_id: string
        }
        Insert: {
          character?: Database["public"]["Enums"]["character_type"] | null
          description?: string | null
          game_id: number
          id?: number
          inserted_at?: string
          is_owner?: boolean
          nickname?: string | null
          user_id: string
        }
        Update: {
          character?: Database["public"]["Enums"]["character_type"] | null
          description?: string | null
          game_id?: number
          id?: number
          inserted_at?: string
          is_owner?: boolean
          nickname?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "players_game_id_fkey"
            columns: ["game_id"]
            isOneToOne: false
            referencedRelation: "games"
            referencedColumns: ["id"]
          },
        ]
      }
      rounds: {
        Row: {
          description: string
          id: number
          index: number
          title: string
        }
        Insert: {
          description: string
          id?: number
          index: number
          title: string
        }
        Update: {
          description?: string
          id?: number
          index?: number
          title?: string
        }
        Relationships: []
      }
      stops: {
        Row: {
          id: number
          initial: boolean
          name: string | null
          paths: number[]
          type: Database["public"]["Enums"]["stop_type"]
          x: number
          y: number
        }
        Insert: {
          id?: number
          initial?: boolean
          name?: string | null
          paths: number[]
          type: Database["public"]["Enums"]["stop_type"]
          x: number
          y: number
        }
        Update: {
          id?: number
          initial?: boolean
          name?: string | null
          paths?: number[]
          type?: Database["public"]["Enums"]["stop_type"]
          x?: number
          y?: number
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      check_all_players_ready: {
        Args: {
          p_game_id: number
        }
        Returns: undefined
      }
      check_round_completion: {
        Args: {
          p_game_id: number
        }
        Returns: undefined
      }
      check_starting_round_completion: {
        Args: {
          p_game_id: number
        }
        Returns: undefined
      }
      create_game: {
        Args: Record<PropertyKey, never>
        Returns: Database["public"]["CompositeTypes"]["create_game_result"]
      }
      join_game: {
        Args: {
          game_code: string
        }
        Returns: undefined
      }
      player_answer: {
        Args: {
          game_code: string
          game_round: number
          answer: string
        }
        Returns: undefined
      }
      player_move: {
        Args: {
          game_code: string
          game_round: number
          stop_id: number
        }
        Returns: number
      }
      player_start: {
        Args: {
          game_code: string
          stop_id: number
        }
        Returns: undefined
      }
      roll_dice: {
        Args: {
          p_game_id: number
        }
        Returns: number
      }
      start_game: {
        Args: {
          game_code: string
        }
        Returns: undefined
      }
      update_player_character: {
        Args: {
          game_code: string
          player_character: Database["public"]["Enums"]["character_type"]
        }
        Returns: undefined
      }
      update_player_nickname_description: {
        Args: {
          game_code: string
          player_nickname: string
          player_description: string
        }
        Returns: undefined
      }
    }
    Enums: {
      character_type:
        | "child"
        | "different-needs"
        | "local-specialist"
        | "nature-lover"
        | "non-human-being"
        | "scientist"
        | "time-traveller"
        | "custom"
      game_state: "waiting" | "ready" | "starting" | "playing" | "finished"
      stop_type: "nature" | "sense" | "action" | "history" | "landmark"
    }
    CompositeTypes: {
      create_game_result: {
        game_id: number | null
        game_code: string | null
      }
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

