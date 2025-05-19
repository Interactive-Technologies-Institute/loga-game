export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
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
      saved_stories: {
        Row: {
          character: Json
          created_at: string
          id: number
          player_name: string
          rounds: Json
          story_title: string
        }
        Insert: {
          character: Json
          created_at?: string
          id?: number
          player_name: string
          rounds: Json
          story_title: string
        }
        Update: {
          character?: Json
          created_at?: string
          id?: number
          player_name?: string
          rounds?: Json
          story_title?: string
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
        Args: { p_game_id: number }
        Returns: undefined
      }
      check_round_completion: {
        Args: { p_game_id: number }
        Returns: undefined
      }
      check_starting_round_completion: {
        Args: { p_game_id: number }
        Returns: undefined
      }
      create_game: {
        Args: Record<PropertyKey, never>
        Returns: Database["public"]["CompositeTypes"]["create_game_result"]
      }
      join_game: {
        Args: { game_code: string }
        Returns: undefined
      }
      player_answer: {
        Args: { game_code: string; game_round: number; answer: string }
        Returns: undefined
      }
      player_move: {
        Args: { game_code: string; game_round: number; stop_id: number }
        Returns: number
      }
      player_start: {
        Args: { game_code: string; stop_id: number }
        Returns: undefined
      }
      roll_dice: {
        Args: { p_game_id: number }
        Returns: number
      }
      save_story: {
        Args: {
          p_player_name: string
          p_story_title: string
          p_character: Json
          p_rounds: Json
        }
        Returns: number
      }
      start_game: {
        Args: { game_code: string }
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
        | "scientist"
        | "time-traveller"
        | "trocaz-pigeon"
        | "monk-seal"
        | "vulcanic-rock"
        | "iberian-green-frog"
        | "zinos-petrel"
        | "water"
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

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      character_type: [
        "child",
        "different-needs",
        "local-specialist",
        "nature-lover",
        "scientist",
        "time-traveller",
        "trocaz-pigeon",
        "monk-seal",
        "vulcanic-rock",
        "iberian-green-frog",
        "zinos-petrel",
        "water",
      ],
      game_state: ["waiting", "ready", "starting", "playing", "finished"],
      stop_type: ["nature", "sense", "action", "history", "landmark"],
    },
  },
} as const
