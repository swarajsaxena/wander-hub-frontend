import { styled } from '@mui/system';

export const NavbarComponent = styled('nav')`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem 0.75rem 0.5rem 0.5rem;
    border-bottom: 2px solid hsl(202, 100%, 5%, 0.1);
    position: sticky;
    top: 0;
    z-index: 999;
    background: white;
    /* background-size: cover; */
`;