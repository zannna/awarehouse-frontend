import { Flex, Background, Text, Image } from '../../../styles/globalStyles.styles';
import { ProductCreatorFileContainer, Input } from './ProductCreatorFile.styles';
import { useState } from 'react';
import Selector from '../../Selector/Selector';
import { useKeycloak } from '@react-keycloak/web';
import { CORE_SERVICE, API_VERSION_URI, PRODUCT_PATH, WAREHOUSE_PATH } from "../../../api/axiosConfig";
import { useRef } from 'react';
import ErrorPopup from '../../ErrorPopup/ErrorPopup';
function ProductCreatorFile({setShowModal,  warehouseId, reset}:{setShowModal:(show:boolean)=>void,  warehouseId: any, reset:()=>void}) {
    const { keycloak, initialized } = useKeycloak();
    const [file, setFile] = useState<File | null>(null);
    const [errorPopup, setErrorPopup] = useState<string | null>(null);
    const hiddenFileInput = useRef<HTMLInputElement>(null);

    const handleUploadFile = (event: React.MouseEvent<HTMLImageElement>) => {
        hiddenFileInput.current?.click();
    };

    const uploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        setFile(e.target.files[0]);
        const reader = new FileReader();
        reader.onload = (e) => {
            const text = e?.target?.result;

        };
        reader.readAsText(e.target.files![0]);
    };

    const sendUploadFileRequest = () => {
        if (!file) return;
        const formData = new FormData();
        formData.append('file', file);

        fetch(`${CORE_SERVICE}${API_VERSION_URI}${PRODUCT_PATH}/import${WAREHOUSE_PATH}/${warehouseId}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${keycloak.token}`,
            },
            body: formData,
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if(data.allRecords){
                setErrorPopup("saved "+ data?.savedRecords +"/"+ data?.allRecords + " records.")
                reset();
                }
                else{
                    setErrorPopup(data.message)
                }
            })
            .catch(error => {
                setErrorPopup(error.message);
            });
    };

    return (
        <ProductCreatorFileContainer>
               {errorPopup && <ErrorPopup message={errorPopup} onClose={() => setErrorPopup(null)} />}
            <Flex justify='flex-end' width='100%'>
                <Image src={"cancel.svg"} alt="cancel" width="0.8em" height="0.8em" opacity='50%' onClick={() => {setShowModal(false) }}></Image>
            </Flex>
            <Flex direction='column' gap='0.5em' align='center'>
            <Flex gap='1em' width='fit-content' marginLeft='2em' marginRight='2em'>
                <Text >add csv file</Text>
                <Image src="/square-add.svg" alt="down" width="1.2em" opacity='70%' onClick={(e) => { handleUploadFile(e) }} />

            </Flex>
            {file && <Text size='0.7em'>selected: {file.name}</Text>}
            </Flex>
            <input
                type="file"
                accept=".csv"
                onChange={uploadFile}
                ref={hiddenFileInput}
                style={{ display: 'none' }}
            />
            <Image src="/accept.svg" opacity='100%' width='1.7em' height='1.7em' alt="accept" onClick={() => { sendUploadFileRequest() }}></Image>
        </ProductCreatorFileContainer>
    );
}
export default ProductCreatorFile;