import { Text, Flex, Image, GridItem } from '../../../styles/globalStyles.styles';
import Selector from '../../Selector/Selector';
import { CreationBox, CreationText, CreationInputContainer, CreationInput, ProductGrid, ShortCreationInput, CancelButton, CreateButton } from './ProductCreator.styles';
import { useEffect, useState, useRef } from 'react';
import { Warehouse, getAdminGroups, getWarehouses, createProduct, ProductCreation, Product, updateProduct } from '../ProductsApi';
import { currencyMap } from '../../../constants/MapConstants';
import { useKeycloak } from '@react-keycloak/web';
function ProductCreator({ setShowProductCreator, products, setProducts, editProduct, setEditProduct }:
  { setShowProductCreator: (show: boolean) => void, products: Product[], setProducts: (product: Product[]) => void, setEditProduct: (product: Product | null) => void, editProduct: Product | null }) {
  const [groups, setGroups] = useState<Map<string, string>>(new Map());
  const [selectedGroup, setSelectedGroup] = useState<string[] | null>(null);
  const [warehousesElements, setWarehousesElements] = useState<number[]>([]);
  const [warehouses, setWarehouses] = useState<Map<string, string>>(new Map());
  const [lastWarehouseId, setLastWarehouseId] = useState(0);
  const [selectedWarehouses, setSelectedWarehouses] = useState<Map<number, string>>(new Map());
  const [selectedCurrency, setSelectedCurrency] = useState<string[] | null>(null);
  const [productWarehouses, setProductWarehouses] = useState<Map<number, { warehouseId: string, warehouseName: string, shelfNumber: number, tierNumber: number, amount: number }>>(new Map());
  const { keycloak, initialized } = useKeycloak();
  const [file, setFile] = useState<File>();
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [productData, setProductData] = useState<ProductCreation>({
    title: '',
    amountGroup: 0,
    groupId: '',
    price: { amount: 0, currency: 'PLN' },
    dimensions: { width: 0, height: 0, length: 0 },
    productWarehouses: [],
    image: ''
  });
useEffect(() => {
  console.log(editProduct);
},[editProduct]);
  useEffect(() => {
    if (editProduct) {
      setProductData({
        id: editProduct?.id || '',
        title: editProduct?.title || '',
        amountGroup: editProduct?.amountGroup || 0,
        price: {
          amount: editProduct?.price?.amount || 0,
          currency: editProduct?.price?.currency || '',
        },
        groupId: '',
        dimensions: {
          width: editProduct?.dimensions?.width || 0,
          height: editProduct?.dimensions?.height || 0,
          length: editProduct?.dimensions?.length || 0,
        },
        productWarehouses: [],
        image: editProduct?.image || ''
      });
      if (editProduct.productWarehouses && editProduct.productWarehouses.length > 0) {
        const firstWarehouse = editProduct.productWarehouses[0];
        setProductWarehouses(new Map([[0, {
          warehouseId: firstWarehouse.productWarehouseId || '',
          productWarehouseId: firstWarehouse.productWarehouseId || '',
          warehouseName: firstWarehouse.warehouseName || '',
          shelfNumber: firstWarehouse.shelfNumber || 0,
          tierNumber: firstWarehouse.tierNumber || 0,
          amount: firstWarehouse.amount || 0
        }]]));
        setWarehousesElements([0]);
      }

      if (editProduct.image) {
        setImagePreviewUrl(`data:image/jpeg;base64,${editProduct.image}`);
      }
    }
  }, [editProduct]);

  const addWarehouseElement = () => {
    setWarehousesElements(warehousesElements => [...warehousesElements, lastWarehouseId]);
    setLastWarehouseId(lastWarehouseId + 1);
  };

  const removeWarehouseElement = (id: number) => {
    setWarehousesElements(warehouses => warehouses.filter(warehouseId => warehouseId !== id));
    setSelectedWarehouses(prev => {
      const newMap = new Map(prev);
      newMap.delete(id);
      return newMap;
    });
  };

  useEffect(() => {
    const fetchWarehouses = async () => {
      const fetchedWarehouses = await getWarehouses(keycloak.token);
      const warehousesMap = new Map();
      fetchedWarehouses.forEach(warehouse => {
        warehousesMap.set(warehouse.id, warehouse.name);
      });
      setWarehouses(warehousesMap);
    };
    fetchWarehouses();
  }, []);

  useEffect(() => {
    const fetchGroups = async () => {
      const fetchedGroups = await getAdminGroups(keycloak.token);
      const groupsMap = new Map<string, string>();
      fetchedGroups.forEach(group => {
        groupsMap.set(group.id, group.name);
      });
      setGroups(groupsMap);
    };
    fetchGroups();
  }, []);

  const handleCretionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log(name, value);
    setProductData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value);
    console.log("handlePriceChange called", newValue);
    setProductData(prevData => ({
      ...prevData,
      price: {
        ...prevData.price,
        amount: isNaN(newValue) ? 0 : newValue

      }
    }))
  };

  const handleDimensionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const dimensionValue = parseFloat(value);

    setProductData(prevData => ({
      ...prevData,
      dimensions: {
        ...prevData.dimensions,
        [name]: isNaN(dimensionValue) ? 0 : dimensionValue
      }
    }));
  };

  const addWarehouse = (elementId: number, selectedItem: string[]) => {
    if (selectedItem.length == 2) {
      console.log(selectedItem);
      setSelectedWarehouses(prev => new Map(prev).set(elementId, selectedItem[0]));
      updateProductWarehouses(elementId, 'warehouseId', selectedItem[0]);
    }
  };

  const addProduct = (product: Product) => {
    setProducts([...products, product]);
  };


  const updateProductWarehouses = (elementId: number, detailType: string, value: string | number) => {
    setProductWarehouses(prevDetails => {
      const updatedDetails = new Map(prevDetails);
      const detail: {
        [key: string]: string | number;
        warehouseId: string;
        warehouseName: string;
        shelfNumber: number;
        tierNumber: number;
        amount: number;
      } = updatedDetails.get(elementId) || { warehouseId: '', warehouseName: '', row: 0, shelfNumber: 0, tierNumber: 0, amount: 0 };


      detail[detailType] = value;

      updatedDetails.set(elementId, detail);
      return updatedDetails;
    });
  };

  const sendCreationProductRequest = async () => {
    const groupId = selectedGroup?.[0] ?? '';
    const warehouses = Array.from(productWarehouses.values()).filter(wh => {
      return wh.warehouseId || wh.shelfNumber || wh.tierNumber || wh.amount;
    });
    console.log(groupId)
    if (editProduct) {
      updateProduct(keycloak.token, file, {
        ...productData,
        group : {id: groupId, name: ''},
        productWarehouses: warehouses
      }).then(fetchedProduct => {
        const updatedProducts = products.map(product => {
          if (product?.productWarehouses && fetchedProduct?.productWarehouses &&
            product?.productWarehouses[0]?.productWarehouseId == fetchedProduct?.productWarehouses[0]?.productWarehouseId) {
            return { ...product, ...fetchedProduct };
          }
          return product;
        });
        setProducts(updatedProducts);
        console.log(fetchedProduct);
      });
    }

    else {
      const fetchedProduct = await createProduct(keycloak.token, file, {
        ...productData,
        groupId: groupId,
        productWarehouses: warehouses
      });
      addProduct(fetchedProduct);
      console.log(fetchedProduct);
    }
    setShowProductCreator(false)
  }

  const hiddenFileInput = useRef<HTMLInputElement>(null);

  const handleUploadFile = (event: React.MouseEvent<HTMLImageElement>) => {
    hiddenFileInput.current?.click();
  };

  const uploadFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const fileUploaded = event.target.files[0];
      setFile(fileUploaded);
      const fileUrl = URL.createObjectURL(fileUploaded);
      setImagePreviewUrl(fileUrl);
    }
  };

  return (
    <Flex justify='center' align='center'>
      <CreationBox>
        <CreationText> create product </CreationText>
        <CreationInputContainer>
          <ProductGrid>
            <Flex gap="1em">
              name
              <CreationInput value={productData.title} name='title' onChange={event => handleCretionChange(event)}></CreationInput>
            </Flex>
            <Flex gap="1em">
              price
              <ShortCreationInput value={productData.price.amount} onChange={event => handlePriceChange(event)}></ShortCreationInput>
              <Selector items={currencyMap} selected={selectedCurrency} setSelected={setSelectedCurrency} ></Selector>
            </Flex>
            <Flex gap="1em">
              amount
              <ShortCreationInput value={productData.amountGroup} name='amountGroup' onChange={event => handleCretionChange(event)}></ShortCreationInput>
            </Flex>
            <Flex gap="1em"> width
              <CreationInput name='width' value={productData.dimensions.width} onChange={event => handleDimensionChange(event)}></CreationInput></Flex>
            <Flex gap="1em"> height
              <ShortCreationInput name='height' value={productData.dimensions.height} onChange={event => handleDimensionChange(event)}></ShortCreationInput></Flex>
            <Flex gap="1em"> length
              <ShortCreationInput name='length' value={productData.dimensions.length} onChange={event => handleDimensionChange(event)}></ShortCreationInput></Flex>
            <GridItem gridArea="groups">
              <Flex gap='1em'>
                group
                <Selector items={groups} selected={selectedGroup} setSelected={setSelectedGroup} ></Selector>
              </Flex>
            </GridItem>
            <GridItem gridArea="photo">
              <Flex gap='1em'>
                <Text color='#344351' weight='500'>photo</Text>
                <Image src="/square-add.svg" alt="down" width="1.1em" opacity='70%' onClick={(e) => { handleUploadFile(e) }} />
              </Flex>
              <input
                type="file"
                onChange={uploadFile}
                ref={hiddenFileInput}
                style={{ display: 'none' }}
              />
              {imagePreviewUrl && <Image src={imagePreviewUrl} alt="Preview" marginTop="2em" width="100px" height="100px" opacity='100%' />}
            </GridItem>
             {editProduct == null ??
            <GridItem gridArea="warehouse">
              <Flex gap='1em'>
                <Text color='#344351' weight='500'>warehouse</Text>
                  <Image src="/square-add.svg" alt="down" width="1.1em" opacity='70%' onClick={() => { addWarehouseElement() }} />
              </Flex>
            </GridItem>
  }
          </ProductGrid>
          {editProduct == null ?? warehousesElements.map(elementId => (
            <Flex width='100%' align='center' justify='space-between' key={elementId}>
              <Flex gap="1em"> name
                <Selector items={warehouses} selected={null} setSelected={(selectedItem: string[]) => { addWarehouse(elementId, selectedItem) }} ></Selector>
              </Flex>
              <Flex >no. shelf
                <ShortCreationInput onChange={(e) => updateProductWarehouses(elementId, 'shelfNumber', e.target.value)}></ShortCreationInput>
              </Flex>
              <Flex>no. tier
                <ShortCreationInput onChange={(e) => updateProductWarehouses(elementId, 'tierNumber', e.target.value)}></ShortCreationInput>
              </Flex>
              <Flex >amount
                <ShortCreationInput onChange={(e) => updateProductWarehouses(elementId, 'amount', e.target.value)}></ShortCreationInput>
              </Flex>
              <Image src="/square-minus.svg" alt="down" width="1.1em" opacity='100%' onClick={() => { removeWarehouseElement(elementId) }} />
            </Flex>
          ))}


          <Flex gap="4em" marginBottom='4em' marginTop='2em'>
            <CancelButton onClick={() => { setShowProductCreator(false) }}>
              cancel
            </CancelButton>
            <CreateButton onClick={() => sendCreationProductRequest()}>
              create
            </CreateButton>
          </Flex>
        </CreationInputContainer>
      </CreationBox>
    </Flex>


  )
}


export default ProductCreator;