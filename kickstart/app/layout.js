import 'semantic-ui-css/semantic.min.css';
import "./globals.css";
import Header from '@/components/Header';
import { Container } from 'semantic-ui-react';

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <Container>
          {children}
        </Container>
      </body>
    </html>
  );
}
