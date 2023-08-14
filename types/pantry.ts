export interface IPantryList {
    id: string;
    item_name:string
    quantity:string;
    unit:string;
    expiry_date?:string
    last_updated?:string
    isInList?:boolean,
    price?: string
  }
