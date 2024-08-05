// components/StudyNavBar.js
"use client"
import Link from 'next/link';
import React, { useContext, useState, useEffect } from 'react';
import styles from './studynavbar.module.css';
import { NavBarContext } from '../../../context/navbarcontext';
import { useRouter } from 'next/navigation';
import { Avatar } from "@nextui-org/react";
import { IoPersonCircleSharp } from "react-icons/io5";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownSection, DropdownItem, Button, User } from "@nextui-org/react";
import { useDisclosure } from '@nextui-org/react';
import { IoMdHome } from "react-icons/io";
import { IoIosSearch } from "react-icons/io";
import { IoSparkles } from "react-icons/io5";



const StudyNavBar = () => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const router = useRouter();
    const [currentPath, setCurrentPath] = useState('');
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        if (router.pathname) {
            setCurrentPath(router.pathname.split('/').pop());
        }
    }, []);

    const handleLinkClick = (path) => {
        setCurrentPath(path);
        router.push(`/study/${path}`);
    };

    const isActive = (pathname) => {
        return currentPath === pathname;
    };

    const { isStudyNavBarVisible } = useContext(NavBarContext);

    if (!isStudyNavBarVisible) {
        return null;
    }

    return (
        <>

            {/* <CreateQuizModal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
            /> */}

            <div className={styles.studyNavbar}>
                <div className='flex flex-col p-3 gap-2 mt-4'>
                    <div className={`${styles.navItem} ${isActive('mydashboard') ? styles.activeNavItem : ''}`} onClick={() => handleLinkClick('mydashboard')}>
                        <IoMdHome size={24} />
                        <span>Dashboard</span>
                    </div>

                    <div className={`${styles.navItem} ${isActive('browse') ? styles.activeNavItem : ''}`} onClick={() => handleLinkClick('browse')}>
                        <IoIosSearch size={24} />

                        <span>Browse QBank</span>
                    </div>
                    <div className={`${styles.navItem} ${isActive('createquiz') ? styles.activeNavItem : ''}`} onClick={() => onOpen()}>
                        <IoSparkles size={24} />

                        <span>Create Quiz</span>
                    </div>
                    <div className={`${styles.navItem} ${isActive('qbank') ? styles.activeNavItem : ''}`} onClick={() => handleLinkClick('qbank')}>
                        <span>Admin: QBank</span>
                    </div>

                </div>



                <Dropdown
                    classNames={{
                        base: "before:bg-default-200", // change arrow background
                        content: "p-0 border-small border-divider bg-background",
                    }}
                >
                    <DropdownTrigger>


                        <div className={styles.footer}>
                            <Avatar >
                                <IoPersonCircleSharp />
                            </Avatar>
                            <div>Richard Song</div>
                            {showPopup && (
                                <div className={styles.popup}>
                                    <a href="/account">Account</a>
                                    <a href="/logout">Logout</a>
                                </div>
                            )}
                        </div>
                    </DropdownTrigger>

                    <DropdownMenu variant="faded" aria-label="Dropdown menu with description">
                        <DropdownSection>
                            <DropdownItem className="ml-0"
                                key="logout"

                            >
                                <div className="w-100">
                                    Log Out
                                </div>
                            </DropdownItem>
                        </DropdownSection>
                    </DropdownMenu>




                </Dropdown>




            </div>
        </>
    );
};

export default StudyNavBar;
