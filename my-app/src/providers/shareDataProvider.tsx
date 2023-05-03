import React, { createContext, useContext, useState } from 'react';
import { OrderInput } from '../models/orderinput.model';


interface Props {
  children?: React.ReactNode;
}

interface ShareDataContextState {
  OrderInput?: OrderInput;
  setOrderInput: React.Dispatch<React.SetStateAction<OrderInput | undefined>>;
}

const shareDataContextDefaultValues: ShareDataContextState = {
 OrderInput: {
    product_type_id: '',
    amount_char: '0',
    amount: '',
    delivery_id: '',
    project_id: '',
    amount_icon: '0',
    date_pickup: '',
    handle: '',
    picture_original: '',

  },

  setOrderInput: function (value: React.SetStateAction<OrderInput | undefined>): void {
    throw new Error('Function not implemented.');
  }

};

export const ShareDataContext = createContext<ShareDataContextState>(shareDataContextDefaultValues);

export const ShareDataProvider: React.FC<Props> = ({ children }: Props) => {
  const [OrderInput, setOrderInput] = useState<OrderInput>();
  

  return (
    <ShareDataContext.Provider
      value={{
        OrderInput
      }}>
      {children}
    </ShareDataContext.Provider>
  );
};

export function useShareData() {
  return useContext(ShareDataContext);
}
