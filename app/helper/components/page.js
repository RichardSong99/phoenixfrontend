"use client"

import React, {useState} from 'react';
import { StandardButton, NumberChoiceButtons } from './basecomponents/buttons/mybuttons';
import {SiteNavBar, SideNavBar} from './navbars/navbar';
import {CriteriaBox} from './criteriabox/criteriabox';
import { SignUpOption } from './signup/signupoption';
import { QuestionChoiceArea } from './question/questionpieces/questionpieces';

import { ObjectSideNav } from './contentviewer/objectsidenav';
import { ContentViewer } from './contentviewer/contentviewer';

export default function ComponentTester() {

    // const elementArray = ["Elementxxx 1", "Element 2", "Element 3", "Element 4", "Element 5"];
    // const [activeStatesArray, setActiveStatesArray] = useState(Array(null)); 
    // const criteriaName = "Criteria Name";

    // const answerChoices = ["1", "2", "3", "answer choice D"];

    const questions = {
        "currentPage": 1,
        "data": [
            {
                "id": "65bc699f08992ac645d86bfa",
                "Prompt": "Which of the following represents the equation of a circle in the xy-plane with its center at $(-\\frac{1}{2}, \\frac{3}{4})$ and a radius of $\\frac{2}{3}$ units?",
                "AnswerType": "multipleChoice",
                "AnswerChoices": [
                    "$ (x + \\frac{1}{2})^2 + (y - \\frac{3}{4})^2 = \\frac{4}{9} $",
                    "$ (x - \\frac{1}{2})^2 + (y + \\frac{3}{4})^2 = (\\frac{2}{3})^2 $",
                    "$ (x - \\frac{1}{2})^2 + (y + \\frac{3}{4})^2 = \\frac{2}{3} $",
                    "$ (x + \\frac{1}{2})^2 + (y - \\frac{3}{4})^2 = (\\frac{2}{3})^2 + (\\frac{4}{3})^2 $"
                ],
                "CorrectAnswerMultiple": "A",
                "Subject": "math",
                "Topic": "Circles",
                "Difficulty": "hard",
                "AccessOption": "free",
                "Explanation": "",
                "Status": "omitted"
            },
            {
                "id": "65bb137608992ac645d86bd5",
                "Prompt": "A circle in the xy-plane has a diameter with endpoints at $(10, -3)$ and $(10, 7)$. An equation of this circle is $(x - 10)^2 + (y - 2)^2 = r^2$, where $r$ is a positive constant. What is the value of $r$?",
                "AnswerType": "freeResponse",
                "AnswerChoices": [
                    "",
                    "",
                    "",
                    ""
                ],
                "CorrectAnswerFree": "5",
                "Subject": "math",
                "Topic": "Circles",
                "Difficulty": "medium",
                "AccessOption": "free",
                "Explanation": "",
                "Status": "omitted"
            },
            {
                "id": "65bb0d7008992ac645d86bd0",
                "Prompt": "Algae are proliferating in a controlled environment. There were $200,000$ algae cells per liter at the start. The number of cells per liter triples every $4$ hours. How many algae cells per liter will there be $20$ hours after the initial count?",
                "AnswerType": "multipleChoice",
                "AnswerChoices": [
                    "$2,400,000$",
                    " $3,600,000$",
                    "$5,400,000$",
                    "$48,600,000$"
                ],
                "CorrectAnswerMultiple": "D",
                "Subject": "math",
                "Topic": "Linear equations in 1 variable",
                "Difficulty": "easy",
                "AccessOption": "free",
                "Explanation": "",
                "Status": "omitted"
            },
            {
                "id": "65bae36808992ac645d86bc8",
                "Prompt": "Each face of a fair 10-sided die is labeled with a number from 1 through 10, with a different number appearing on each face. If the die is rolled one time, what is the probability of rolling a 7?\n",
                "AnswerType": "multipleChoice",
                "AnswerChoices": [
                    "$\\frac{1}{10}$ ",
                    "$\\frac{2}{10}$  ",
                    "$\\frac{3}{10}$",
                    "$\\frac{7}{10}$"
                ],
                "CorrectAnswerMultiple": "A",
                "Subject": "math",
                "Topic": "Probability and conditional probability",
                "Difficulty": "easy",
                "AccessOption": "free",
                "Explanation": "",
                "Status": "omitted"
            },
            {
                "id": "65bae26b08992ac645d86bc7",
                "Prompt": "The function $f$ is defined by $f(x) = x^2 - 4x + 4$. For which value of $x$ is $f(x) = 0$?\n",
                "AnswerType": "multipleChoice",
                "AnswerChoices": [
                    "$0$",
                    "$2$",
                    "$4$",
                    "$6$"
                ],
                "CorrectAnswerMultiple": "B",
                "Subject": "math",
                "Topic": "Nonlinear equations in 1 variable",
                "Difficulty": "medium",
                "AccessOption": "free",
                "Explanation": "",
                "Status": "omitted"
            },
            {
                "id": "65bc566608992ac645d86bef",
                "Prompt": "$$g(x) = 11(\\frac{1}{12})^x$$\n\n\nIf the given function $g$ is graphed in the $xy$-plane, where $y=g(x)$, what is the $y$-intercept of the graph?",
                "AnswerType": "multipleChoice",
                "AnswerChoices": [
                    "$(0,13)$",
                    "$(0,12)$",
                    "$(0,156)$",
                    "$(0,1)$"
                ],
                "CorrectAnswerMultiple": "A",
                "Subject": "math",
                "Topic": "Nonlinear equations in 1 variable",
                "Difficulty": "medium",
                "AccessOption": "free",
                "Explanation": "In the given function $f(x) = 11(\\frac{1}{12})^x$, the $y$-intercept represents the value of $f(x)$ when $x = 0$. To find the $y$-intercept, we substitute $x = 0$ into the function:\n\n$f(0) = 11 \\left(\\frac{1}{12}\\right)^0 = 11 \\cdot 1 = 11$\n\nSo, the $y$-intercept of the graph is $y = 11$",
                "Status": "omitted"
            },
            {
                "id": "65bc54e208992ac645d86bee",
                "Prompt": "An airplane descends from an altitude of $A$ feet to $B$ feet at a constant rate of $R$ feet per minute. What type of function best models the relationship between the descending airplane's altitude and time?",
                "AnswerType": "multipleChoice",
                "AnswerChoices": [
                    "Decreasing exponential",
                    "Decreasing linear",
                    "Increasing exponential",
                    "Increasing linear"
                ],
                "CorrectAnswerMultiple": "B",
                "Subject": "math",
                "Topic": "Linear equations in 1 variable",
                "Difficulty": "easy",
                "AccessOption": "free",
                "Explanation": "In this scenario, the altitude of the descending airplane is decreasing at a constant rate, which suggests a linear relationship between altitude and time. As time passes, the altitude decreases by a fixed amount per minute. This linear relationship is represented by a straight-line graph with a negative slope, indicating a decreasing function.",
                "Status": "omitted"
            },
            {
                "id": "65bc5bc408992ac645d86bf1",
                "Prompt": "At how many points do the graphs of the equations $y=x+10$ and $y=2x$ intersect in the $xy$-plane ",
                "AnswerType": "multipleChoice",
                "AnswerChoices": [
                    "$0$",
                    "$1$",
                    "$2$",
                    "$3$"
                ],
                "CorrectAnswerMultiple": "B",
                "Subject": "math",
                "Topic": "Systems of 2 linear equations in 2 variables",
                "Difficulty": "easy",
                "AccessOption": "free",
                "Explanation": "",
                "Status": "correct"
            },
            {
                "id": "65bb0c5c08992ac645d86bcf",
                "Prompt": "$$x^2 -10x-24$$\nWhat is one of the solutions to the given equation? ",
                "AnswerType": "freeResponse",
                "AnswerChoices": [
                    "",
                    "",
                    "",
                    ""
                ],
                "CorrectAnswerFree": "12, -2",
                "Subject": "math",
                "Topic": "Linear equations in 1 variable",
                "Difficulty": "medium",
                "AccessOption": "free",
                "Explanation": "",
                "Images": [],
                "Status": "incorrect"
            },
            {
                "id": "65bb098408992ac645d86bcd",
                "Prompt": "Solve the given system of equations for $(x, y)$:\n\n$y=2x$\n\n$3x+y=18$\n\nWhat is the value of $x$?",
                "AnswerType": "multipleChoice",
                "AnswerChoices": [
                    "$2$",
                    "$3.6$",
                    "$6$",
                    "$9$"
                ],
                "CorrectAnswerMultiple": "B",
                "Subject": "math",
                "Topic": "Linear equations in 1 variable",
                "Difficulty": "easy",
                "AccessOption": "free",
                "Explanation": "",
                "Images": [],
                "Status": "incorrect"
            }
        ],
        "lastPage": 6,
        "totalQuestions": 51
    };

    // const myObjectList = questions.data.map((question, index) => ({
    //     type: "question",
    //     questionData: questions.data[index]
    // }));

    const myVideoList = [
        {url: "u36A-YTxiOw", title: "Video 1"},
        {url: "yB2IenqIRL8", title: "Video 2"}
    ]

    const myObjectList = myVideoList.map((video, index) => ({
        type: "video",
        videoData: myVideoList[index]
    }));

    return (
        <div>
            {/* <SiteNavBar
            />
                        <SideNavBar />

            <CriteriaBox name = {criteriaName} elementArray = {elementArray} setActiveStatesArray={setActiveStatesArray} />

            <NumberChoiceButtons buttonTextArray = {["1", "2", "3", "4", "5"]} />
            <SignUpOption />
            <QuestionChoiceArea answerChoiceArray = {answerChoices}/> */}
            {/* <ObjectSideNav /> */}
            <ContentViewer objectList={myObjectList}/>
        </div>
    )
}