import { Flex, Image } from '../../styles/globalStyles.styles'
import { Button } from './Pagination.styles'
export interface PageRange{
    start: number;
    end: number;
}
function Pagination({startPage, endPage, actualPage, setActualPage,  setVisiblePageRange, pages}:{startPage :number, endPage :number, 
    actualPage :number, setActualPage :  (item: number) => void,  setVisiblePageRange  : (range: PageRange) => void, pages :number}) {

    function generatePageButtons() {
        const buttons = [];
        console.log(startPage, endPage);
        for (let page = startPage; page <= endPage; page++) {
          buttons.push(
            < Button key={page} onClick={() =>setActualPage(page)} disabled={actualPage === page}  style={{ color: actualPage === page ? "#797979" : "#3f3f3f" }} >
              {page + 1}
            </ Button>
          );
        }
        return buttons;
      }
      
      const handlePrevSet = () => {
        if(startPage === 0) return;
        const newStart = Math.max(0, startPage - 5);
        const newEnd = Math.max(4, newStart + 4);
        setVisiblePageRange({ start: newStart, end: newEnd });
      };
      
      const handleNextSet = () => {
        if(endPage === pages-1) return;
        const newEnd = Math.min(pages - 1, endPage + 5);
        const newStart = Math.min(newEnd - 4, 0);
        setVisiblePageRange({ start: newStart, end: newEnd });
      };
  return (
    <Flex align='center'>
        <Image src="/left-arrow.svg" alt="pointer" width="1em"onClick={handlePrevSet} opacity={startPage === 0 ? "0.3" : "0.7"}></Image>
      {generatePageButtons()}
    <Image src="/right-arrow.svg" alt="pointer" width="1em" onClick={handleNextSet} opacity={endPage === pages-1 ? "0.3" : "0.7"}></Image>
  </Flex>
  );
}
export default Pagination;