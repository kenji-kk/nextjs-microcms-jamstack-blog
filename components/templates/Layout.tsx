import { VFC, ReactNode } from 'react'
import { Header } from '../organisms/Header';

type Props = {
  children: ReactNode;
}

export const Layout:VFC<Props> = ({children}) => {
  return (
    <div className='h-full'>
      <header>
        <Header />
      </header>
      <main className='bg-purple-200 h-full'>
        {children}
      </main>
    </div>
  )
};
