import { styled } from '@mui/system';

export const TripCardComponent = styled('div')`
	&:hover {
		img {
			transform: scale(1.2);
		}
	}
`;

export const StyledBox = styled('div')`
	max-width: 1080px;
	height: 100%;
	gap: 1rem;
	display: flex;
	flex-direction: column;
	/* align-items: center; */
	/* width: 100%; */
	margin: 0 auto;
	/* overflow-y: auto; */
	padding: 1rem;
`;

export const StyledGridBox = styled('div')`
	gap: 1rem;
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	align-items: center;
	width: max-content;
	margin: 0 auto;
	padding: 1rem 1rem 2rem 1rem;
  
  & {
    @media (max-width: 1300px) {
      grid-template-columns: repeat(2, 1fr);
    }
    @media (max-width: 600px) {
      grid-template-columns: repeat(1, 1fr);
    }
  }
`;
