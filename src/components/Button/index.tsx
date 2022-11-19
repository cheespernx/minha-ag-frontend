import React, { ButtonHTMLAttributes } from "react";
import { Container } from './styles';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    progress?: boolean
    scale?: string
    color?: string
    expand?: boolean
    outline?: boolean
    disabled?: boolean
    link?: string
    onClick?: () => void
    className?: string
    height?: number
}

const Button: React.FC<Props> = ({ children, ...props }) => {
    return (
        <Container {...props}>{children}</Container>
    );
}

export default Button;