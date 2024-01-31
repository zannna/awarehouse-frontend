
import { ProductsFromWarehouse , ShowProductFromText, AddWarehouseImage, ShowProductFromContainer, ProductWarehouseList,  AddWarehouseContainer, Checkbox, GroupText, WarehouseText } from './ProductWarehouses.styles';
import { Flex } from '../../../styles/globalStyles.styles';
import { useState, useEffect } from 'react';
function ProductWarehouse (){
    const [showProductWarehouses, setShowProductWarehouses] = useState(false);
    const productsWarehousesList = [
      { id: 1, label: 'Warehouse 1' },
      { id: 2, label: 'Warehouse 2' },
      { id: 3, label: 'Warehouse 3' },
      { id: 4, label: 'Warehouse 4' },
  
  ];
    const handleMouseLeave = () => {
      setShowProductWarehouses(false)
    }
return     <ShowProductFromContainer align="center">
<ShowProductFromText> SHOW PRODUCTS FROM:</ShowProductFromText>
{productsWarehousesList.map((w) => (
   <ProductsFromWarehouse>
   {w.label}
 </ProductsFromWarehouse >
          ))}
< AddWarehouseContainer>
  <AddWarehouseImage src="/add.svg" alt="add warehouse" onClick={()=>{setShowProductWarehouses(!showProductWarehouses)}}></AddWarehouseImage>
  {showProductWarehouses && <ProductWarehouseList onMouseLeave={handleMouseLeave}>
  <GroupText>group 1  <Checkbox type="checkbox" ></Checkbox></GroupText>
                  <WarehouseText><span>Warehouse 2</span><Checkbox type="checkbox" ></Checkbox></WarehouseText>
                  <WarehouseText>Warehouse 3 <Checkbox type="checkbox" ></Checkbox></WarehouseText>
                  <GroupText>group 2  <Checkbox type="checkbox" ></Checkbox></GroupText>
                  <WarehouseText>Warehouse 4 <Checkbox type="checkbox" ></Checkbox></WarehouseText>
                  </ ProductWarehouseList >
                  }
</AddWarehouseContainer>
</ShowProductFromContainer>

}

export default ProductWarehouse;