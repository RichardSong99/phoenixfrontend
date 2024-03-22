import styles from './header.module.css';

export const Header = ({text = "Header"}) => {
    return (
        <div className = {styles.headerContainer} >
            {text.toUpperCase()}
        </div>
    );
}