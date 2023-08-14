
export type Pantry =
  | {
      belongs_to: string | null;
      created_at: string;
      expiry_date: string | null;
      id: number;
      item_name: string | null;
      last_updated: string | null;
      price: number | null;
      quantity: number | null;
      unit: string | null;
    }
  | undefined;
