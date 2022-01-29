import { VFC, ReactNode } from 'react'
import { Header } from '../organisms/Header';

type Props = {
  children: ReactNode;
}

export const Layout:VFC<Props> = ({children}) => {
  return (
    <div>
      <header>
        <Header />
      </header>
      <main>
        {children}
      </main>
    </div>
  )
};
