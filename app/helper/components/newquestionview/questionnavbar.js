import React from 'react';
import { QuestionContext } from '../../context/questioncontext';
import {Button, Listbox, ListboxItem} from "@nextui-org/react";

export default function QuestionNavBar({ review, quiz }) {
    const [selectedKeys, setSelectedKeys] = React.useState(new Set(["1"]));

    const selectedValue = React.useMemo(
        () => Array.from(selectedKeys).join(", "),
        [selectedKeys]
    );

    return (
        <div className='h-[90%] w-[300px] bg-gray-100 relative top-[40px] left-[50px] flex flex-col justify-between'>
            {review ? <p>review</p> : null}
            <div className=''>
                <div className="w-full h-full border-small px-1 py-2">
                    <Listbox 
                        aria-label="Single selection example"
                        variant="flat"
                        disallowEmptySelection
                        selectionMode="single"
                        selectedKeys={selectedKeys}
                        onSelectionChange={setSelectedKeys}
                    >
                        <ListboxItem key="1" className='rounded-0 w-[50px] h-[30px]'>1</ListboxItem>
                        <ListboxItem key="2" className='rounded-0 w-[50px] h-[30px]'>2</ListboxItem>
                        <ListboxItem key="3" className='rounded-0 w-[50px] h-[30px]'>3</ListboxItem>
                    </Listbox>
                </div>
            </div>
            <div className='bg-black w-full h-[70%]'>

            </div>
            {!review ? 
                <div id='buttons' className='mb-[10px] h-[100px] flex flex-col justify-around items-center'>
                    <Button className='w-[150px] bg-blue-300 rounded text-white'>
                        Pause Timer
                    </Button>
                    <Button className='w-[150px] bg-blue-300 rounded text-white'>
                        Submit Quiz
                    </Button>
                </div> : null
            }
        </div>
    )
}