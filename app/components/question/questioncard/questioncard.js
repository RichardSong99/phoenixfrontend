import styles from './questionlayout.module.css';
import { parseLatexString } from '../../latexrender/latexrender';
import { CriteriaElement } from '@/app/components/criteriabox/criteriabox';
import { objectsAreEqual } from '@/app/services/comparison';
import { capitalizeFirstLetter } from '../../../data/utility';
import { useUser } from '@/app/context/usercontext';

export const QuestionCard = ({ question, selected=false, clickQuestionHandler }) => {

    const { isAuthenticated } = useUser();

    return (
        <div
            className={`${styles.questionCard} ${selected? styles.selectedQuestionCard : ''}`}
            onClick={() => clickQuestionHandler(question)}
        >
            <p>{parseLatexString(question.Prompt)}</p>
            <CriteriaElement text={question.Topic}></CriteriaElement>
            <CriteriaElement text={capitalizeFirstLetter(question.Difficulty)}></CriteriaElement>
            <CriteriaElement text={capitalizeFirstLetter(isAuthenticated ? question.Status : "unattempted")} ></CriteriaElement>
        </div>
    )
}