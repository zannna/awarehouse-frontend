export interface Product {
    id: string;
    name: string;
    amount: string;
    photo: string;
    warehouse: string;
    row: string;
    shelf: string;
    tier: string;
}

export interface PageableResponse<T> {
    content: T[];
    pageable: {
      sort: {
        sorted: boolean;
        unsorted: boolean;
        empty: boolean;
      };
      offset: number;
      pageSize: number;
      pageNumber: number;
      unpaged: boolean;
      paged: boolean;
    };
    totalPages: number;
    totalElements: number;
    last: boolean;
    size: number;
    number: number;
    sort: {
      sorted: boolean;
      unsorted: boolean;
      empty: boolean;
    };
    first: boolean;
    numberOfElements: number;
    empty: boolean;
  }

  export interface Warehouse{
    id: string;
    name: string;
}

export interface GroupData {
  id: string;
  name: string;
}