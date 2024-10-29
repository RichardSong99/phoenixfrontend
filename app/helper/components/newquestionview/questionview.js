import { QuestionContext } from '../../context/questioncontext';
import React, { use, useState, useEffect, useContext, useRef, Component } from 'react';
import { Button, Avatar, Spinner, Tooltip, Tabs, Tab, Card, CardBody, CardHeader } from "@nextui-org/react";
import { parseLatexString, RenderLatex } from '../latexrender/latexrender';

export default function QuestionView({ }) {
    const [crossedOut, setCrossedOut] = useState([]);
    const [crossOutMode, setCrossOutMode] = useState(false);
    const [passage, setPassage] = useState(1);
    const answerChoices = ['A', 'B', 'C', 'D'];
    const [svg, setSvg] = useState(`<?xml version='1.0' encoding='UTF-8'?>
                                    <!-- This file was generated by dvisvgm 3.2.2 -->
                                    <svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' width='231.563097pt' height='244.806555pt' viewBox='-68.679694 -72.003505 231.563097 244.806555'>
                                    <defs>
                                    <font id='cmmi10' horiz-adv-x='0'>
                                    <font-face font-family='cmmi10' units-per-em='1000' ascent='750' descent='250'/>
                                    <glyph unicode='a' horiz-adv-x='528' vert-adv-y='528' glyph-name='a' d='M373 378C355 415 326 442 281 442C164 442 40 295 40 149C40 55 95-11 173-11C193-11 243-7 303 64C311 22 346-11 394-11C429-11 452 12 468 44C485 80 498 141 498 143C498 153 489 153 486 153C476 153 475 149 472 135C455 70 437 11 396 11C369 11 366 37 366 57C366 79 368 87 379 131C390 173 392 183 401 221L437 361C444 389 444 391 444 395C444 412 432 422 415 422C391 422 376 400 373 378ZM308 119C303 101 303 99 288 82C244 27 203 11 175 11C125 11 111 66 111 105C111 155 143 278 166 324C197 383 242 420 282 420C347 420 361 338 361 332S359 320 358 315L308 119Z'/>
                                    <glyph unicode='b' horiz-adv-x='429' vert-adv-y='429' glyph-name='b' d='M239 683C239 684 239 694 226 694C203 694 130 686 104 684C96 683 85 682 85 664C85 652 94 652 109 652C157 652 159 645 159 635C159 628 150 594 145 573L63 247C51 197 47 181 47 146C47 51 100-11 174-11C292-11 415 138 415 282C415 373 362 442 282 442C236 442 195 413 165 382L239 683ZM145 305C151 327 151 329 160 340C209 405 254 420 280 420C316 420 343 390 343 326C343 267 310 152 292 114C259 47 213 11 174 11C140 11 107 38 107 112C107 131 107 150 123 213L145 305Z'/>
                                    <glyph unicode='c' horiz-adv-x='432' vert-adv-y='432' glyph-name='c' d='M396 380C380 380 366 380 352 366C336 351 334 334 334 327C334 303 352 292 371 292C400 292 427 316 427 356C427 405 380 442 309 442C174 442 41 299 41 158C41 68 99-11 203-11C346-11 430 95 430 107C430 113 424 120 418 120C413 120 411 118 405 110C326 11 217 11 205 11C142 11 115 60 115 120C115 161 135 258 169 320C200 377 255 420 310 420C344 420 382 407 396 380Z'/>
                                    </font>
                                    </defs>
                                    <style type='text/css'>
                                    <![CDATA[text.f0 {font-family:cmmi10;font-size:9.96264px}
                                    ]]>
                                    </style>
                                    <g id='page1'>
                                    <path d='M-51.875001 155.171877H118.2068V-71.605Z' stroke='#000' fill='none' stroke-width='.79701' stroke-miterlimit='10'/>
                                    <text class='f0' x='-51.873194' y='155.17005' transform='matrix(1 0 0 1 82.9026 17.633)'>b</text>
                                    <text class='f0' x='-51.873194' y='155.17005' transform='matrix(1 0 0 1 -16.8065 -111.2425)'>a</text>
                                    <text class='f0' x='-51.873194' y='155.17005' transform='matrix(1 0 0 1 210.4452 -111.2425)'>c</text>
                                    <path d='M-51.875001 155.171877V140.9961H-37.6992V155.171877Z' stroke='#000' fill='none' stroke-width='.3985' stroke-miterlimit='10'/>
                                    </g>
                                    </svg>`);

    const {
        activeQuestionIndex,
        questionData,
        questionIDArray,
        userResponseData,
        handleReportUserResponse,
        activeReviewMode,
        engagementData,
        continueTimer,
        changeTimer,
        showPauseTimer,
        adaptiveRegularMode,
    } = useContext(QuestionContext);


    const changeCrossOutMode = () => {
        setCrossOutMode(!crossOutMode);
        console.log(crossOutMode);
    };

    const changePassage = (number) => {
        setPassage(number);
    };

    const handleSelect = (choice) => {
        if (!crossOutMode) {
            if (!crossedOut.includes(choice)) {
                if (adaptiveRegularMode === 'adaptive') {
                    if (activeQuestionIndex === activeQuestionIndex) {
                        handleReportUserResponse(choice, questionIDArray[activeQuestionIndex]);
                    }
                } else {
                    handleReportUserResponse(choice, questionIDArray[activeQuestionIndex]);
                }
            }
        } else {
            if (crossedOut.includes(choice)) {
                if (adaptiveRegularMode === 'adaptive') {
                    if (activeQuestionIndex === activeQuestionIndex) {
                        setCrossedOut(crossedOut.filter(item => item !== choice));
                    }
                } else {
                    setCrossedOut(crossedOut.filter(item => item !== choice));
                }
            } else {
                if (adaptiveRegularMode === 'adaptive') {
                    if (activeQuestionIndex === activeQuestionIndex) {
                        if (userResponseData[questionIDArray[activeQuestionIndex]] === choice) {
                            handleReportUserResponse(null, questionIDArray[activeQuestionIndex]);
                        }
                        setCrossedOut([...crossedOut, choice]);
                    }
                } else {
                    if (userResponseData[questionIDArray[activeQuestionIndex]] === choice) {
                        handleReportUserResponse(null, questionIDArray[activeQuestionIndex]);
                    }
                    setCrossedOut([...crossedOut, choice]);
                }
            }
        }
    };

    const getTextAreaStyle = () => {
        if (engagementData && engagementData[questionIDArray[activeQuestionIndex]]?.status === 'correct') {
            return 'bg-green-100 text-green-800 border-green-800';
        }
        if (engagementData && engagementData[questionIDArray[activeQuestionIndex]]?.status === 'incorrect') {
            return 'bg-red-100 text-red-800 border-red-800';
        }
        if (engagementData && engagementData[questionIDArray[activeQuestionIndex]]?.status === 'omitted') {
            return 'bg-yellow-100 text-yellow-800 border-yellow-800';
        }
        return 'bg-gray-100 text-gray-800';
    };

    // useEffect(() => {
    //     if(questionData[questionIDArray[activeQuestionIndex]].graphic){
    //         setSvg(questionData[questionIDArray[activeQuestionIndex]].graphic);
    //     }
    // }, [activeQuestionIndex]);

    if (!questionData || !questionData[questionIDArray[activeQuestionIndex]]) {
        return <div className='w-full h-[90%] flex flex-row justify-center items-center'>
            <Spinner />
            <div className='ml-[20px]'>Loading...</div>
        </div>;
    }

    return (
        <div className='w-[100%] h-[85%] flex justify-center items-center mt-[50px]'>
            {showPauseTimer &&
                <div className='w-[30%] h-[30%] bg-white absolute z-[2] border-[2px] border-appleGray3 rounded-[20px] flex flex-col justify-center items-center gap-4'>
                    <div className='text-[30px]'>
                        <strong>Timer paused</strong>
                    </div>
                    <div >Unpause timer to continue</div>
                    <div>
                        <Button
                            className='bg-gray-700 text-white'
                            onClick={changeTimer}
                        >
                            Unpause Timer
                        </Button>
                    </div>
                </div>
            }
            <div className={`h-full w-[98%] rounded flex flex-row justify-between pt-[20px] ${showPauseTimer ? 'blur-sm' : null}`}>
                {questionData[questionIDArray[activeQuestionIndex]].subject === "Math" ?
                    <div className='w-[50%] h-[80%] flex flex-col justify-center items-center pl-[30px] pr-[30px] gap-3'>
                        {questionData[questionIDArray[activeQuestionIndex]] && questionData[questionIDArray[activeQuestionIndex]].question_image_url !== null && questionData[questionIDArray[activeQuestionIndex]].question_image_url !== "" && <img src={questionData[questionIDArray[activeQuestionIndex]].question_image_url} className="w-3/4 max-h-72 object-contain" />}



                        {questionData[questionIDArray[activeQuestionIndex]] && parseLatexString(questionData[questionIDArray[activeQuestionIndex]].equation1)}
                        {questionData[questionIDArray[activeQuestionIndex]] && parseLatexString(questionData[questionIDArray[activeQuestionIndex]].equation2)}

                        {questionData[questionIDArray[activeQuestionIndex]] && parseLatexString(questionData[questionIDArray[activeQuestionIndex]].prompt)}


                    </div> :
                    <div className='flex flex-col items-center w-[45%] h-full'>
                        <div className='w-full h-[90%] flex flex-col justify-center items-center pl-[30px] pr-[30px] overflow-y-auto pt-[10px] mt-[20px]'>

                            {questionData[questionIDArray[activeQuestionIndex]] && questionData[questionIDArray[activeQuestionIndex]].question_image_url !== null && questionData[questionIDArray[activeQuestionIndex]].question_image_url !== "" && <img src={questionData[questionIDArray[activeQuestionIndex]].question_image_url} className="w-3/4  object-contain" />}

                            {questionData[questionIDArray[activeQuestionIndex]].text2_description ?
                                (passage === 1 ?
                                    <>
                                        {questionData[questionIDArray[activeQuestionIndex]].text1_description}
                                        <br></br><br></br>
                                        {questionData[questionIDArray[activeQuestionIndex]].text1}
                                    </>
                                    :
                                    <>
                                        {questionData[questionIDArray[activeQuestionIndex]].text2_description}
                                        <br></br><br></br>
                                        {questionData[questionIDArray[activeQuestionIndex]].text2}
                                    </>
                                )
                                :
                                <>
                                    {questionData[questionIDArray[activeQuestionIndex]].text1_description}
                                    <br></br><br></br>
                                    {questionData[questionIDArray[activeQuestionIndex]].text1}
                                </>
                            }
                        </div>
                        {questionData[questionIDArray[activeQuestionIndex]].text1 !== "" && questionData[questionIDArray[activeQuestionIndex]].text2 !== "" &&
                            <div className='flex flex-row justify-around items-center w-[30%]'>
                                <div>
                                    <Button onClick={() => changePassage(1)} className='bg-transparent w-[10px]'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                                            <g fill="none" fillRule="evenodd">
                                                <path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"></path>
                                                <path fill="currentColor" d="M8.293 12.707a1 1 0 0 1 0-1.414l5.657-5.657a1 1 0 1 1 1.414 1.414L10.414 12l4.95 4.95a1 1 0 0 1-1.414 1.414z"></path>
                                            </g>
                                        </svg>
                                    </Button>
                                </div>
                                {passage} / 2
                                <div>
                                    <Button onClick={() => changePassage(2)} className='bg-transparent'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                                            <g fill="none" fillRule="evenodd">
                                                <path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"></path>
                                                <path fill="currentColor" d="M15.707 11.293a1 1 0 0 1 0 1.414l-5.657 5.657a1 1 0 1 1-1.414-1.414l4.95-4.95l-4.95-4.95a1 1 0 0 1 1.414-1.414z"></path>
                                            </g>
                                        </svg>
                                    </Button>
                                </div>
                            </div>}
                    </div>
                }
                <div className='h-[95%] w-[2px] bg-appleGray1 opacity-[10%] rounded'></div>
                <div className='w-[50%] h-[90%] flex flex-col justify-between'>
                    <div className='flex flex-row justify-end pr-[20px]'>
                        <div className='cursor-pointer' onClick={changeCrossOutMode}>
                            <svg
                                className={`w-[25px] h-[25px] rounded-[6px]
                                    ${crossOutMode ? 'fill-white bg-black' : 'fill-black bg-white'}`}
                                xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"
                            >
                                <path d="M7.948 2.25h8.104c.899 0 1.648 0 2.242.08c.628.084 1.195.27 1.65.725c.456.456.642 1.023.726 1.65c.08.595.08 1.345.08 2.243V7.95a.75.75 0 0 1-1.5 0V7c0-.964-.002-1.612-.067-2.095c-.062-.461-.169-.659-.3-.789c-.13-.13-.327-.237-.788-.3c-.483-.064-1.131-.066-2.095-.066h-3.25V9a.75.75 0 0 1-1.5 0V3.75H8c-.964 0-1.612.002-2.095.067c-.461.062-.659.169-.789.3c-.13.13-.237.327-.3.788C4.753 5.388 4.75 6.036 4.75 7v.95a.75.75 0 1 1-1.5 0V6.948c0-.898 0-1.648.08-2.242c.084-.628.27-1.195.725-1.65c.456-.456 1.023-.642 1.65-.726c.595-.08 1.345-.08 2.243-.08m4.052 12a.75.75 0 0 1 .75.75v5.25H17a.75.75 0 0 1 0 1.5H7a.75.75 0 0 1 0-1.5h4.25V15a.75.75 0 0 1 .75-.75m-8-3a.75.75 0 0 0 0 1.5h16a.75.75 0 0 0 0-1.5z"></path>
                            </svg>
                        </div>
                    </div>
                    <div className='h-[450px] w-full flex flex-col gap-y-[8px] justify-center items-center'>
                        {questionData[questionIDArray[activeQuestionIndex]].answer_type === "multipleChoice" && (
                            <>
                                {questionData[questionIDArray[activeQuestionIndex]].subject === "Reading & Writing" && (
                                    <p>{parseLatexString(questionData[questionIDArray[activeQuestionIndex]].prompt)}</p>
                                )}
                                <p>Select one of the following:</p>
                            </>
                        )}

                        {questionData[questionIDArray[activeQuestionIndex]].answer_type === "multipleChoice" ?
                            <>
                                {(activeReviewMode !== "review" && adaptiveRegularMode !== 'adaptive') || (activeReviewMode !== "review" && (adaptiveRegularMode === 'adaptive' && activeQuestionIndex === questionIDArray.length - 1)) ?
                                    (
                                        answerChoices.map((choice, index) => (
                                            <div key={choice} className="relative w-full max-w-xl mx-auto">
                                                <Button
                                                    className={`w-full h-auto border-[2px] rounded-[25px] shadow-custom flex flex-row justify-start pt-[20px] pb-[20px]
                                                    ${userResponseData[questionIDArray[activeQuestionIndex]] === choice && !crossedOut.includes(choice) ? 'border-[2px] border-appleBlue bg-white' : 'bg-white border-appleGray5'}`}
                                                    onClick={() => handleSelect(choice)}
                                                >
                                                    <Avatar
                                                        className={`h-[30px] w-[30px] border-[2px]
                                                        ${userResponseData[questionIDArray[activeQuestionIndex]] === choice && !crossedOut.includes(choice) ? 'text-white border-appleGray6 bg-appleBlue' : 'opacity-70 bg-white border-appleGray3 text-appleBlue'}`}
                                                        name={choice}
                                                    />
                                                    <div className="h-full text-left ml-4 mr-2 overflow-hidden text-ellipsis whitespace-normal break-words">
                                                        {questionData[questionIDArray[activeQuestionIndex]] && parseLatexString(questionData[questionIDArray[activeQuestionIndex]].answer_choices[index])}
                                                    </div>
                                                </Button>
                                                {crossedOut.includes(choice) && (
                                                    <div
                                                        className="absolute top-1/2 left-[-5%] w-[110%] h-[2px] bg-black transform -translate-y-1/2 pointer-events-none"
                                                    ></div>
                                                )}
                                            </div>
                                        ))
                                    ) : (
                                        answerChoices.map((choice, index) => (
                                            <div key={choice} className="relative w-full max-w-xl mx-auto">
                                                <Button
                                                    className={`w-full h-auto border-[2px] rounded-[25px] shadow-custom flex flex-row justify-start pt-[20px] pb-[20px]
                                                    ${questionData[questionIDArray[activeQuestionIndex]].correct_answer_multiple === choice ? 'border-appleGreen bg-white' : userResponseData[questionIDArray[activeQuestionIndex]] === choice ? 'border-appleRed bg-white' : 'bg-white border-appleGray5'}`}
                                                >
                                                    <Avatar
                                                        className={`h-[30px] w-[30px] border-[2px]
                                                        ${questionData[questionIDArray[activeQuestionIndex]].correct_answer_multiple === choice ? 'text-appleGreen border-appleGreen bg-white' : userResponseData[questionIDArray[activeQuestionIndex]] === choice ? 'border-appleRed bg-white text-appleRed' : 'opacity-70 bg-white border-appleGray3 text-appleBlue'}`}
                                                        name={choice}
                                                    />
                                                    <div className="h-full w-full text-left ml-4 mr-2 whitespace-normal break-words">
                                                        {questionData[questionIDArray[activeQuestionIndex]] && parseLatexString(questionData[questionIDArray[activeQuestionIndex]].answer_choices[index])}

                                                    </div>
                                                </Button>
                                                {crossedOut.includes(choice) && (
                                                    <div
                                                        className="absolute top-1/2 left-[-5%] w-[110%] h-[2px] bg-black transform -translate-y-1/2 pointer-events-none"
                                                    ></div>
                                                )}
                                            </div>
                                        ))
                                    )}
                            </> :
                            <>
                                {activeReviewMode !== "review" ? (
                                    <div className='w-[95%] h-[100px] flex flex-row justify-around items-center'>
                                        <div>
                                            <Tooltip
                                                className='w-[500px] h-[250px] overflow-y-auto'
                                                content={
                                                    <>
                                                        If you find more than one correct answer, enter only one answer.<br /><br />
                                                        You can enter up to 5 characters for a positive answer and up to 6 characters (including the negative sign) for a negative answer.<br /><br />
                                                        If your answer is a fraction that does not fit in the provided space, enter the decimal equivalent.<br /><br />
                                                        If your answer is a decimal that does not fit in the provided space, enter it by truncating or rounding at the fourth digit.<br /><br />
                                                        If your answer is a mixed number (such as 3 1/2), enter it as an improper fraction (7/2) or its decimal equivalent (3.5).<br /><br />
                                                        Do not enter symbols such as a percent sign, comma, or dollar sign.
                                                    </>
                                                }
                                            >
                                                <button className='rounded-0 w-[20px] h-[20px] mt-[10px]' aria-label="Info">
                                                    <div>
                                                        <svg xmlns="http://www.w3.org/2000/svg" className='w-[20px] pointer-events-none' viewBox="0 0 24 24">
                                                            <path d="M11 17h2v-6h-2zm1-8q.425 0 .713-.288T13 8t-.288-.712T12 7t-.712.288T11 8t.288.713T12 9m0 13q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22m0-2q3.35 0 5.675-2.325T20 12t-2.325-5.675T12 4T6.325 6.325T4 12t2.325 5.675T12 20m0-8"></path>
                                                        </svg>
                                                    </div>
                                                </button>
                                            </Tooltip>
                                        </div>
                                        <textarea
                                            className='w-[90%] h-[50px] resize-none rounded-[15px] border-[3px] border-appleGray6 p-[10px]'
                                            placeholder='Enter your response here...'
                                            value={userResponseData[questionIDArray[activeQuestionIndex]] || ''}
                                            onChange={(e) => handleReportUserResponse(e.target.value, questionIDArray[activeQuestionIndex])}
                                        >
                                        </textarea>
                                    </div>
                                ) : (
                                    <div className="flex flex-col gap-4 w-full p-4">
                                        <textarea
                                            disabled
                                            className={`w-[90%] h-[50px] resize-none rounded-[15px] border-[3px] p-[10px] ${getTextAreaStyle()}`}
                                            value={engagementData[questionIDArray[activeQuestionIndex]]?.user_answer || ''}
                                        >
                                        </textarea>

                                        <span>Correct answer: {parseLatexString(String("$" + questionData[questionIDArray[activeQuestionIndex]].correct_answer_free) + "$")}</span>

                                    </div>
                                )}
                            </>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}