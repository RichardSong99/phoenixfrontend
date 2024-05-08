
import styles from './viewselector.module.css';

import { ViewToggle } from './viewtoggle'; // Import the ViewToggle component


export const ViewSelector = ({
    onSortChange,
    sortOption,
    displayMode,
    onDisplayModeChange
}) => {
    return (
            <div className={styles.header}>
                <select className={styles.sortSelect} value={sortOption}
                    onChange={(e) => onSortChange(e.target.value)}>
                    <option value="">Sort by...</option>
                    <option value="topic">Topic</option>
                    <option value="status">Status</option>
                    <option value="difficulty">Difficulty</option>
                    <option value="attempttime">Recently Attempted</option>

                </select>

                {/* <Switch text = {"See question preview"}/> */}


                <ViewToggle displayMode={displayMode} onDisplayModeChange={onDisplayModeChange} /> {/* Include the ViewToggle component */}
            </div>
    );
}
