import Router from 'next/router';
import Link from 'next/link';

interface Props {
  totalCount: number;
  pageNum: number;
}

export const Pagination = ({ totalCount, pageNum }: Props) => {
  const PER_PAGE = 2;

  const range = (pagesNumber :number) =>
        [...Array(pagesNumber)].map((_, i) => 1 + i)

  return (
    <ul>
      {range(Math.ceil(totalCount / PER_PAGE)).map((number, index) => (
        <li key={index}>
          <Link href={ `/blog/page/${number}`}>
            <a>{number}</a>
          </Link>
        </li>
      ))}
    </ul>
  );
};
