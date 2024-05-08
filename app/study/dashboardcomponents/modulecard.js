import { Card, CardHeader, CardBody, CardFooter, Progress } from '@nextui-org/react';
import { FaVideo } from "react-icons/fa";
import { HiOutlinePencilSquare } from "react-icons/hi2";



export const ModuleCard = ({ module }) => {
    return (
        <Card className="w-64 bg-white border border-primary shadow-md rounded-lg" shadow="none" isPressable={true}>
            <CardBody>
                <div className="flex flex-col gap-1">
                        <div>
                            {module.type === "lessons" && <FaVideo style={{ width: '20px', height: '20px' }} />}
                            {module.type === "practiceQuestions" && <HiOutlinePencilSquare style={{ width: '20px', height: '20px' }} />}

                        </div>
                        <div>
                            <span className="font-bold text-medium">{module.name}</span>
                        </div>
                    <div><span className="text-tiny">{module.completed}/{module.total} completed</span></div>
                </div>
            </CardBody>
            <CardFooter>
                {/* <Button color="primary">Start</Button> */}
                <Progress size="sm" aria-label="Loading..." value={module.completed/module.total*100} />
            </CardFooter>
        </Card>
    )
}
