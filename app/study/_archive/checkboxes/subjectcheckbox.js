import React, { useState, useEffect } from 'react';
import styles from './subjectcheckbox.module.css';

const SubjectCheckbox = ({
    data,
    defaultExpandedState = false,
    mandatorySelection = false,
    defaultChecked = [],
    selectedItems,
    setSelectedItems,
}) => {
    const initializeState = (items, defaultValue) => {
        const safeDefaultValue = Array.isArray(defaultValue) ? defaultValue : [];
        return items.reduce((acc, item) => {
            const isChecked = safeDefaultValue.includes(item.name) || item.defaultChecked || false;
            let newState = { ...acc, [item.name]: isChecked };

            if (item.children) {
                const childState = initializeState(item.children, isChecked);
                newState = { ...newState, ...childState };
            }

            return newState;
        }, {});
    };

    const [checked, setChecked] = useState(() => initializeState(data, defaultChecked));
    const [expanded, setExpanded] = useState(() => initializeState(data, defaultExpandedState));

    useEffect(() => {
        setSelectedItems(Object.keys(checked).filter(key => checked[key]));
    }, [checked]);

    const toggleExpand = (key) => {
        setExpanded(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const handleCheckboxChange = (key, isLeaf = false, parentKey = null) => {
        const isChecked = checked[key];
        const newState = !isChecked;
    
        // If mandatorySelection is true and the new state is unchecked,
        // and there's only one leaf checked, return early to prevent unchecking
        if (mandatorySelection && isLeaf && !newState && Object.values(checked).filter(checked => checked).length === 1) {
            return;
        }
    
        let newCheckedState = { ...checked, [key]: newState };
    
        // If a parent is checked/unchecked, all its children become checked/unchecked
        if (!isLeaf) {
            const parent = data.find(item => item.name === key);
            if (parent && parent.children) {
                parent.children.forEach(subtopic => {
                    newCheckedState = { ...newCheckedState, [subtopic.name]: newState };
                });
            }
        }
    
        // If a child is unchecked, the parent becomes unchecked
        if (isLeaf && !newState) {
            newCheckedState = { ...newCheckedState, [parentKey]: newState };
        }
    
        setChecked(newCheckedState);
    };

    const renderCheckbox = (item, isSubtopic = false, parentKey = null) => (
        <div key={item.name} className={isSubtopic ? `${styles.subCheckbox} ${styles.checkboxMargin}` : styles.checkboxMargin}>
        <input
            type="checkbox"
            id={`checkbox-${item.name}`}
            checked={checked[item.name]}
            onChange={() => handleCheckboxChange(item.name, !item.children || item.children.length === 0, parentKey)}
        />
            <label htmlFor={`checkbox-${item.name}`}>
                {item.name}
            </label>
            {item.children && item.children.length > 0 && (
                <>
                    <span onClick={() => toggleExpand(item.name)} className={styles.expander}>
                        {expanded[item.name] ? '▼' : '▶︎'}
                    </span>
                    {expanded[item.name] && (
                        <div className={styles.subtopicContainer}>
                            {item.children.map(subItem => renderCheckbox(subItem, true, item.name))}
                        </div>
                    )}
                </>
            )}
        </div>
    );

    return (
        <div>
            {data.map(item => renderCheckbox(item))}
        </div>
    );
};

export default SubjectCheckbox;