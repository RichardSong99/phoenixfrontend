"use client"
import React from "react";
import CenteredNavbar from "../helper/components/navbars/sitenavbar/sitenavbar";
import { Button, Accordion, AccordionItem, Card, CardHeader, CardBody, CardFooter, Image, Link, Tabs, Tab } from "@nextui-org/react";

export default function Page() {

    const resourcesList = [
        {
            title: "Algebra Fundamentals",
            category: "Algebra",
            subject: "Math",
            description: "Fundamental concepts of algebra",

            link: "https://example.com/resource1",
        },
        {
            title: "Solving Equations",
            category: "Algebra",
            subject: "Math",
            description: "This is the second resource",
            link: "https://example.com/resource2",
        },
        {
            title: "Word Problems",
            category: "Algebra",
            subject: "Math",
            description: "This is the third resource",
            link: "https://example.com/resource3",
        },
        {
            title: "Exponents & Roots",
            category: "Advanced Math",
            subject: "Math",
            description: "This is the third resource",
            link: "https://example.com/resource3",
        },
        {
            title: "Function Interpretation",
            category: "Advanced Math",
            subject: "Math",
            description: "This is the third resource",
            link: "https://example.com/resource3",
        },
        {
            title: "Polynomials",
            category: "Advanced Math",
            subject: "Math",
            description: "This is the third resource",
            link: "https://example.com/resource3",
        },
        {
            title: "Quadratic Equations",
            category: "Advanced Math",
            subject: "Math",
            description: "This is the third resource",
            link: "https://example.com/resource3",
        },
    ];

    return (
        <div className="relative flex h-screen min-h-dvh w-full flex-col gap-9 overflow-y-auto bg-background p-4 md:gap-12 md:px-10 md:py-[34px]">
            <CenteredNavbar />
            <section className="flex flex-col items-center justify-center py-16 bg-white">

                <h1 className="text-3xl font-bold text-gray-800">SAT Guides</h1>
                <p className="mt-4 text-lg text-gray-600">
                    Welcome to our company! We are dedicated to providing high-quality services and solutions to our clients.
                </p>


                <Tabs>
                    <Tab title="Math">
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-5xl w-full mt-[30px]">
                            {resourcesList.map((resource, index) => (

<Card
key={index}
className="cursor-pointer rounded-lg bg-gradient-to-r from-blue-600 to-blue-400 shadow-lg hover:shadow-xl transition-transform transform hover:-translate-y-1"
>
<CardHeader className="flex flex-col items-start p-6 space-y-2">
  <h2 className="text-lg font-medium text-white">{resource.title}</h2>
  <p className="text-sm text-white opacity-80">{resource.category}</p>
</CardHeader>
</Card>

                              







                            ))}
                        </div>
                    </Tab>
                    <Tab title="Reading & Writing">
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-5xl w-full">

                            {resourcesList.map((resource, index) => (

                                <Card key={index} >

                                    <CardHeader
                                        className="flex flex-col items-start">
                                        <h2 className="text-xl font-bold">{resource.title}</h2>

                                        <p className="text-sm text-gray-500">{resource.category}</p>
                                    </CardHeader>
                                    <CardBody>
                                        {/* <p>{resource.description}</p> */}
                                    </CardBody>
                                    <CardFooter>
                                        <Link href={resource.link}>View</Link>
                                    </CardFooter>
                                </Card>


                            ))}
                        </div>

                    </Tab>
                </Tabs>


            </section>
        </div>
    );
}