import Providers from './providers';

export const metadata = {
  title: 'Inglês com Voz',
  description: 'Aprenda inglês usando reconhecimento de fala',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body style={{display:'flex', justifyContent:'center', alignItems:'center'}} >
        <div className='container'>
          <Providers>{children}</Providers>
        </div>
      </body>
    </html>
  );
}
