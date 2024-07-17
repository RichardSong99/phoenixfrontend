import React from "react";
import styles from './selectionbar.module.css';

export function SelectionBar({
    tabList, 
    activeTab,
    handleTabChange
}) {
  return (
    <div className={styles.selectionBar}>
        {tabList.map((tab, index) => {
            const className = activeTab === index ? "active" : "inactive";
            return (
                <div 
                    key={tab}
                    className={`${styles.tab} ${styles[className]}`} 
                    onClick={() => handleTabChange(index)}
                >
                    <span>{tab.charAt(0).toUpperCase() + tab.slice(1)}</span>
                </div>
            );
        })}
    </div>
  );
}