import styled from 'styled-components';
import {FaMagento} from 'react-icons/fa';
import {Link} from 'react-router-dom';
import { Container } from '../../globalStyles';

export const Nav =  styled.nav`
background: #101522;
height: 88px;
display: flex;
justify-content: center;
align-items: center;
font-size: 1.2rem;
position: sticky;
top: 0;
z-index: 999;
`
export const NavbarContainer = styled(Container)`
display: flex;
jusitfy-content: space-between;
height: 88px;

${Container}
`;

export const NavLogo = styled(Link)`
color: #fff;
justify-self: flex-start;
cursor: pointer;
text-decoration: none;
font-size: 2rem;
display: flex;
align-items: center;
`
export const NavIcon = styled(FaMagento)`
margin-right: 0.5 rem;

`
