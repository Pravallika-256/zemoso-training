// src/templates/MainTemplate/index.tsx
import { Container } from '@mui/material';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const MainTemplate = ({ children }: Props) => {
  return <Container>{children}</Container>;
};

export default MainTemplate;
