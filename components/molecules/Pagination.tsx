import Link from 'next/link';

interface Props {
  totalCount: number;
  pageNum: number;
}

export const Pagination = ({ totalCount, pageNum }: Props) => {
  const PER_PAGE = 5;

  const range = (pagesNumber: number, pageNum: number)=>{
    if(pageNum < 3){
      return [...Array(pagesNumber)].map((_, i) => 1 + i).slice(0, 5);
    }
    return [...Array(pagesNumber)].map((_, i) => 1 + i).slice(Number(pageNum) - 3, Number(pageNum) + 2);
  }
    
  

  return (
    <div>
      <ul className='flex bg-purple-600 w-48 justify-around mr-auto ml-auto'>
        {range(Math.ceil(totalCount / PER_PAGE), pageNum).map((number, index) => (
          <li key={index} className={number == pageNum ? 'w-5 text-purple-700 bg-purple-300 text-center' : 'w-5 text-center text-teal-200 '}>
            <Link href={ `/blog/page/${number}`}>
              <a>{number}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
