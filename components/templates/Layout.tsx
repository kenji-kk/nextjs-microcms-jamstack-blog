import { VFC, ReactNode } from 'react'
import { Header } from '../organisms/Header';

type Props = {
  children: ReactNode;
}

export const Layout:VFC<Props> = ({children}) => {
  return (
    <div className='h-full bg-purple-200'>
      <header>
        <Header />
      </header>
      <main>
        {children}
      </main>
    </div>
  )
};
