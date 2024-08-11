// components/StudyNavBar.js
"use client"
import Link from 'next/link';
import React, { useContext, useState, useEffect } from 'react';
import styles from './studynavbar.module.css';
import { NavBarContext } from '../../../context/navbarcontext';
import { useRouter } from 'next/navigation';
import { IoPersonCircleSharp } from "react-icons/io5";
import { Button, Avatar, Listbox, ListboxItem, Spacer, ScrollShadow } from "@nextui-org/react";
import { useDisclosure } from '@nextui-org/react';
import { Icon } from '@iconify/react';
import { IconWrapper } from './components/IconWrapper';



const StudyNavBar = () => {

    const router = useRouter();


    const handleLinkClick = (key) => {
        router.push(`/study/${key}`);
    };



    const { isStudyNavBarVisible } = useContext(NavBarContext);

    if (!isStudyNavBarVisible) {
        return null;
    }

    const logoutHandler = () => {
        router.push('/auth/login');
    }

    return (
<div className="h-dvh">
    <div className="relative flex h-full w-72 flex-1 flex-col border-r-small border-divider p-4"> 

        <div className="flex items-center gap-2 px-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-foreground">
                Icon
            </div>
            <span className="text-small font-bold uppercase">Acme</span>
        </div>

        <Spacer y={8} />

        <ScrollShadow className="h-full max-h-full py-6 pr-0 pl-2"> {/* Aligned padding to the left */}

            <Listbox
                aria-label="User Menu"
                onAction={(key) => handleLinkClick(key)}
                className="p-0 gap-2 divide-y dark:divide-default-100/80 bg-content1 overflow-visible list-none -ml-9"
                itemClasses={{
                    base: "first:rounded-t-medium h-16 last:rounded-b-medium rounded gap-3 data-[hover=true]:bg-default-100/80",
                }}
            >
                <ListboxItem
                    key="mydashboard"
                    startContent={
                        <IconWrapper className="bg-primary/10 text-primary">
                            <Icon icon="material-symbols:home-outline" width="30" height="30" />
                        </IconWrapper>
                    }
                >
                    Home
                </ListboxItem>

                <ListboxItem
                    key="myquizzes"
                    startContent={
                        <IconWrapper className="bg-primary/10 text-primary">
                            <Icon icon="fluent:quiz-new-20-regular" width="30" height="30" />
                        </IconWrapper>
                    }
                >
                    My Quizzes
                </ListboxItem>

                <ListboxItem
                    key="browse"
                    startContent={
                        <IconWrapper className="bg-primary/10 text-primary">
                            <Icon icon="material-symbols:search" width="30" height="30" />
                        </IconWrapper>
                    }
                >
                    Browse Questions
                </ListboxItem>

            </Listbox>
        </ScrollShadow>

        <div className="mt-auto flex flex-col "> {/* Consistent padding with Listbox */}
            <Button
                fullWidth
                className="justify-start text-default-500 data-[hover=true]:text-foreground"
                startContent={
                    <Icon className="text-default-500" icon="solar:info-circle-line-duotone" width={24} />
                }
                variant="light"
            >
                Help & Information
            </Button>
            <Button
                className="justify-start text-default-500 data-[hover=true]:text-foreground"
                startContent={
                    <Icon
                        className="rotate-180 text-default-500"
                        icon="solar:minus-circle-line-duotone"
                        width={24}
                    />
                }
                variant="light"
            >
                My Account
            </Button>
            <Button
                className="justify-start text-default-500 data-[hover=true]:text-foreground"
                startContent={
                    <Icon
                        className="rotate-180 text-default-500"
                        icon="solar:minus-circle-line-duotone"
                        width={24}
                    />
                }
                variant="light"
                onPress = {() => logoutHandler()}
            >
                Log Out
            </Button>
            
        </div>

    </div>
</div>

    );
};

export default StudyNavBar;
