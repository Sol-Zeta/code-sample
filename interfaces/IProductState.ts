import {IProduct} from './IProduct';

export interface IProductState {
    active: boolean;
    deleteSuccess: boolean;
    favouriteProducts: string [] | [];
    getProductsSuccess: boolean;
    page: number;
    postId: string | undefined;
    postSuccess: boolean;
    productDetail: IProduct | undefined;
    products: IProduct[] | [];
    quantity: number;
    totalProducts: number;
    updateSuccess: boolean;
  }